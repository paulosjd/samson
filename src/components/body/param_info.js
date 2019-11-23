import React from 'react';
import { Table, UncontrolledTooltip } from "reactstrap";
import { timeSince } from "../../utils/helpers"
import TargetValueAdd from "../form/target_value_add"
import { toTitleCase } from '../../utils/helpers'

const ParamInfo = ({latestDp, selectedParameter, postTargetValue, ideals, editTarget, editTarget2, setEditTargetFlag,
                       setEditTarget2Flag, handleProfileClick, unitInfo, isShareView}) => {

    const paramIdealInfo = selectedParameter.ideal_info || '';
    const paramIdealInfoUrl = selectedParameter.ideal_info_url || '';
    const paramName = selectedParameter.name || '';
    const unitSymbol = selectedParameter.unit_symbol || '';
    const hasVal2 = selectedParameter.num_values > 1;
    let val2headers = [];
    if (selectedParameter) {
        val2headers = selectedParameter.upload_field_labels.split(', ').map(s => toTitleCase(s))
    }
    const savedTarget = ideals ? ideals.saved : '';
    const savedTarget2 = ideals ? ideals.saved2 : '';
    let targetRow;
    if (savedTarget && !editTarget) {
        targetRow = (
            <tr className="no-border">
                <td>{'Target value'.concat(
                    hasVal2 ? ' (' + selectedParameter.upload_field_labels.split(', ')[1] + ') ' : '',
                    ': ', savedTarget, ' ', unitSymbol, ' ')}
                    { !isShareView && (
                        <React.Fragment>
                            <span onClick={() => setEditTargetFlag(true)}
                                  role="img" aria-label="info" id="target-edit-icon">&#x270F;</span>
                            <UncontrolledTooltip id="ttip" target="target-edit-icon">Edit</UncontrolledTooltip>
                        </React.Fragment>
                    )}
                </td>
            </tr>
        )
    } else {
        targetRow = !isShareView ? (
            <tr className="no-border">
                <td>
                    <TargetValueAdd
                        setShowTargetForm={setEditTargetFlag}
                        targetValue={savedTarget || ''}
                        postTargetValue={postTargetValue}
                        paramId={selectedParameter.id}
                        labelSuffix={hasVal2 ? val2headers[1] : ''}
                    />
                </td>
            </tr>
        ) : null
    }

    let targetRow2 = null;
    if (savedTarget2 && !editTarget2) {
        targetRow2 = (
            <tr className="no-border">
                <td>{'Target value'.concat(
                    hasVal2 ? ' (' + selectedParameter.upload_field_labels.split(', ')[2] + ') ' : '',
                    ': ', savedTarget2, ' ', unitSymbol, ' ')}
                    { !isShareView && (
                        <React.Fragment>
                            <span onClick={() => setEditTarget2Flag(true)}
                                  role="img" aria-label="info" id="target-edit-icon">&#x270F;</span>
                            <UncontrolledTooltip id="ttip" target="target-edit-icon">Edit</UncontrolledTooltip>
                        </React.Fragment>
                    )}
                </td>
            </tr>
        )
    } else if (hasVal2) {
        targetRow2 = !isShareView ? (
            <tr className="no-border">
                <td>
                    <TargetValueAdd
                        setShowTargetForm={setEditTarget2Flag}
                        targetValue={savedTarget2 || ''}
                        postTargetValue={postTargetValue}
                        paramId={selectedParameter.id}
                        isVal2={true}
                        labelSuffix={val2headers[2]}
                    />
                </td>
            </tr>
        ) : null
    }

    let miscInfo = [];
    let recommendedExtras = [];
    if (ideals && ideals.misc_info) {
        miscInfo = [...ideals.misc_info];
        let i = miscInfo.length;
        while (i--) {
            if (miscInfo[i].startsWith('Recommended')) {
                recommendedExtras.unshift(...miscInfo.splice(i, 1));
            }
        }
        recommendedExtras.forEach((val, ind) => recommendedExtras[ind] = val.substring(12));
    }

    const getConFactor = () => {
        let conFactor = 1;
        if (unitInfo && unitInfo.length > 0) {
            const unitInfoInd = unitInfo.findIndex(x => x.param_name === paramName);
            if (unitInfoInd > -1) {
                conFactor = unitInfo[unitInfoInd].conversion_factor || 1
            }
        }
        return conFactor
    };

    const getIdealVal = () => {
        let idealVal = ideals.ideal * getConFactor();
        if (!Number.isInteger(idealVal)){
            idealVal = idealVal.toFixed(1)
        }
        return idealVal
    };

    let idealRow = null;
    if (ideals && ideals.ideal2 && val2headers[2]) {
        let idealVal = getIdealVal();
        let idealVal2 = ideals.ideal2 * getConFactor();
        if (!Number.isInteger(idealVal2)){
            idealVal2 = idealVal2.toFixed(1)
        }
        idealRow = (
            <React.Fragment>
            <tr className="no-border two-ideal-row">
                <td>Recommended values <span role="img" aria-label="info" id="info"
                          onClick={()=> window.open(paramIdealInfoUrl, "_blank")}
                    >&#x2139;</span>
                    <UncontrolledTooltip id="ttip" placement="bottom" target="info"
                    >{paramIdealInfo}</UncontrolledTooltip>
                </td>
            </tr>
            <tr className="no-border two-ideal-row">
                <td className="left10">{val2headers[1].concat(
                    ': ', ideals.ideal_prepend || '', idealVal, ' ', unitSymbol)}</td>
            </tr>
            <tr className="no-border two-ideal-row">
                <td className="left10">{val2headers[2].concat(
                    ': ', ideals.ideal2_prepend || '', idealVal2, ' ', unitSymbol)}</td>
            </tr>
                {recommendedExtras.map((obj, ind) => {
                    return <tr className="no-border two-ideal-row" key={ind}><td className="left10">{obj}</td></tr>})}
            </React.Fragment>
        )
    }
    else if (ideals && ideals.ideal) {
        let idealVal = getIdealVal();
        idealRow = (
            <tr className="no-border">
                <td>{'Recommended value: '.concat(ideals.ideal_prepend || '', idealVal, ' ', unitSymbol, ' ')}
                    <span role="img" aria-label="info" id="info"
                          onClick={()=> window.open(paramIdealInfoUrl, "_blank")}
                    >&#x2139;</span>
                    <UncontrolledTooltip id="ttip" placement="bottom" target="info"
                    >{paramIdealInfo}</UncontrolledTooltip>
                </td>
            </tr>
        )
    } else if (ideals && ideals.missing_field) {
        idealRow = (
            <tr className="no-border">
                <td className='info-text'>{ideals.missing_field.concat(' field in profile needs setting ')}
                    { !isShareView && (
                        <React.Fragment>
                            <span role="img" aria-label="info" id="info" onClick={handleProfileClick}>&#x1F527;</span>
                            <UncontrolledTooltip id="ttip" placement="bottom" target="info">
                                {'Set '.concat(ideals.missing_field.toLowerCase(), ' for additional info')}
                            </UncontrolledTooltip>
                        </React.Fragment>
                    )}
                </td>
            </tr>
        )
    }
    const elapsedT = timeSince(new Date(latestDp.date));
    const headRow = elapsedT ? (
        <thead>
        <tr className='short-row'><td>{'Last record: '.concat( elapsedT, ' ago')}</td></tr>
        </thead>) : null;

    return (
        <div>
            <Table className='param-info-table' bordered>
                { headRow }
                <tbody>
                { selectedParameter ? targetRow : null }
                { targetRow2 }
                { idealRow }
                { miscInfo.map((obj, ind) => {
                    return <tr className="no-border" key={ind}><td>{obj}</td></tr>}) }
                </tbody>
            </Table>
        </div>
    )
};

export default ParamInfo