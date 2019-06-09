import React from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import MenuItemContent from './menu_item_content'

const Summary = (props) => {

    const handleCategorySelection = (value) => {
        // this.props.setCategory(catName);
        // this.props.topicsByCategory()
        console.log(value)
    };
    let item;
    if (props.isLoading){
        item = <Spinner color="secondary" />


    } else if (props.summaryItems.length > 0) {
        item = props.summaryItems.map(obj => { return (
            <MenuItemContent
                key={obj.name}
                label={obj.name}
                param_value={obj.value}
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