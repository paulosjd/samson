import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import * as bodyActionCreator from "../store/actions/body";
import {postMenuItemAdd} from "../store/actions/profile";
import {connect} from "react-redux";


class TimeSeriesChart extends PureComponent {

    render() {
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
                date: obj.date, [line1Label]: obj.value, [line2Label]: obj.value2
            };
            return { date: obj.date, value: obj.value }
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
            <LineChart
                width={520}
                height={300}
                data={chartData.reverse()}
                margin={{top: 5, right: 16, left: 22, bottom: 5, }}
            >
                <XAxis dataKey="date" />
                <YAxis type="number" domain={[dataMin => (dataMin - offset), dataMax => (dataMax + offset)]}
                       tickFormatter={
                           number => number <= valMin ? '' : valMax > 8 ? parseInt(number) : number.toFixed(1)
                       }
                />
                <Tooltip />
                <Line type="monotone" dataKey={line1Label} stroke="#8884d8" activeDot={{ r: 8 }} />
                {hasValue2 && (<Line type="monotone" dataKey={line2Label} stroke="#82ca9d" />)}
            </LineChart>
        );
    }
}

const mapStateToProps = ({auth, body, extras, menu, profile}) => {
    const blankItems = profile.blankParams.map(x => {return {
        parameter: x, data_point: {date: '', value: '', value2: ''}
    }});
    return {
        dataPoints: profile.dataPoints || [],
        selectedParameter: profile.summaryItems.concat(blankItems)[body.selectedItemIndex]
            ? profile.summaryItems.concat(blankItems)[body.selectedItemIndex].parameter : '',
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // setAddDataFlag: val => dispatch(setAddDataFlag(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeSeriesChart);