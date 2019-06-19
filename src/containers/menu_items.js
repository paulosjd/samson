import React, { Component } from 'react';
import * as actionCreator from "../store/actions/profile";
import {connect} from "react-redux";
import {Col, ListGroup, ListGroupItem, Spinner} from 'reactstrap';
import MenuItemContent from '../components/menu_item_content'

class MenuItems extends Component {

    handleCategorySelection(value) {
        console.log(value)
    }

    render() {
        let items;
        if (this.props.isLoading) {
            items = <Spinner color="secondary"/>
        } else if (this.props.summaryItems.length > 0) {
            items = this.props.summaryItems.map(obj => {
                return (
                    <ListGroupItem key={obj.parameter.name} action>
                        <MenuItemContent
                            date={obj.data_point.date}
                            label={obj.parameter.name.concat(
                                ': ', obj.data_point.value, '', obj.parameter.default_unit_symbol)}
                            handleClick={this.handleCategorySelection.bind(this)}
                        />
                    </ListGroupItem>)
            })
        } else {
            items = <h2>You need to add items</h2>
        }
        return <ListGroup>{items}</ListGroup>

    }
}

const mapStateToProps = state => {
    return {
        // categories: state.categories,
        // allTopics: state.allTopics,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // setTopic: (val) => dispatch(actionCreator.setTopic(val)),
        // setCategory: (val) => dispatch(actionCreator.setCategory(val)),
        // topicsByCategory: () => dispatch(actionCreator.topicsByCategory()),
        // setPathname: () => dispatch(actionCreator.setPathname())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuItems);