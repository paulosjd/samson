import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import TimeSeriesChart from './ts_chart'
import OutsideAction from '../../utils/outside_action'

const Summary = ({isLoading, body, dataPoints, selParam}) => {

    const [ hideQualifyText, setHideQualifyText] = useState(false);
    const [ activeLabel, setActiveLabel] = useState('');
    const [ activeObjId, setActiveObjId] = useState('');

    if (isLoading){
        return (
            <ListGroup>
                <ListGroupItem
                    className={'cats'} tag="a" >
                    <Spinner color="secondary" />
                </ListGroupItem>
            </ListGroup>
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
    } else {console.log('return null in summary - half correct -  should USE SAME SELPARAM AS FEATURE DOES SO THAT IN SYNC ' +
        'BUT ALSO THIS SHOULD JUST RETURN 1ST ITEM INDEX 0 IF NO MATCH AND ARE AVAILABLE.. - must jsut be logic in feature - how is selects item');  return null}
};

export default Summary