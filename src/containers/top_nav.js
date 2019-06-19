import React, { Component } from 'react';
import { Navbar} from 'reactstrap';
import {connect} from "react-redux";
import { showProfileMenu, fetchProfileInfo } from '../store/actions/profile'

class TopNav extends Component {

    render() {
        return (
            <Navbar>
                <h2 onClick={this.props.handleProfileClick} className='mushroom'>🍄</h2>
                <h2 onClick={this.props.handleProfileClick}
                    className="mr-auto profile-name">{'  ' + this.props.username}</h2>
                <button type="button" className="form-submit" onClick={this.props.handleLogout}>Logout</button>
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
        handleProfileClick: () => {dispatch(showProfileMenu(true)); dispatch(fetchProfileInfo())}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav);