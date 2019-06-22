import React, { Component } from 'react';
import {connect} from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import MenuItems from './menu_items'
import Summary from '../components/summary'
import ProfileMenu from '../components/navbar_items/profile_menu'
import CsvUploadMenu from '../components/navbar_items/csv_upload_menu'
import InterventionsMenu from '../components/navbar_items/interventions_menu'
import * as actionCreator from "../store/actions/profile";

class MainBody extends Component {

    componentDidMount() {
        this.props.fetchProfileSummaryBegin();
        this.props.fetchProfileSummary()
    }

    render() {
        if ( this.props.error ) {
            console.log(this.props.error)
            return <div>{'ERROR!!!  ' + this.props.error}</div>
        }

        // TODO How can break up reducer func in one file, to separate allow top-nav show/hide state out from but keep in same reduc

        // TODO copy and paste file to move into its own navbar_items file (which has access to store) and everything
        //      then can just have line in here if ... ?

        if ( this.props.showInterventionsMenu ) {
            return <InterventionsMenu
                toggle={() => this.props.toggleInterventionsMenu(!this.props.showInterventionsMenu)}
                isOpen={this.props.showInterventionsMenu}
                profileData={this.props.profile}
            />
        }

        if ( this.props.showCsvUploadMenu ) {
            return <CsvUploadMenu
                toggle={() => this.props.toggleCsvUploadMenu(!this.props.showCsvUploadMenu)}
                isOpen={this.props.showCsvUploadMenu}
                profileData={this.props.profile}
            />
        }

        if ( this.props.showProfileMenu ) {
            return <ProfileMenu
                toggle={() => this.props.toggleProfileMenu(!this.props.showProfileMenu)}
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
        showInterventionsMenu: profile.showInterventionsMenu,
        showCsvUploadMenu: profile.showCsvUploadMenu,
        user_id: auth.user_id,
        username: auth.username,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfileSummaryBegin: () => dispatch(actionCreator.fetchProfileSummaryBegin()),
        fetchProfileSummary: () => dispatch(actionCreator.fetchProfileSummary()),
        toggleProfileMenu: (val) => dispatch(actionCreator.showProfileMenu(val)),
        toggleInterventionsMenu: (val) => dispatch(actionCreator.showInterventionsMenu(val)),
        toggleCsvUploadMenu: (val) => dispatch(actionCreator.showCsvUploadMenu(val)),
        updateProfileMenu: (val) => dispatch(actionCreator.updateProfileInfo(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBody);