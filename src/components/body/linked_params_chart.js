import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: null, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];



const LinkedParamsChart = ({ title, dataSet1, dataSet2, ds1param, ds2param }) => {
    const strokes = ["#8884d8", "#82ca9d", "#ff7f00", "#a0d3db"];

    console.log('ds1param!')
    console.log(ds1param)
    console.log(ds2param)
    const ds1hasValue2 = ds1param.num_values > 1;
    const ds2hasValue2 = ds2param.num_values > 1;

    const prepend = (key) => key.replace(/^value/, 'set2_value');
    // {id: 32, parameter: 'sfa', num_values: 2, }
    dataSet2 = dataSet2.map(obj => {
        return { ...obj, [prepend('value')]: obj['value'],
            [prepend('value2')]: obj['value2'] }
    });
    console.log(dataSet1)
    console.log(dataSet2)
    const orderedDtStrings = [...new Set(dataSet1.map(x => new Date(x.date)).concat(
        dataSet2.map(x => new Date(x.date))))
    ].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
    }).map(dt => {
        return ''.concat(dt.getFullYear(), '-', dt.getMonth() + 1, '-', dt.getDate())
    });
    console.log(orderedDtStrings)
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

    console.log(chartData)

    return (
            <React.Fragment>
                <h6 className='chart-title'>{title}</h6>
                <LineChart
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                    width={500}
                    height={300}
                    data={data}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        connectNulls={true}
                        dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line
                        connectNulls={true}
                        type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </React.Fragment>
        );

}
export default LinkedParamsChart