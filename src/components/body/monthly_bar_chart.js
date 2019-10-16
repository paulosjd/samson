import React from 'react';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const MonthlyBarChart = ({ chartExtras, chartDims, monthlyChanges, line1Label, line2Label, hasValue2, unitSymbol }) => {

    monthlyChanges = monthlyChanges.map(obj => {
        return {month: obj.month, [line1Label]: obj.value, [line2Label]: obj.value2}
    });

    return (
        <React.Fragment>
        <BarChart
            width={chartDims.width}
            height={chartDims.height}
            margin={chartDims.margin}
            data={monthlyChanges.reverse()}
        >
            <XAxis dataKey="month" />
            <YAxis />
            <Bar
                dataKey={line1Label}
                fill="#8884d8"
            />
            {hasValue2 && (
                <Bar
                    dataKey={line2Label}
                    fill="#82ca9d"
                />
            )}
            <Tooltip
                formatter={(value) => value + ' ' + unitSymbol}
                cursor={{fill: 'transparent'}}
            />
        </BarChart>
        { chartExtras }
        </React.Fragment>
    )

};

export default MonthlyBarChart