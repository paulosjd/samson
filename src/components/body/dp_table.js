import React from 'react';
import { Table} from "reactstrap";
import DataPointTableEdit from "../form/dp_table_edit";
import DataPointTableAdd from '../form/dp_table_add'
import { toTitleCase } from '../../utils/helpers'

const DataPointTable = ({dataPoints, selectedParameter, setAddDataFlag, setEditDataFlag, editData, postEditedDataPoints,
                         postAddedDataPoints, addData, loadError, clearEditDataFailure }) => {
    let value2;
    let val2headers;
    if (selectedParameter) {
        value2 = selectedParameter.upload_fields.split(', ').includes('value2');
        val2headers = selectedParameter.upload_field_labels.split(', ').map(s => toTitleCase(s))
    }

    if (editData) return (
        <DataPointTableEdit
            loadError={loadError}
            dataPoints={dataPoints}
            selectedParameter={selectedParameter}
            postEditedDataPoints={postEditedDataPoints}
            val2headers={val2headers}
            value2={value2}
        />
    );

    if (addData) return (
        <DataPointTableAdd
            dataPoints={dataPoints.filter(obj => obj.parameter === selectedParameter.name)}
            selectedParameter={selectedParameter}
            postAddedDataPoints={postAddedDataPoints}
            val2headers={val2headers}
        />
    );
    return (
        <div>
            <Table className='data-points-table' bordered>
                <thead>
                <tr className='short-row'>
                    <th colSpan={value2 ? 3 : 2}>
                        { !addData ?
                            <span className='data-points-header-action' role="img" aria-label="plus"
                                  onClick={() => setAddDataFlag(true)}>&#x2795; Add</span> : null }
                        { dataPoints.length > 0 &&
                            <span className='data-points-header-action' role="img" aria-label="pencil"
                                  onClick={() => {clearEditDataFailure(); setEditDataFlag(true) }}
                            >&#x270F;&#xFE0F; Edit</span> }
                        <span className='dp-param-label'
                        >{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>
                    </th>
                </tr>
                { value2 ? <tr className='short-row val2-header'><th> </th>
                    <th>{val2headers[1]}</th><th>{val2headers[2]}</th></tr> : null  }
                </thead>
                <tbody>
                {dataPoints.map(obj => {
                    return (
                        <tr key={obj.id}>
                            <td className='dp-date'>{obj.date}</td>
                            <td style={value2 ? {width : 114} : {}}>{obj.value}</td>
                            { value2 ? <td style={value2 ? {width : 114} : {}}>{obj.value2}</td> : null }
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    )
};

export default DataPointTable