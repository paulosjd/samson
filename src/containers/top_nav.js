import React, { Component } from 'react';
import { Navbar, UncontrolledTooltip, Alert } from 'reactstrap';
import {connect } from "react-redux";
import { fetchProfileInfo, fetchProfileShareInfo, showNavItem, fetchProfileSummary } from '../store/actions/profile'
import { setShowRegForm, userLogout } from '../store/actions/user'

class TopNav extends Component {

    render() {

        if (this.props.isShareView && this.props.shareViewUsername) {
            return (
                <Navbar>
                    <span className="nav-item sv_username color4a fontsize18">
                        {this.props.shareViewUsername}</span>
                    <span className="mr-auto nav-item sv_notify">shared view</span>
                    <button
                        type="button" className="leave_sv"
                        onClick={this.props.fetchProfileSummary}
                    >Return to my profile</button>
                    { this.props.isDemo && (
                        <button type="button" className="form-submit"
                                onClick={() => this.props.handleLogout('register', this.props.setShowRegForm)}
                        >Register</button>
                    )}
                    <button
                        type="button" className="form-submit"
                        onClick={(e) => {
                            this.props.handleLogout(e);
                            this.props.userLogout()
                        }}
                    >Logout</button>
                </Navbar>
            )
        }

        return (
            <Navbar>
                <span role="img" aria-label="Mushroom" className='nav-item' id="profile"
                      onClick={this.props.handleProfileClick}
                >&#x1F344;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="profile"
                >Profile information</UncontrolledTooltip>

                <span onClick={this.props.handleProfileClick} className="mr-auto nav-item color4a left-6 fontsize18"
                >{ this.props.username }</span>

                { this.props.hasReportFile && (
                    <Alert className="pend-share-alert" style={{padding: 0.2}} color="success"
                    >Download complete</Alert> )}

                { (this.props.shareRequestsReceived.length > 0 || this.props.isDemo) && (
                    <Alert className="pend-share-alert" style={{padding: 0.2}} color="warning"
                           onClick={this.props.handleSharesMenuClick}>Pending requests</Alert> )}

                <span role="img" aria-label="palette" id="color_scheme" className='right-18 csr-pt'
                      onClick={this.props.showColorSchemeMenu}
                >&#x1F58C;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="color_scheme"
                >Color labeling</UncontrolledTooltip>

                <span role="img" aria-label="palette" id="schedule_scheme" className='right-18 fontsize15 csr-pt'
                      onClick={this.props.showLinkedParamsMenu}
                >&#x1F4C5;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="schedule_scheme"
                >Linked parameters</UncontrolledTooltip>

                <span role="img" aria-label="shares" className='right-18 fontsize18 csr-pt' id="shares"
                      onClick={this.props.handleSharesMenuClick}
                >&#x1F5C3;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="shares"
                >Shared user profiles</UncontrolledTooltip>

                <span role="img" aria-label="report" className='right-18 fontsize18 csr-pt' id="report"
                      onClick={() => this.props.showNavItem('report_download')}
                >&#x1F4CB;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="report"
                >Report download</UncontrolledTooltip>

                <span role="img" aria-label="download" className='right-18 fontsize18 csr-pt' id="download"
                      onClick={() => this.props.showNavItem('csv_download')}
                >&#x1F4E5;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="download"
                >CSV data download</UncontrolledTooltip>

                <span role="img" aria-label="upload" className='right-18 fontsize18 csr-pt' id="upload"
                      onClick={() => this.props.showNavItem('csv_upload')}
                >&#x1F4E4;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="upload"
                >CSV data upload</UncontrolledTooltip>

                { this.props.isDemo && (
                    <button type="button" className="form-submit"
                            onClick={() => this.props.handleLogout('register', this.props.setShowRegForm)}
                    >Register</button>
                )}
                <button
                    type="button" className="form-submit"
                    onClick={(e) => {
                        this.props.handleLogout(e);
                        this.props.userLogout()
                    }}
                >Logout</button>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    const isDemo = state.auth.username ?  state.auth.username.startsWith('demo_') : false;
    return {
        isDemo: isDemo,
        username: isDemo ? 'Guest' : state.auth.username,
        shareRequestsReceived: state.extras.share_requests_received,
        isShareView: state.profile.isShareView,
        shareViewUsername: state.profile.shareViewUsername,
        hasReportFile: state.profile.hasReportFile,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleProfileClick: () => {
            dispatch(showNavItem('profile', true));
            dispatch(fetchProfileInfo()) },
        handleSharesMenuClick: () => {
            dispatch(showNavItem('profile_shares', true));
            dispatch(fetchProfileShareInfo()) },
        showNavItem: (item) => dispatch(showNavItem(item, true)),
        showColorSchemeMenu: () => dispatch(showNavItem('interventions', true)),
        showLinkedParamsMenu: () => dispatch(showNavItem('linked_params', true)),
        setShowRegForm: () => dispatch(setShowRegForm(true)),
        fetchProfileSummary: () => dispatch(fetchProfileSummary()),
        userLogout: () => dispatch(userLogout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav);