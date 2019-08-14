import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import * as bodyActionCreator from "../store/actions/body";
import {postMenuItemAdd} from "../store/actions/profile";
import {connect} from "react-redux";
import {setAddDataFlag} from "../store/actions/body";
import DataPointTableAdd from "./dp_table";


class TimeSeriesChart extends PureComponent {

    render() {
        let hasValue2;
        if (this.props.selectedParameter.upload_fields)
            hasValue2 = this.props.selectedParameter.upload_fields.split(', ').includes('value2');
        const values = [];
        const dataPoints = this.props.dataPoints.filter(obj => obj.parameter === this.props.selectedParameter.name);
        const chartData = dataPoints.map(obj => {
            // if
            return { date: obj.date, value: obj.value, value2: obj.value2 }
        });
        chartData.forEach(obj => {
            values.push(obj.value);
            if (hasValue2 && obj.value2){
                values.push(obj.value2)
            }
        });
        const valMin = Math.min(...values);
        const valMax = Math.max(...values);
        const offset = (valMax - valMin) / 2.6;

        console.log(chartData)

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
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                {hasValue2 && (<Line type="monotone" dataKey="value2" stroke="#82ca9d" />)}
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