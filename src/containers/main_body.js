import React, { Component } from 'react';
import * as actionCreator from "../store/actions/profile";
import {connect} from "react-redux";
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import MenuItems from './menu_items'

class MainBody extends Component {

    componentDidMount() {
        // this.props.setPathname()
    }

    handleCategorySelection(catName) {
        // this.props.setCategory(catName);
        // this.props.topicsByCategory()
    }

    render() {
        const { error, loading, items } = this.props
        if ( error ) {
            return <div></div>
        }
        return (
            <Container>
                <Row>
                  <Col xs="4" >
                      <MenuItems />
                  </Col>
                  <Col xs="8" >

                      <MenuItems />
                  </Col>
                </Row>
            </Container>
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
)(MainBody);