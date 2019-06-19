import React, { Component } from 'react';
import {connect} from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import MenuItems from './menu_items'
import Summary from '../components/summary'
import ProfileMenu from '../components/profile_menu'
import * as actionCreator from "../store/actions/profile";

class MainBody extends Component {

    componentDidMount() {
        this.props.fetchProfileSummaryBegin();
        this.props.fetchProfileSummary()
    }

    render() {

        if ( this.props.error ) {
            console.log(this.props.error)
            return <div>ERROR!!!</div>
        }

        if ( this.props.showProfileMenu ) {
            return <ProfileMenu
                toggle={() => this.props.toggleProfileMenu(false)}
                isOpen={this.props.showProfileMenu}
                username={this.props.username}
                handleSave={this.props.updateProfileMenu}
                profileData={this.props.profile}
            />
        }

        return (
            <Container>
                <Row>
                  <Col xs="3" style={{paddingLeft: 0, paddingRight: 0}}>
                      <MenuItems
                          isLoading={this.props.loading}
                          summaryItems={this.props.summaryItems || []}
                      />
                      <p>Button to add items</p>
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
    return {
        profile: profile,
        error: profile.error,
        loading: profile.loading,
        summaryItems: profile.summaryItems,
        showProfileMenu: profile.showProfileMenu,
        user_id: auth.user_id,
        username: auth.username,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfileSummaryBegin: () => dispatch(actionCreator.fetchProfileSummaryBegin()),
        fetchProfileSummary: () => dispatch(actionCreator.fetchProfileSummary()),
        toggleProfileMenu: (val) => dispatch(actionCreator.showProfileMenu(val)),
        updateProfileMenu: (val) => dispatch(actionCreator.updateProfileInfo(val))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBody);