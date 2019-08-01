import React from 'react';
import { Table } from "reactstrap";
import DataPointTableEdit from "./form/dp_table_edit";
import DataPointTableAdd from '../components/form/dp_table_add'
import { toTitleCase } from '../utils/helpers'


const DataPointTable = ({dataPoints, selectedParameter, setAddDataFlag, setEditDataFlag, editData, postEditedDataPoints,
                         postAddedDataPoints, addData}) => {

    let value2;
    let val2headers;
    if (selectedParameter) {
        value2 = selectedParameter.upload_fields.split(', ').includes('value2');
        val2headers = selectedParameter.upload_field_labels.split(', ').map(s => toTitleCase(s))
    }

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
                        <th colSpan={value2 ? 3 : 2}>
                            <span>{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>
                            <span className='data-points-header-action' onClick={() => setEditDataFlag(true)} >
                                &#x270F;&#xFE0F; Edit records
                            </span>
                        </th>
                    </tr>
                    { value2 ? <tr className='short-row val2-header'>
                        <th> </th><th>{val2headers[1]}</th><th>{val2headers[2]}</th>
                    </tr> : null  }
                    </thead>
                    <tbody>
                    {dataPoints.map(obj => {
                        return (
                            <tr key={obj.id}>
                                <td className='dp-date'>{obj.date}</td>
                                <td>{obj.value}</td>
                                { value2 ? <td>{obj.value2}</td> : null }
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
    )
};

export default DataPointTable