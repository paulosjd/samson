import React from 'react';
import { Table } from "reactstrap";

const DataPointTable = ({dataPoints, selectedParameter}) => {

    const handleCategorySelection = (value) => {
        console.log(value)
    };

    return (
        <Table className='data-points-table' bordered hover responsive>
            <thead>
                <tr><th colSpan={2}>
                    <span>{selectedParameter.name ? selectedParameter.name + ' record' : ''}</span>
                    <span className='data-points-unit-label'>{'Edit button'}</span>
                </th></tr>
            </thead>
            <tbody>
            { dataPoints.map((obj, ind) => {
                return (
                    <tr key={ind}>
                        <td width={70}>{obj.date}</td>
                        <td width={70}>{obj.value}</td>
                    </tr>
                );
            }) }
            </tbody>
        </Table>

    )
};

export default DataPointTable