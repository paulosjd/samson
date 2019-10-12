import React, { Component } from 'react';
import { Navbar, UncontrolledTooltip } from 'reactstrap';
import {connect } from "react-redux";
import { fetchProfileInfo, showNavItem } from '../store/actions/profile'
import { setShowRegForm, userLogout } from '../store/actions/user'


class TopNav extends Component {
    render() {
        return (
            <Navbar>
                <span role="img" aria-label="Mushroom" className='nav-item' id="profile"
                      onClick={this.props.handleProfileClick}
                >&#x1F344;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="profile"
                >Profile information</UncontrolledTooltip>

                <span onClick={this.props.handleProfileClick} className="mr-auto nav-item"
                >{'  ' + this.props.username}</span>

                <span role="img" aria-label="palette" id="color_scheme" className='right-18 csr-pt'
                      onClick={this.props.showColorSchemeMenu}
                >&#x1F58C;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="color_scheme"
                >Color labeling</UncontrolledTooltip>

                <span role="img" aria-label="palette" id="schedule_scheme" className='right-18 fontsize16 csr-pt'
                      onClick={this.props.showColorSchemeMenu}
                >&#x1F4C5;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="schedule_scheme"
                >Scheduling</UncontrolledTooltip>

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

                {this.props.isDemo && (
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleProfileClick: () => { dispatch(showNavItem('profile', true)); dispatch(fetchProfileInfo()) },
        showNavItem: (item) => dispatch(showNavItem(item, true)),
        showColorSchemeMenu: () => dispatch(showNavItem('interventions', true)),
        setShowRegForm: () => dispatch(setShowRegForm(true)),
        userLogout: () => dispatch(userLogout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav);