import React from 'react';
import {Table, UncontrolledTooltip} from "reactstrap";

const ParamInfo = ({latestDp, selectedParameter, ideals}) => {
    const paramIdealInfo = selectedParameter.ideal_info || '';
    const paramName = selectedParameter.name || '';
    const unitSymbol = selectedParameter.unit_symbol || '';
    const dPvalue = latestDp.value || '';
    // TODO Use saved ideal - and form to enable add/edit
    // TODO Handle no ideal available - e.g. height not saved for body weight  (e.g. user message and link to bring up profile menu)
    const savedTarget = ideals ? ideals.saved : '';

    return (
        <div>
            <Table className='param-info-table' bordered>
                <thead>
                { paramName && (<tr><td>{paramName + ' '}<span>&#x2796;</span>{' '.concat(
                    dPvalue, ' ', unitSymbol)}</td></tr>)}
                </thead>
                <tbody>
                { ideals.ideal && (<tr className="no-border"><td>{'Recommended value: '.concat(
                    ideals.ideal, ' ', unitSymbol, ' ')}<span role="img" aria-label="info" id="info">&#x2139;</span>
                    <UncontrolledTooltip id="ttip" placement="bottom" target="info"
                    >{paramIdealInfo}</UncontrolledTooltip></td></tr>) }
                { ideals.misc_info && ideals.misc_info.map((obj, ind) => {
                    return <tr className="no-border" key={ind}><td>{obj}</td></tr>})
                }
                </tbody>
            </Table>
        </div>
    )
};

export default ParamInfo




