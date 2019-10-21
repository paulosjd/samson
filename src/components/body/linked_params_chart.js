import React from 'react';
import { LineChart, Line, XAxis, YAxis, Legend } from 'recharts';

const LinkedParamsChart = ({ title, dataSet1, dataSet2, ds1param, ds2param }) => {

    const prepend = (key) => key.replace(/^value/, 'set2_value');
    dataSet2 = dataSet2.map(obj => {
        return { ...obj, [prepend('value')]: obj['value'],
            [prepend('value2')]: obj['value2'] }
    });

    const orderedDtStrings = [...new Set(dataSet1.map(x => new Date(x.date)).concat(
        dataSet2.map(x => new Date(x.date))))
    ].sort((a, b) => {
        return a - b;
    }).map(dt => {
        return ''.concat(dt.getFullYear(), '-', dt.getMonth() + 1, '-', dt.getDate())
    });

    const stripLeadingZero = (str) => str.replace(/-0/g, '-');
    const chartData = [];
    for (let dtStr of orderedDtStrings) {
        const ds1ind = dataSet1.findIndex(x => stripLeadingZero(x.date) === dtStr);
        const ds2ind = dataSet2.findIndex(x => stripLeadingZero(x.date) === dtStr);
        let obj = {date: dtStr, value: null, value2: null, set2_value: null, set2_value2: null};
        if (ds1ind > -1) {
            obj = { ...obj, value: dataSet1[ds1ind].value, value2: dataSet1[ds1ind].value2}
        }
        if (ds2ind > -1) {
            obj = { ...obj, set2_value: dataSet2[ds2ind].value, set2_value2: dataSet2[ds2ind].value2}
        }
        chartData.push(obj)
    }

    const ds1hasValue2 = ds1param.num_values > 1;
    const ds2hasValue2 = ds2param.num_values > 1;
    let ds1line1Label = ds1param.name.concat(' (', ds1param.unit_symbol, ')');
    let ds1line2Label;
    if (ds1hasValue2) {
        [ds1line1Label, ds1line2Label] = ds1param.upload_field_labels.split(', ').splice(
            1, 2).map(str => ds1param.name.concat(
                ' - ', str, ' (', ds1param.unit_symbol, ')'));
    }
    let ds2line1Label = ds1param.name.concat(' (', ds1param.unit_symbol, ')');
    let ds2line2Label;
    if (ds2hasValue2) {
        [ds2line1Label, ds2line2Label] = ds2param.upload_field_labels.split(', ').splice(
            1, 2).map(str => ds2param.name.concat(
                ' - ', str, ' (', ds2param.unit_symbol, ')'));
    }

    return (
        <React.Fragment>
            <h6 className='chart-title'>{title}</h6>
            <LineChart
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
                width={500}
                height={300}
                data={chartData}
            >
                <XAxis dataKey="date" />
                <YAxis />
                <Legend />
                <Line
                    type="monotone"
                    connectNulls={true}
                    dataKey="value"
                    stroke="#8884d8"
                    name={ds1line1Label}
                />
                { ds1hasValue2 && (
                    <Line
                        connectNulls={true}
                        type="monotone"
                        dataKey="value2"
                        stroke="#82ca9d"
                        name={ds1line2Label}
                    />
                )}
                <Line
                    type="monotone"
                    connectNulls={true}
                    dataKey="set2_value"
                    stroke="#ff7f00"
                    name={ds2line1Label}
                />
                { ds2hasValue2 && (
                    <Line
                        connectNulls={true}
                        type="monotone"
                        dataKey="set2_value2"
                        stroke="#a0d3db"
                        name={ds2line2Label}
                    />
                )}
            </LineChart>
        </React.Fragment>
    );
};
export default LinkedParamsChart