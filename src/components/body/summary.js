import React, { useState } from 'react';
import { Spinner } from 'reactstrap';
import TimeSeriesChart from './ts_chart'
import OutsideAction from '../../utils/outside_action'

const Summary = ({isLoading, body, dataPoints, selParam}) => {

    const [ hideQualifyText, setHideQualifyText] = useState(false);
    const [ activeLabel, setActiveLabel] = useState('');
    const [ activeObjId, setActiveObjId] = useState('');

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
                    body={body}
                    hideQualifyText={hideQualifyText}
                    setHideQualifyText={setHideQualifyText}
                    activeLabel={activeLabel}
                    setActiveLabel={setActiveLabel}
                    activeObjId={activeObjId}
                    setActiveObjId={setActiveObjId}
                />
            </OutsideAction>
            </React.Fragment>
        )
    } return null
};

export default Summary