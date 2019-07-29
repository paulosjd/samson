import React from 'react';
import { Table } from "reactstrap";
import DataPointTableEdit from "./form/dp_table_edit";
import {postEditedDataPoints} from "../store/actions/body";

const DataPointTable = ({dataPoints, selectedParameter, setEditDataFlag, editData, postEditedDataPoints}) => {
    if (!editData) {
        return (
            <div onBlur={setEditDataFlag}>
                <Table className='data-points-table' bordered>
                    <thead>
                    <tr>
                        <th colSpan={2}>
                            <span>{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>
                            <span onClick={() => setEditDataFlag(true)} className='data-points-header-action'
                            >&#x270F;&#xFE0F; Edit records</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataPoints.map(obj => {
                        return (
                            <tr key={obj.id}>
                                <td>{obj.date}</td>
                                <td>{obj.value}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        )
    } else {
        return (
            <div onBlur={setEditDataFlag}>
                <DataPointTableEdit
                    dataPoints={dataPoints}
                    selectedParameter={selectedParameter}
                    postEditedDataPoints={postEditedDataPoints}
                />
            </div>
        )
    }
};

export default DataPointTable