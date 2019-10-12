import React from 'react';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const MonthlyBarChart = ({ chartExtras, chartDims, monthlyChanges }) => {

    console.log(monthlyChanges)

    const data = monthlyChanges.map(obj => {
        return {month: obj.month, value: obj.value}
    });

    const data2 = [
        {
            name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
            name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
            name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
        },
        {
            name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
        },
        {
            name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        },
    ];

    return (
        <React.Fragment>
        <BarChart
            width={chartDims.width}
            height={chartDims.height}
            margin={chartDims.margin}
            data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
        { chartExtras }
        </React.Fragment>
    )

};

export default MonthlyBarChart