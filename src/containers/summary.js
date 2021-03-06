import React, { useState } from 'react';
import { Spinner } from 'reactstrap';
import TimeSeriesChart from '../components/body/ts_chart'
import OutsideAction from '../utils/outside_action'
import LinkedParamAdd from '../components/form/linked_param_add'
import LinkedParamsChart from '../components/body/linked_params_chart'
import {useSelector} from "react-redux";

const Summary = ({isLoading, body, dataPoints, selParam, linkedParams, summaryParams, setShowLinkedParamAdd,
                  showAddLinkedParam, postLinkedParams, isShareView}) => {

    const [ hideQualifyText, setHideQualifyText] = useState(false);
    const [ activeLabel, setActiveLabel] = useState('');
    const [ activeObjId, setActiveObjId] = useState('');

    const content = useSelector(state => state);
    summaryParams = summaryParams.concat(content.profile.blankParams);

    let linkedParam;
    if (linkedParams) {
        linkedParam = linkedParams[selParam.name];
    }
    const paramLinksAvailable = summaryParams.filter(obj => obj.id !== selParam.id);
    let showLinkedParamAddBtn = !showAddLinkedParam && paramLinksAvailable.length > 0;
    let linkedParamsChart = null;
    if (linkedParam) {
        const ds2ParamInd = summaryParams.findIndex(x => x.name === linkedParam);
        if (ds2ParamInd > -1) {
            showLinkedParamAddBtn = false;
            linkedParamsChart = (
                <LinkedParamsChart
                    title={selParam.name.concat(' vs ', linkedParam)}
                    dataSet1={dataPoints.filter(obj => obj.parameter === selParam.name)}
                    dataSet2={dataPoints.filter(obj => obj.parameter === linkedParam)}
                    ds1param={selParam}
                    ds2param={summaryParams[ds2ParamInd]}
                />
            )
        }
    }

    let linkedParamAddForm;
    if (showAddLinkedParam) {
        linkedParamAddForm = (
            <OutsideAction action={() => setShowLinkedParamAdd(false)}>
                <LinkedParamAdd
                    availParams={paramLinksAvailable}
                    postLinkedParams={postLinkedParams}
                    paramId={selParam.id}
                />
            </OutsideAction>
        )
    }

    if (isLoading){
        return (
            <div className='sum-spin'>
                <Spinner color="secondary" />
            </div>
        )
    } else if (dataPoints.map(x => x.parameter).includes(selParam.name)) {
        return (
            <React.Fragment>
            <OutsideAction action={() => setHideQualifyText(true)}>
                <TimeSeriesChart
                    selectedItemIndex={body.selectedItemIndex}
                    hideQualifyText={hideQualifyText}
                    setHideQualifyText={setHideQualifyText}
                    activeLabel={activeLabel}
                    setActiveLabel={setActiveLabel}
                    activeObjId={activeObjId}
                    setActiveObjId={setActiveObjId}
                />
            </OutsideAction>
            { !isShareView && showLinkedParamAddBtn && (
                <div className='add-linked-param-btn' ><span role="img" aria-label="plus"
                     onClick={() => setShowLinkedParamAdd(true)}
                >&#x2795; Add linked parameter</span></div>) }
            { linkedParamAddForm }
            { linkedParamsChart }
            </React.Fragment>
        )
    } return null
};

export default Summary