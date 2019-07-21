import React, { Component } from 'react';
import {connect} from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import MenuItems from './menu_items'
import NavItems from './nav_items'
import Summary from '../components/summary'
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
        if (Object.values(this.props.menu).includes(true)) {
            return <NavItems props={this.props}/>
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
                          body={this.props.body}
                          isLoading={this.props.loading}
                          summaryItems={this.props.summaryItems || []}/>
                  </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({auth, body, extras, menu, profile}) => {
    return {
        body: body,
        profile: profile,
        extras: extras,
        error: profile.error,
        loading: profile.loading,
        summaryItems: profile.summaryItems,
        menu: menu,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfileSummaryBegin: () => dispatch(actionCreator.fetchProfileSummaryBegin()),
        fetchProfileSummary: () => dispatch(actionCreator.fetchProfileSummary()),
        toggleNavItem: (item, val) => dispatch(actionCreator.showNavItem(item, val)),
        updateProfileMenu: (val) => dispatch(actionCreator.updateProfileInfo(val)),
        postCsvUpload: (val) => dispatch(actionCreator.postCsvUpload(val)),
        csvUploadConfirm: (data, meta) => dispatch(actionCreator.confirmCsvUpload(data, meta)),
        clearCsvLoad: () => dispatch(actionCreator.clearCsvLoad()),
        getCsvDownload: (val) => dispatch(actionCreator.getCsvDownload(val))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBody);