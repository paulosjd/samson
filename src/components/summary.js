import React from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import MenuItemContent from './menu_item_content'
import TimeSeriesChart from './ts_chart'

const Summary = ({isLoading, body}) => {

    const handleCategorySelection = (value) => {
        // this.props.setCategory(catName);
        // this.props.topicsByCategory()
        console.log(value)
    };
    let item;
    if (isLoading){
        item = <Spinner color="secondary" />
    } else {
        return <TimeSeriesChart body={body}/>
    }

    return (
        <ListGroup>
            <ListGroupItem
                className={'cats'} tag="a" >
                {item}
            </ListGroupItem>
        </ListGroup>
    )


};

export default Summary