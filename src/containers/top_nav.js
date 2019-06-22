import React, { Component } from 'react';
import { Navbar, UncontrolledTooltip } from 'reactstrap';
import {connect } from "react-redux";
import { fetchProfileInfo, showNavItem } from '../store/actions/profile'

// TODO make dry so
//         showCsvUploadMenu: () => dispatch(showCsvUploadMenu(true)),  called like:
//                                () => this.props.showModalMenu('csv_upload')   in onclick
//                                  (val) => dispatch(showModalMenu(val, true))   dispatchtoprops
//                                              case ... statement in actions
//                                                      to combine showProfileMenu, show...Menu etc. in to func which dispatches accordingly

class TopNav extends Component {

    render() {
        return (
            <Navbar>
                <span role="img" aria-label="Mushroom" className='nav-item' id="profile"
                      onClick={this.props.handleProfileClick}
                >&#x1F344;</span>
                <UncontrolledTooltip id="ttip" placement="below" target="profile"
                >Profile information</UncontrolledTooltip>

                <span onClick={this.props.handleProfileClick} className="mr-auto nav-item"
                >{'  ' + this.props.username}</span>

                <span role="img" aria-label="upload" className='nav-item' id="upload"
                      onClick={() => this.props.showNavItem('csv_upload')}
                >&#x1F4E4;</span>
                <UncontrolledTooltip id="ttip" placement="below" target="upload"
                >CSV data upload</UncontrolledTooltip>

                <span role="img" aria-label="Panda" className='nav-item' id="effectors"
                      onClick={this.props.showInterventionsMenu}
                >&#9731;</span>
                <UncontrolledTooltip id="ttip" placement="below" target="effectors"
                >Health effectors</UncontrolledTooltip>

                <button type="button" className="form-submit"
                        onClick={this.props.handleLogout}
                >Logout</button>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleProfileClick: () => { dispatch(showNavItem('profile', true)); dispatch(fetchProfileInfo()) },
        showNavItem: (item) => dispatch(showNavItem(item, true)),
        showInterventionsMenu: () => dispatch(showNavItem('interventions', true)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav);