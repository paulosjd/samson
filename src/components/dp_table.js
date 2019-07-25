import React from 'react';
import { Table } from "reactstrap";

const DataPointTable = ({dataPoints, selectedParameter, setEditDataFlag, editData}) => {

    const handleCategorySelection = (value) => {
        console.log(value)
    };
    console.log(editData)
    console.log(editData)
    console.log(editData)

    let bodyRows;
    if (!editData) {
        bodyRows = dataPoints.map((obj, ind) => { return (
                    <tr key={ind}>
                        <td width={70}>{obj.date}</td>
                        <td width={70}>{obj.value}</td>
                    </tr>)
        })
    } else {
        bodyRows = null
    }



    return (
        <div onBlur={setEditDataFlag}>
        <Table className='data-points-table' bordered hover responsive>
            <thead>
                <tr><th colSpan={2}>
                    <span>{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>
                    <span
                        onClick={() => setEditDataFlag(true)}
                        style={editData ? {display: false} : {}}
                        className='data-points-unit-label'>&#x270F;&#xFE0F; Edit records</span>
                </th></tr>
            </thead>
            <tbody>
            { bodyRows }
            </tbody>
        </Table>
        </div>
    )
};

export default DataPointTable