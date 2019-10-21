import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import {  setShowAddQualifier, postQualifyingText, resetChartSelection, setShowRollingMeans, setShowMean,
    setShowMonthlyDiffs } from "../../store/actions/body";
import MonthlyBarChart from "./monthly_bar_chart"
import QualifyTextAdd from "../form/qualify_text_add"
import CustomTooltipContent from "./tooltip_content";
import { average } from '../../utils/helpers'

class TimeSeriesChart extends PureComponent {

    constructor(props) {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: false,
        };
    }
    handleMouseHover() {
        this.setState((state) => {return {isHovering: !state.isHovering}});
    }

    render() {
        const chartDataIsDefault = !this.props.showRollingMeans && !this.props.showMonthlyDiffs;
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
        const selParam = this.props.selectedParameter;
        if (selParam) {
            hasValue2 = selParam.num_values > 1;
            if (hasValue2) {
                line1Label = selParam.value2_short_label_1 || selParam.upload_fields.split(', ')[1];
                line2Label = selParam.value2_short_label_2 || selParam.upload_fields.split(', ')[2];
                target1Label += ' (' + selParam.upload_field_labels.split(', ')[1] + ')'
            }
        }

        const rollingMeans = this.props.rollingMeans.flat().filter(
            obj => obj.param_name === selParam.name && obj.value);
        const dataPoints = this.props.dataPoints.filter(obj => obj.parameter === selParam.name);

        let chartData = this.props.showRollingMeans ? rollingMeans : dataPoints;
        chartData = chartData.map(obj => {
            if (hasValue2 && line1Label && line2Label) return {
                date: obj.date, id: obj.id, [line1Label]: obj.value, [line2Label]: obj.value2, text: obj.qualifier
            };
            return { date: obj.date.replace(/-0/g, '-'), value: obj.value, id: obj.id, text: obj.qualifier }
        });

        const valueMean = average(dataPoints.map(x => x.value));
        let value2Mean;
        if (hasValue2) {
            value2Mean = average(dataPoints.map(x => x.value2))
        }
        const values = [];
        chartData.forEach(obj => {
            values.push(obj[line1Label]);
            if (hasValue2 && obj[line2Label]){
                values.push(obj[line2Label])
            }
        });
        const valMin = Math.min(...values);
        const valMax = Math.max(...values);
        let offset = 0;
        if (valMax && valMin) {
            offset = (valMax - valMin) > valMin ? valMin : (valMax - valMin) / 2;
        }

        const paramIdeals = this.props.ideals ? this.props.ideals[this.props.selectedItemIndex] : {};
        const savedTarget = paramIdeals ? paramIdeals.saved : '';
        let yAxisDomain;
        if (chartData.length === 1 && chartData[0].value && !chartData[0].value2 ) {
            const val = chartData[0].value;
            yAxisDomain = [val - (val * 1.5), val + (val * 1.5)]
        }
        else if ( this.props.selFeatInd === 1 && savedTarget && (savedTarget < valMax * 2) &&
            (savedTarget > valMin / 2) && offset && offset > 0) {
            // Condition where yAxis range accounts for presence of target line
            let min;
            const getDataMin = dataMin => {
                min = Math.min((dataMin - offset), savedTarget - offset);
                if (!min || min < 0) return dataMin - offset;
                return min
            };
            const getDataMax = dataMax => {
                if (!min || min < 0) return dataMax + offset;
                return Math.max((dataMax + offset), savedTarget + offset)
            };
            yAxisDomain = [getDataMin, getDataMax]
        } else {
            // Condition where yAxis range not need to account for target line (i.e. default)
            yAxisDomain = ['dataMin', 'dataMax'];
            if (offset) {
                yAxisDomain = [
                    dataMin => (dataMin - offset > 0 ? dataMin - offset : 0),
                        dataMax => (dataMax + offset)
                ]
            }
        }

        let monthlyChanges = [];
        const mcParamInd = this.props.monthlyChanges.findIndex(
            x => x && x[0] && x[0].param_name === selParam.name);
        if (mcParamInd > -1){
            monthlyChanges = this.props.monthlyChanges[mcParamInd]
        }

        let chartExtras;
        if (this.props.showAddQualifier && !this.props.hideQualifyText) {
            chartExtras = (
                <QualifyTextAdd
                    postQualifyingText={this.props.postQualifyingText}
                    qualifyingText={qualifyingText}
                    activeObjId={this.props.activeObjId}
                    activeLabel={qualifyingTextLabel}
                    setHideText={this.props.setHideQualifyText}
                />
            )
        } else chartExtras = (
            <div className='chart-btn-row' >
                { !chartDataIsDefault && (
                    <button type="button" className='chart-btn'
                            onClick={this.props.resetChartSelection}
                    >Records</button>
                )}
                { rollingMeans.length > 3 && (
                    <button type="button"
                            className={'chart-btn '.concat(this.props.showRollingMeans ? 'active' : '')}
                            onClick={() => this.props.setShowRollingMeans(!this.props.showRollingMeans)}
                    >Rolling average{hasValue2 ? 's' : ''}</button>
                )}
                { dataPoints.length > 2  && valueMean && (
                    <button type="button"
                            className={'chart-btn '.concat(this.props.showMean ? 'active' : '')}
                            onClick={() => this.props.setShowMean(!this.props.showMean)}
                    >Average{hasValue2 ? 's' : ''}</button>
                )}
                { dataPoints.length > 5 && monthlyChanges.length > 2 && (
                    <button type="button"
                            className={'chart-btn '.concat(this.props.showMonthlyDiffs ? 'active' : '')}
                            onClick={() => this.props.setShowMonthlyDiffs(!this.props.showMonthlyDiffs)}
                    >Monthly averages</button>
                )}
            </div>
        );

        const chartDims = {width: 520, height: 300, margin: {top: 5, right: 16, left: 22, bottom: 5, }};

        if (this.props.showMonthlyDiffs) {
            return (
                <MonthlyBarChart
                    hasValue2={hasValue2}
                    line1Label={line1Label}
                    line2Label={line2Label}
                    chartDims={chartDims}
                    chartExtras={chartExtras}
                    monthlyChanges={monthlyChanges}
                    unitSymbol={selParam.unit_symbol || ''}
                />
            )
        }

        return (
            <div
                onMouseEnter={this.handleMouseHover}
                onMouseLeave={this.handleMouseHover}
            >
            <LineChart
                width={chartDims.width}
                height={chartDims.height}
                margin={chartDims.margin}
                data={chartData.reverse()}
                onClick ={(val) => {
                    if (chartDataIsDefault) {
                        if (val) {
                            this.props.setActiveLabel(val.activeLabel);
                            this.props.setActiveObjId(val.activePayload[0].payload.id);
                        }
                        this.props.setShowAddQualifier(true);
                        this.props.setHideQualifyText(false)
                    }
                }}
            >
                <XAxis dataKey="date" />
                <YAxis type="number"
                       domain={yAxisDomain}
                       tickFormatter={
                           number => number <= valMin ? '' : valMax > 8 ? parseInt(number) : number.toFixed(1)
                       }
                />
                { valueMean && this.props.showMean && (
                    <ReferenceLine y={valueMean} stroke="#d7cfd9" strokeWidth={1.5}
                                   label={this.state.isHovering ? {
                                       value: 'Average: '.concat(valueMean.toFixed(1)),
                                       fill: '#d7cfd9', position: 'top', } : {}
                                   }
                />
                )}
                { value2Mean && this.props.showMean && (
                    <ReferenceLine y={value2Mean} stroke="#d4dfc3" strokeWidth={1.5}
                                   label={this.state.isHovering ? {
                                       value: 'Average: '.concat(value2Mean.toFixed(1)),
                                       fill: '#d7cfd9', position: 'top', } : {}}
                    />
                )}
                { !this.props.showMean && this.props.selFeatInd === 1 && paramIdeals && paramIdeals.saved && (
                    <ReferenceLine y={paramIdeals.saved} stroke="#ffb600"
                                   label={{position: 'top', fill: '#757b70', value: target1Label}} />) }
                { !this.props.showMean && this.props.selFeatInd === 1 && paramIdeals && paramIdeals.saved2 && (
                    <ReferenceLine
                        y={paramIdeals.saved2} stroke="#ffb600"
                        label={{position: 'top', fill: '#757b70', value: 'Target'.concat(
                            ' (', selParam.upload_field_labels.split(', ')[2], ')')}} />
                )}
                <Tooltip content={<CustomTooltipContent
                        dataPoints={this.props.dataPoints}
                        activeObjId={this.props.activeObjId}
                        setActiveObjId={this.props.setActiveObjId}
                        qualifyingText={qualifyingText}
                    />}
                />
                <Line type="monotone" dataKey={line1Label} stroke="#8884d8" />
                {hasValue2 && (<Line type="monotone" dataKey={line2Label} stroke="#82ca9d" />)}
            </LineChart>
            { chartExtras }
            </div>
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
        ideals: profile.ideals,
        unitInfo: profile.unitInfo,
        rollingMeans: profile.rollingMeans,
        monthlyChanges: profile.monthlyChanges,
        showRollingMeans: body.showRollingMeans,
        showMean: body.showMean,
        showMonthlyDiffs: body.showMonthlyDiffs,
        linkedParams: profile.linkedParams,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setShowAddQualifier: val => dispatch(setShowAddQualifier(val)),
        postQualifyingText: val => dispatch(postQualifyingText(val)),
        resetChartSelection: () => dispatch(resetChartSelection()),
        setShowRollingMeans: (val) => dispatch(setShowRollingMeans(val)),
        setShowMean: (val) => dispatch(setShowMean(val)),
        setShowMonthlyDiffs: (val) => dispatch(setShowMonthlyDiffs(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeSeriesChart);