import React, { useState } from 'react';
import { Spinner } from 'reactstrap';
import TimeSeriesChart from '../components/body/ts_chart'
import OutsideAction from '../utils/outside_action'
import LinkedParamsChart from '../components/body/linked_params_chart'

const Summary = ({isLoading, body, dataPoints, selParam, linkedParamsList, summaryParams}) => {

    const [ hideQualifyText, setHideQualifyText] = useState(false);
    const [ activeLabel, setActiveLabel] = useState('');
    const [ activeObjId, setActiveObjId] = useState('');

    let linkedParams;
    const lpInd = linkedParamsList.findIndex(x => x.includes(selParam.name) && x.length === 2);
    if (lpInd > -1) {
        linkedParams = linkedParamsList[lpInd]
    }
    let linkedParamsChart = null;
    if (linkedParams && linkedParams.length === 2) {
        const ds2ParamInd = summaryParams.findIndex(x => x.name === linkedParams[1]);
        if (ds2ParamInd > -1) {
            linkedParamsChart = (
                <LinkedParamsChart
                    title={linkedParams.join(' vs ')}
                    dataSet1={dataPoints.filter(obj => obj.parameter === linkedParams[0])}
                    dataSet2={dataPoints.filter(obj => obj.parameter === linkedParams[1])}
                    ds1param={selParam}
                    ds2param={summaryParams[ds2ParamInd]}
                />
            )
        }
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
                {linkedParamsChart}
                
            </React.Fragment>
        )
    } return null
};

export default Summary