import React, { Component } from 'react';
import * as actionCreator from "../store/actions/profile";
import {connect} from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import MenuItems from './menu_items'
import FeatItems from './feat_items'
import Summary from '../components/summary'


class MainBody extends Component {

    componentDidMount() {
        this.props.fetchProfileSummaryBegin();
        this.props.fetchProfileSummary(this.props.user_id)
    }

    render() {
        console.log(this.props.summaryItems)
        console.log(this.props.loading)

        // TODO SHOW SPINNER LOADING

        if ( this.props.error ) {
            console.log(this.props.error)
            return <div>ERROR!!!</div>
        }
        return (
            <Container>
                <Row>
                  <Col xs="3" style={{paddingLeft: 0, paddingRight: 0}}>
                      <MenuItems />
                  </Col>
                  <Col xs="9" style={{paddingLeft: 0, paddingRight: 0}}>
                      <Summary
                          isLoading={this.props.loading}
                          summaryItems={this.props.summaryItems || []}/>
                  </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({profile, auth}) => {
    console.log('profile')
    console.log(profile)
    return {
        error: profile.error,
        loading: profile.loading,
        summaryItems: profile.summaryItems,
        user_id: auth.user_id,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfileSummaryBegin: () => dispatch(actionCreator.fetchProfileSummaryBegin()),
        fetchProfileSummary: (user_id) => dispatch(actionCreator.fetchProfileSummary(user_id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBody);