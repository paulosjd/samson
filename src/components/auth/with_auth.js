import React, { Component } from 'react';
import { connect } from "react-redux";
import AuthService from '../../utils/auth_service';
import { loginSuccess } from "../../store/actions/user";


export default function withAuth(AuthComponent) {

    const Auth = new AuthService();

    class AuthWrapped extends Component {

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    const profile = Auth.getProfile();
                    this.props.loginSuccess(profile);
                }
                catch(err){
                    Auth.logout();
                    this.props.history.replace('/login')
                }
            }
        }

        render() {
            if (this.props.user) {
                return (
                    <AuthComponent
                        history={this.props.history}
                        user={this.props.user}
                    />
                )
            } else return null
        }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.auth
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            loginSuccess: (user) => dispatch(loginSuccess(user)),
        };
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(AuthWrapped)
}