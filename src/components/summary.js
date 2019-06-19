import React from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import MenuItemContent from './menu_item_content'
import TimeSeriesChart from './ts_chart'

const Summary = (props) => {

    const handleCategorySelection = (value) => {
        // this.props.setCategory(catName);
        // this.props.topicsByCategory()
        console.log(value)
    };
    let item;
    if (props.isLoading){
        item = <Spinner color="secondary" />
    } else if (true) {
            return <TimeSeriesChart />
    }
    else if (props.summaryItems.length > 0) {
        item = props.summaryItems.map(obj => { return (
            <MenuItemContent
                key={obj.parameter.name}
                date={obj.data_point.date}
                label={obj.parameter.name.concat(': ', obj.data_point.value, '', obj.parameter.default_unit_symbol)}
                handleClick={handleCategorySelection}
            /> )
        })
    } else {
        item = <h2>You need to add items</h2>
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