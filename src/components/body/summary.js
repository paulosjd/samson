import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import TimeSeriesChart from './ts_chart'
import OutsideAction from '../../utils/outside_action'

const Summary = ({isLoading, body, dataPoints}) => {

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
    } else if (dataPoints[body.selectedItemIndex]) {
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
    } else return null
};

export default Summary