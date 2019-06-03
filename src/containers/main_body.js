import React, { Component } from 'react';
import * as actionCreator from "../store/actions/profile";
import {connect} from "react-redux";
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import MenuItems from './menu_items'
import FeatItems from './feat_items'
import Summary from './summary'


class MainBody extends Component {

    componentDidMount() {
        this.props.fetchProfileDataSuccess()
    }

    handleCategorySelection(catName) {
        // this.props.setCategory(catName);
        // this.props.topicsByCategory()
    }

    render() {
        console.log(this.props.summaryItems)
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
                      <Summary summaryItems={this.props.summaryItems || []}/>
                      <MenuItems />
                  </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({profile}) => {
    return {
        summaryItems: profile.summaryItems,
        // allTopics: state.allTopics,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfileDataSuccess: (val) => dispatch(actionCreator.fetchProfileDataSuccess()),
        // setCategory: (val) => dispatch(actionCreator.setCategory(val)),
        // topicsByCategory: () => dispatch(actionCreator.topicsByCategory()),
        // setPathname: () => dispatch(actionCreator.setPathname())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBody);