import React, { Component } from 'react';
import { Navbar } from 'reactstrap';
import {connect} from "react-redux";

class TopNav extends Component {

    render() {
        return (
            <Navbar>
                <h2 className="foobar">Welcome {this.props.username}</h2>
                <p className="foobar">
                    <button type="button" className="form-submit" onClick={this.props.handleLogout}>Logout</button>
                </p>
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

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav);