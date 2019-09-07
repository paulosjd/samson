import React from 'react';
import { Table, UncontrolledTooltip } from "reactstrap";
import TargetValueAdd from "../form/target_value_add"

const ParamInfo = ({latestDp, selectedParameter, postTargetValue, ideals, editTarget, setEditTargetFlag}) => {
    const paramIdealInfo = selectedParameter.ideal_info || '';
    const paramIdealInfoUrl = selectedParameter.ideal_info_url || '';
    const paramName = selectedParameter.name || '';
    const unitSymbol = selectedParameter.unit_symbol || '';
    const dPvalue = latestDp.value || '';
    const dPvalue2 = latestDp.value2 || '';

    // TODO Use saved ideal - and form to enable add/edit
    // TODO Handle no ideal available - e.g. height not saved for body weight  (e.g. user message and link to bring up profile menu)
    // todO Handling ideal value and target values for value2's e.g. bp

    const savedTarget = ideals ? ideals.saved : '';

    console.log(editTarget)

    let targetRow;
    if (savedTarget && !editTarget) {
        targetRow = (
            <tr className="no-border">
                <td>{'Target value: '.concat(savedTarget, ' ', unitSymbol, ' ')}
                    <span onClick={() => setEditTargetFlag(true)}
                          role="img" aria-label="info" id="target-edit-icon">&#x270F;</span>
                    <UncontrolledTooltip id="ttip" target="target-edit-icon">Edit</UncontrolledTooltip>
                </td>
            </tr>
        )
    } else {
        targetRow = (
            <tr className="no-border"><td>
                <TargetValueAdd
                    setShowTargetForm={setEditTargetFlag}
                    targetValue={savedTarget}
                    postTargetValue={postTargetValue}
                    paramName={paramName}
                />
            </td></tr>
        )
    }

    return (
        <div>
            <Table className='param-info-table' bordered>
                <thead>
                { paramName && (<tr><td>{paramName + ' '}<span>&#x2796;</span>{' '.concat(
                    dPvalue2 ? dPvalue + '/' + dPvalue2 : dPvalue, ' ', unitSymbol)}</td></tr>)}
                </thead>
                <tbody>
                { targetRow }
                { ideals.ideal && (
                    <tr className="no-border">
                        <td>{'Recommended value: '.concat(ideals.ideal, ' ', unitSymbol, ' ')}
                            <span role="img" aria-label="info" id="info"
                                  onClick={()=> window.open(paramIdealInfoUrl, "_blank")}
                            >&#x2139;</span>
                            <UncontrolledTooltip id="ttip" placement="bottom" target="info"
                            >{paramIdealInfo}</UncontrolledTooltip>
                        </td>
                    </tr>
                ) }
                { ideals.misc_info && ideals.misc_info.map((obj, ind) => {
                    return <tr className="no-border" key={ind}><td>{obj}</td></tr>}) }
                </tbody>
            </Table>
        </div>
    )
};

export default ParamInfo




