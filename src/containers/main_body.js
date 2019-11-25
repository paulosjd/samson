import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import MenuItems from './menu_items'
import NavItems from './nav_items'
import Summary from './summary'
import Feature from './feature'
import * as actionCreator from "../store/actions/profile";
import {
    setFeatItemIndex, setEditDataFlag, postEditedDataPoints, setAddDataFlag, clearEditDataFailure, setShowAddMetric,
    postTargetValue, setEditTargetFlag, setEditTarget2Flag, setShowLinkedParamAdd, postLinkedParams
} from "../store/actions/body";
import OutsideAction from '../utils/outside_action'
import {
    showNavItem, fetchProfileInfo, postColorSchema, postEditedBookmarks, postLinkedParamsEdit
} from "../store/actions/profile";
import { confirmAccountDelete, postNewEmail, requestVerificationEmail } from "../store/actions/user";


class MainBody extends Component {

    componentDidMount() {
        this.props.fetchProfileSummaryBegin();
        this.props.fetchProfileSummary();
        this.props.resetSelectedItemIndex();
    }

    render() {
        if (this.props.error) {
            console.log(this.props.error);
            this.props.handleLogout()
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
                            summaryItems={this.props.summaryItems}
                            blankItems={this.props.blankItems}
                        />
                    </Col>
                    <Col xs="5" style={{paddingLeft: 0, paddingRight: 0}}>
                        <Summary
                            body={this.props.body}
                            isLoading={this.props.loading}
                            dataPoints={this.props.dataPoints}
                            selParam={this.props.selectedParameter}
                            linkedParams={this.props.linkedParams}
                            summaryParams={this.props.summaryParams}
                            setShowLinkedParamAdd={this.props.setShowLinkedParamAdd}
                            showAddLinkedParam={this.props.showAddLinkedParam}
                            postLinkedParams={this.props.postLinkedParams}
                            isShareView={this.props.isShareView}
                        />
                    </Col>
                    <Col xs="4" style={{paddingLeft: 0, paddingRight: 0}}>
                        <OutsideAction
                            action={() => {
                                this.props.setEditDataFlag(false);
                                this.props.setAddDataFlag(false);
                                this.props.setEditTargetFlag(false);
                                this.props.setEditTarget2Flag(false);
                                this.props.clearEditDataFailure();
                            }}
                        >
                        <Feature
                            dataPoints={this.props.dataPoints}
                            body={this.props.body}
                            unitInfo={this.props.profile.unitInfo}
                            ideals={this.props.profile.ideals}
                            bookmarks={this.props.profile.bookmarks}
                            clearEditDataFailure={this.props.clearEditDataFailure}
                            selectedParameter={this.props.selectedParameter}
                            setFeatItemIndex={this.props.setFeatItemIndex}
                            setEditDataFlag={this.props.setEditDataFlag}
                            setEditTargetFlag={this.props.setEditTargetFlag}
                            setEditTarget2Flag={this.props.setEditTarget2Flag}
                            postEditedDataPoints={this.props.postEditedDataPoints}
                            setAddDataFlag={this.props.setAddDataFlag}
                            postAddedDataPoints={this.props.postAddedDataPoints}
                            postTargetValue={this.props.postTargetValue}
                            handleProfileClick={this.props.handleProfileClick}
                            postEditedBookmarks={this.props.postEditedBookmarks}
                            postAddedBookmarks={this.props.postAddedBookmarks}
                            isShareView={this.props.isShareView}
                        />
                        </OutsideAction>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({auth, body, extras, menu, profile}) => {

    const blankItems = profile.blankParams.map(x => {return {
        parameter: x, data_point: {date: '', value: '', value2: ''}
    }});

    return {
        body: body,
        blankItems: blankItems,
        profile: profile,
        extras: extras,
        summaryParams: profile.summaryItems.map(obj => obj.parameter),
        allParams: profile.allParams,
        error: profile.error,
        loading: profile.loading,
        dataPoints: profile.dataPoints || [],
        unitInfo: profile.unitInfo,
        selectedParameter: profile.summaryItems.concat(blankItems)[body.selectedItemIndex]
            ? profile.summaryItems.concat(blankItems)[body.selectedItemIndex].parameter : '',
        summaryItems: profile.summaryItems || [],
        menu: menu,
        linkedParams: profile.linkedParams,
        showAddLinkedParam: body.showAddLinkedParam,
        isShareView: profile.isShareView
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfileSummaryBegin: () => dispatch(actionCreator.fetchProfileSummaryBegin()),
        fetchProfileSummary: () => dispatch(actionCreator.fetchProfileSummary()),
        resetSelectedItemIndex: () => dispatch(actionCreator.resetSelectedItemIndex()),
        setFeatItemIndex: val => dispatch(setFeatItemIndex(val)),
        setEditDataFlag: val => dispatch(setEditDataFlag(val)),
        setAddDataFlag: val => dispatch(setAddDataFlag(val)),
        setEditTargetFlag: val => dispatch(setEditTargetFlag(val)),
        setEditTarget2Flag: val => dispatch(setEditTarget2Flag(val)),
        postEditedDataPoints: val => dispatch(postEditedDataPoints(val)),
        postAddedDataPoints: val => dispatch(postEditedDataPoints(val, 'add')),
        postEditedBookmarks: val => dispatch(postEditedBookmarks(val)),
        postAddedBookmarks: val => dispatch(postEditedBookmarks(val, 'add')),
        toggleNavItem: (item, val) => dispatch(actionCreator.showNavItem(item, val)),
        updateProfileMenu: (val) => dispatch(actionCreator.updateProfileInfo(val)),
        postCsvUpload: (val) => dispatch(actionCreator.postCsvUpload(val)),
        csvUploadConfirm: (data, meta) => dispatch(actionCreator.confirmCsvUpload(data, meta)),
        clearLoadError: () => dispatch(actionCreator.clearLoadError()),
        getCsvDownload: (val) => dispatch(actionCreator.getCsvDownload(val)),
        clearEditDataFailure: () => dispatch(clearEditDataFailure()),
        setShowAddMetric: (val) => dispatch(setShowAddMetric(val)),
        postTargetValue: (val) => dispatch(postTargetValue(val)),
        handleProfileClick: () => { dispatch(showNavItem('profile', true)); dispatch(fetchProfileInfo()) },
        postColorSchema: (val) => dispatch(postColorSchema(val)),
        setShowLinkedParamAdd: (val) => dispatch(setShowLinkedParamAdd(val)),
        postLinkedParams: (val, action) => dispatch(postLinkedParams(val, action)),
        postLinkedParamsEdit: (val) => dispatch(postLinkedParamsEdit(val)),
        postNewEmail: (val) => dispatch(postNewEmail(val)),
        requestVerificationEmail: () => dispatch(requestVerificationEmail()),
        confirmAccountDelete: () => dispatch(confirmAccountDelete()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBody);