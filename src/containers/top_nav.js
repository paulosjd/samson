import React, { Component } from 'react';
import { Navbar, UncontrolledTooltip } from 'reactstrap';
import {connect } from "react-redux";
import { fetchProfileInfo, showNavItem } from '../store/actions/profile'
import { setShowRegForm } from '../store/actions/user'


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

                <span role="img" aria-label="download" className='nav-item' id="download"
                      onClick={() => this.props.showNavItem('csv_download')}
                >&#x1F4E5;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="download"
                >CSV data download</UncontrolledTooltip>

                <span role="img" aria-label="upload" className='nav-item' id="upload"
                      onClick={() => this.props.showNavItem('csv_upload')}
                >&#x1F4E4;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="upload"
                >CSV data upload</UncontrolledTooltip>

                <span role="img" aria-label="Panda" className='nav-item' id="effectors"
                      onClick={this.props.showInterventionsMenu}
                >&#9731;</span>
                <UncontrolledTooltip id="ttip" placement="bottom" target="effectors"
                >Health effectors</UncontrolledTooltip>

                {this.props.isDemo && (
                    <button type="button" className="form-submit"
                            onClick={() => this.props.handleLogout('register', this.props.setShowRegForm)}
                    >Register</button>
                )}
                <button type="button" className="form-submit"
                        onClick={this.props.handleLogout}
                >Logout</button>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    const isDemo = state.auth.username.startsWith('demo_')
    return {
        isDemo: isDemo,
        username: isDemo ? 'Guest' : state.auth.username,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleProfileClick: () => { dispatch(showNavItem('profile', true)); dispatch(fetchProfileInfo()) },
        showNavItem: (item) => dispatch(showNavItem(item, true)),
        showInterventionsMenu: () => dispatch(showNavItem('interventions', true)),
        setShowRegForm: () => dispatch(setShowRegForm(true)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav);