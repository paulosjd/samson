import React from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import MenuItemContent from './menu_item_content'
import TimeSeriesChart from './ts_chart'

const Summary = ({isLoading, body, summaryItems}) => {

    console.log(summaryItems)
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
        return <TimeSeriesChart body={body}/>
    }
};

export default Summary