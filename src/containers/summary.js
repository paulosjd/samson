import React, { Component } from 'react';
import * as actionCreator from "../store/actions/profile";
import {connect} from "react-redux";
import { Col, ListGroup, ListGroupItem } from 'reactstrap';
import MenuItemContent from '../components/menu_item_content'


class Summary extends Component {

    componentDidMount() {
        // this.props.setPathname()
    }

    handleCategorySelection(value) {
        // this.props.setCategory(catName);
        // this.props.topicsByCategory()
        console.log(value)
    }

    render() {
        let foo

        if (this.props.summaryItems.length > 0) {
            foo = this.props.summaryItems.map(obj => { return (
                <MenuItemContent
                    key={obj.name}
                    label={obj.name}
                    param_value={obj.value}
                    handleClick={this.handleCategorySelection.bind(this)}
                /> )
            })
        } else {
            foo = <h2>You need to add items</h2>
        }
        return (
            <ListGroup>
                <ListGroupItem
                    className={'cats'} tag="a" >
                    {foo}
                </ListGroupItem>
            </ListGroup>
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
)(Summary);