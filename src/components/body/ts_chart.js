import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { setShowAddQualifier } from "../../store/actions/body";
import {connect} from "react-redux";
import QualifyTextAdd from "../form/qualify_text_add"
import CustomTooltipContent from "./tooltip_content";

class TimeSeriesChart extends PureComponent {

    render() {
        console.log(this.props.showAddQualifier);

        let hasValue2;
        let line1Label = 'value';
        let line2Label;
        if (this.props.selectedParameter)
            hasValue2 = this.props.selectedParameter.num_values > 1;
            if (hasValue2) {
                line1Label = this.props.selectedParameter.value2_short_label_1;
                line2Label = this.props.selectedParameter.value2_short_label_2
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

        console.log(chartData)
        console.log(this.props.selectedParameter)

        return (
            <React.Fragment>
            <LineChart
                width={520}
                height={300}
                data={chartData.reverse()}
                margin={{top: 5, right: 16, left: 22, bottom: 5, }}
                onClick ={() => this.props.setShowAddQualifier(true)}
            >
                <XAxis dataKey="date" />
                <YAxis type="number" domain={[dataMin => (dataMin - offset), dataMax => (dataMax + offset)]}
                       tickFormatter={
                           number => number <= valMin ? '' : valMax > 8 ? parseInt(number) : number.toFixed(1)
                       }
                />
                <Tooltip content={<CustomTooltipContent dataPoints={dataPoints}/>}/>
                <Line type="monotone" dataKey={line1Label} stroke="#8884d8" activeDot={{ r: 6 }}/>
                {hasValue2 && (<Line type="monotone" dataKey={line2Label} stroke="#82ca9d" activeDot={{ r: 6 }} />)}
            </LineChart>
            {this.props.showAddQualifier && ( <QualifyTextAdd /> ) }
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setShowAddQualifier: val => dispatch(setShowAddQualifier(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeSeriesChart);