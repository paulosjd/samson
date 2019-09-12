import React from 'react';
import { Table, UncontrolledTooltip } from "reactstrap";
import { timeSince } from "../../utils/helpers"
import TargetValueAdd from "../form/target_value_add"

const ParamInfo = ({latestDp, selectedParameter, postTargetValue, ideals, editTarget, editTarget2, setEditTargetFlag,
                       setEditTarget2Flag, handleProfileClick}) => {
    console.log(selectedParameter)
    console.log(ideals)


    const paramIdealInfo = selectedParameter.ideal_info || '';
    const paramIdealInfoUrl = selectedParameter.ideal_info_url || '';
    const paramName = selectedParameter.name || '';
    const unitSymbol = selectedParameter.unit_symbol || '';
    const hasVal2 = selectedParameter.num_values > 1;
    const dPvalue = latestDp.value || '';
    const dPvalue2 = latestDp.value2 || '';
    const savedTarget = ideals ? ideals.saved : '';
    const savedTarget2 = ideals ? ideals.saved2 : '';
    let targetRow;
    if (savedTarget && !editTarget) {
        targetRow = (
            <tr className="no-border">
                <td>{'Target value'.concat(
                    hasVal2 ? ' (' + selectedParameter.upload_field_labels.split(', ')[1] + ') ' : '' ,
                    ': ', savedTarget, ' ', unitSymbol, ' ')}
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
                    targetValue={savedTarget || ''}
                    postTargetValue={postTargetValue}
                    paramName={paramName}
                />
            </td></tr>
        )
    }
    let targetRow2 = null;
    if (savedTarget2 && !editTarget2) {
        targetRow2 = (
            <tr className="no-border">
                <td>{'Target value'.concat(
                    hasVal2 ? ' (' + selectedParameter.upload_field_labels.split(', ')[2] + ') ' : '' ,
                    ': ', savedTarget2, ' ', unitSymbol, ' ')}
                    <span onClick={() => setEditTarget2Flag(true)}
                          role="img" aria-label="info" id="target-edit-icon">&#x270F;</span>
                    <UncontrolledTooltip id="ttip" target="target-edit-icon">Edit</UncontrolledTooltip>
                </td>
            </tr>
        )
    } else if (hasVal2) {
        targetRow2 = (
            <tr className="no-border"><td>
                <TargetValueAdd
                    setShowTargetForm={setEditTarget2Flag}
                    targetValue={savedTarget2 || ''}
                    postTargetValue={postTargetValue}
                    paramName={paramName}
                    isVal2={true}
                />
            </td></tr>
        )
    }
    const elapsedT = timeSince(new Date(latestDp.date));
    let idealRow = null;
    if (ideals.ideal) {
        idealRow = (
            <tr className="no-border">
                <td>{'Recommended value: '.concat(ideals.ideal, ' ', unitSymbol, ' ')}
                    <span role="img" aria-label="info" id="info"
                          onClick={()=> window.open(paramIdealInfoUrl, "_blank")}
                    >&#x2139;</span>
                    <UncontrolledTooltip id="ttip" placement="bottom" target="info"
                    >{paramIdealInfo}</UncontrolledTooltip>
                </td>
            </tr>
        )
    } else if (ideals.missing_field) {
        idealRow = (
            <tr className="no-border">
                <td className='info-text'>{ideals.missing_field.concat(' field in Profile needs setting ')}
                    <span role="img" aria-label="info" id="info" onClick={handleProfileClick}>&#x1F527;</span>
                    <UncontrolledTooltip id="ttip" placement="bottom" target="info"
                    >{'Set '.concat(ideals.missing_field.toLowerCase(), ' for additional info')}</UncontrolledTooltip>
                </td>
            </tr>
        )
    }
    const headRow = elapsedT ? (<thead><tr className='short-row'><td>{'Last record: '.concat(
        elapsedT, ' ago')}</td></tr></thead>) : null;

    return (
        <div>
            <Table className='param-info-table' bordered>
                { headRow }
                <tbody>
                { targetRow }
                { targetRow2 }
                { idealRow }
                { ideals.misc_info && ideals.misc_info.map((obj, ind) => {
                    return <tr className="no-border" key={ind}><td>{obj}</td></tr>}) }
                </tbody>
            </Table>
        </div>
    )
};

export default ParamInfo