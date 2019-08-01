import React from 'react';
import { Table } from "reactstrap";
import DataPointTableEdit from "./form/dp_table_edit";
import DataPointTableAdd from '../components/form/dp_table_add'


const DataPointTable = ({dataPoints, selectedParameter, setAddDataFlag, setEditDataFlag, editData, postEditedDataPoints,
                         postAddedDataPoints, addData}) => {
    if (editData) return (
                <DataPointTableEdit
                    dataPoints={dataPoints}
                    selectedParameter={selectedParameter}
                    postEditedDataPoints={postEditedDataPoints}
                />
    );
    else if (addData) return (
                <DataPointTableAdd
                    dataPoints={dataPoints.filter(obj => obj.parameter === selectedParameter.name)}
                    selectedParameter={selectedParameter}
                    postAddedDataPoints={postAddedDataPoints}
                />
    );
    else return (
            <div>
                <Table className='data-points-table' bordered>
                    <thead>
                    <tr className='short-row'>
                        <th colSpan={2}>
                            <span>{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>
                            <span className='data-points-header-action' onClick={() => setEditDataFlag(true)} >
                                &#x270F;&#xFE0F; Edit records
                            </span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataPoints.map(obj => {
                        return (
                            <tr key={obj.id}>
                                <td className='dp-date'>{obj.date}</td>
                                <td>{obj.value}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
    )
};

export default DataPointTable