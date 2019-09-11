import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { setShowAddQualifier, postQualifyingText } from "../../store/actions/body";
import { connect } from "react-redux";
import QualifyTextAdd from "../form/qualify_text_add"
import CustomTooltipContent from "./tooltip_content";

class TimeSeriesChart extends PureComponent {

    render() {
        const dpIndex = this.props.dataPoints.findIndex(x => x.id === this.props.activeObjId);
        let qualifyingText = '';
        let qualifyingTextLabel = '';
        if (dpIndex > -1) {
            qualifyingText = this.props.dataPoints[dpIndex].qualifier || '';
            qualifyingTextLabel = this.props.dataPoints[dpIndex].date || ''
        }
        let hasValue2;
        let line1Label = 'value';
        let line2Label;
        let target1Label = 'Target';
        console.log('this.props.selectedParameter')
        console.log(this.props.selectedParameter)
        if (this.props.selectedParameter)
            hasValue2 = this.props.selectedParameter.num_values > 1;
            if (hasValue2) {
                line1Label = this.props.selectedParameter.value2_short_label_1;
                line2Label = this.props.selectedParameter.value2_short_label_2
                target1Label += ' (' + this.props.selectedParameter.upload_field_labels.split(', ')[1] + ')'
            }
        const values = [];
        const dataPoints = this.props.dataPoints.filter(obj => obj.parameter === this.props.selectedParameter.name);
        const chartData = dataPoints.map(obj => {
            if (hasValue2 && line1Label && line2Label) return {
                date: obj.date, id: obj.id, [line1Label]: obj.value, [line2Label]: obj.value2, text: obj.qualifier
            };
            return { date: obj.date, value: obj.value, id: obj.id, text: obj.qualifier }
        });
        chartData.forEach(obj => {
            values.push(obj[line1Label]);
            if (hasValue2 && obj[line2Label]){
                values.push(obj[line2Label])
            }
        });
        const valMin = Math.min(...values);
        const valMax = Math.max(...values);
        const offset = (valMax - valMin) / 2.6;
        const paramIdeals = this.props.ideals ? this.props.ideals[this.props.body.selectedItemIndex] : {};
        const savedTarget = paramIdeals ? paramIdeals.saved : '';
        let targetLineVal;
        let yAxisDomain;
        if ( this.props.selFeatInd === 1 && savedTarget && (savedTarget < valMax * 2) &&  (savedTarget > valMin / 2)) {
            targetLineVal = savedTarget;
            yAxisDomain = [dataMin => {let min = Math.min((dataMin - offset), targetLineVal - offset);
                if (!min || min < 0) return 0; return min},
                    dataMax => Math.max((dataMax + offset), targetLineVal + 5) || 100]
        } else {
            yAxisDomain = [dataMin => (dataMin - offset), dataMax => (dataMax + offset)]
        }
        return (
            <React.Fragment>
            <LineChart
                width={520}
                height={300}
                data={chartData.reverse()}
                margin={{top: 5, right: 16, left: 22, bottom: 5, }}
                onClick ={(val) => {
                    if (val) {
                        this.props.setActiveLabel(val.activeLabel);
                        this.props.setActiveObjId(val.activePayload[0].payload.id);
                    }
                    this.props.setShowAddQualifier(true);
                    this.props.setHideQualifyText(false)}
                }
            >
                <XAxis dataKey="date" />
                <YAxis type="number"
                       domain={yAxisDomain}
                       tickFormatter={
                           number => number <= valMin ? '' : valMax > 8 ? parseInt(number) : number.toFixed(1)
                       }
                />
                { this.props.selFeatInd === 1 && (
                    <ReferenceLine y={targetLineVal} label={target1Label} stroke="#ffb600" />) }
                { this.props.selFeatInd === 1 && paramIdeals && paramIdeals.saved2 && (
                    <ReferenceLine y={paramIdeals.saved2} label={'Target'.concat(
                        ' (', this.props.selectedParameter.upload_field_labels.split(', ')[2], ')')} stroke="#ffb600" />
                )}
                {/*{ this.props.selectedParameter && this.props.selectedParameter.data}*/}
                <Tooltip content={
                    <CustomTooltipContent
                        dataPoints={this.props.dataPoints}
                        activeObjId={this.props.activeObjId}
                        setActiveObjId={this.props.setActiveObjId}
                        qualifyingText={qualifyingText}
                    />}
                />
                <Line type="monotone" dataKey={line1Label} stroke="#8884d8" activeDot={{ r: 6 }}/>
                {hasValue2 && (<Line type="monotone" dataKey={line2Label} stroke="#82ca9d" activeDot={{ r: 6 }} />)}
            </LineChart>
            {this.props.showAddQualifier && !this.props.hideQualifyText && (
                <QualifyTextAdd
                    postQualifyingText={this.props.postQualifyingText}
                    qualifyingText={qualifyingText}
                    activeObjId={this.props.activeObjId}
                    activeLabel={qualifyingTextLabel}
                    setHideText={this.props.setHideQualifyText}
                />
            )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({auth, body, extras, menu, profile}) => {
    const blankItems = profile.blankParams.map(x => {return {
        parameter: x, data_point: {date: '', value: '', value2: ''}
    }});
    return {
        showAddQualifier: body.showAddQualifier,
        dataPoints: profile.dataPoints || [],
        selectedParameter: profile.summaryItems.concat(blankItems)[body.selectedItemIndex]
            ? profile.summaryItems.concat(blankItems)[body.selectedItemIndex].parameter : '',
        selItemInd: body.selectedItemIndex,
        selFeatInd: body.selectedFeatIndex,
        ideals: profile.ideals
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setShowAddQualifier: val => dispatch(setShowAddQualifier(val)),
        postQualifyingText: val => dispatch(postQualifyingText(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeSeriesChart);