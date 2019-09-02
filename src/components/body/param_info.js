import React from 'react';
import { Table} from "reactstrap";
import DataPointTableEdit from "../form/dp_table_edit";
import DataPointTableAdd from '../form/dp_table_add'
import { toTitleCase } from '../../utils/helpers'

// const DataPointTable = ({dataPoints, selectedParameter, setAddDataFlag, setEditDataFlag, editData, postEditedDataPoints,
//                             postAddedDataPoints, addData, loadError, clearEditDataFailure }) => {

const ParamInfo = ({latestDp, selectedParameter, ideals}) => {
    console.log(ideals)
    const paramName = selectedParameter.name || '';
    const ideal = ideals[paramName];
    console.log(ideal)

    const unitSymbol = selectedParameter.unit_symbol || '';
    const dPvalue = latestDp.value || '';

    return (
        <div>
            <Table className='param-info-table' bordered>
                <thead>
                { paramName && (<tr><td>{paramName + ' '}<span>&#x2796;</span>{' '.concat(
                    dPvalue, ' ', unitSymbol)}</td></tr>)}
                </thead>
                <tbody>
                { ideal && (<tr className="no-border"><td>{'Recommended value: ' + ideal.ideal}</td></tr>)  }
                    <tr className="no-border"><td>Bar!22</td></tr>
                    <tr className="no-border"><td>Bar!22</td></tr>
                    <tr className="no-border"><td>Bar!22</td></tr>
                </tbody>
            </Table>
        </div>
    )
};

export default ParamInfo




