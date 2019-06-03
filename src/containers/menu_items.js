import React, { Component } from 'react';
import * as actionCreator from "../store/actions/profile";
import {connect} from "react-redux";
import { Col, ListGroup, ListGroupItem } from 'reactstrap';
import MenuItemContent from '../components/menu_item_content'


const testItems = ['Test item 1', 'Foobar!']

class MenuItems extends Component {

    componentDidMount() {
        // this.props.setPathname()
    }

    handleCategorySelection(value) {
        // this.props.setCategory(catName);
        // this.props.topicsByCategory()
        console.log(value)
    }

    render() {
        return (
            <Col xs={this.props.width} >
                <ListGroup>
                    {testItems.map(name => {
                        return (
                            <ListGroupItem
                                className={'cats'} tag="a" key={name}
                                active={name === 'Test item 1'} action>
                                <MenuItemContent
                                    label={name}
                                    handleClick={this.handleCategorySelection.bind(this)}
                                />
                            </ListGroupItem>)
                    })}
                </ListGroup>
            </Col>
        );
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