import React from 'react';
import { Table} from "reactstrap";
import DataPointTableEdit from "../form/dp_table_edit";
import DataPointTableAdd from '../form/dp_table_add'
import { toTitleCase } from '../../utils/helpers'

// const DataPointTable = ({dataPoints, selectedParameter, setAddDataFlag, setEditDataFlag, editData, postEditedDataPoints,
//                             postAddedDataPoints, addData, loadError, clearEditDataFailure }) => {

const ParamInfo = ({latestDp, selectedParameter}) => {
    const paramName = selectedParameter.name || '';
    const unitSymbol = selectedParameter.unit_symbol || '';
    const dPvalue = latestDp.value || '';
    const header = paramName ?
        <th>{paramName + ' '}<span>&#x2796;</span>{' '.concat(dPvalue, ' ', unitSymbol)}</th> : null;

    return (
        <div>
            <Table className='param-info-table' bordered>
                <thead>
                    {header}
                </thead>
                <tbody>
                    <tr className="no-border"><td>Bar!22</td></tr>
                    <tr className="no-border"><td>Bar!22</td></tr>
                    <tr className="no-border"><td>Bar!22</td></tr>
                </tbody>
            </Table>
        </div>
    )
};

export default ParamInfo