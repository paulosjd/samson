import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import TimeSeriesChart from './ts_chart'
import OutsideAction from '../../utils/outside_action'

const Summary = ({isLoading, body, summaryItems}) => {
    const [ hideQualifyText, setHideQualifyText] = useState(false);
    const [ activeLabel, setActiveLabel] = useState('');


    const handleCategorySelection = (value) => {
        // this.props.setCategory(catName);
        // this.props.topicsByCategory()
        console.log(value)
    };
    if (isLoading){
        return (
            <ListGroup>
                <ListGroupItem
                    className={'cats'} tag="a" >
                    <Spinner color="secondary" />
                </ListGroupItem>
            </ListGroup>
        )
    } else {
        return (
            <OutsideAction action={() => setHideQualifyText(true)}>
                <TimeSeriesChart
                    body={body}
                    hideQualifyText={hideQualifyText}
                    setHideQualifyText={setHideQualifyText}
                    activeLabel={activeLabel}
                    setActiveLabel={setActiveLabel}
                />
            </OutsideAction>
        )
    }
};

export default Summary