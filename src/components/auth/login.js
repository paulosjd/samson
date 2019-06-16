import React, { Component } from 'react';
import {connect} from "react-redux";
import { Formik } from 'formik';
import { Alert } from 'reactstrap';
import AuthService from '../../utils/auth_service';
import Register from './register'
import Forgotten from './forgotten'
import { regSubmitBegin, registrationSubmit, refreshRegistration, forgottenLogin } from "../../store/actions/user";
import { LoginSchema } from '../../schemas/auth'
import './login.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            show_register: false,
            login_fail: false,
            show_help: false,
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount() {
        this.props.refreshRegistration();
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    toggleRegister() {
        this.props.refreshRegistration();
        this.setState({show_register: !this.state.show_register});
    }
    loginOnRegistration() {
        this.Auth.setToken(this.props.registrationData.data.token);
        this.props.history.replace('/');
    }
    render() {
        if (this.state.show_register) {
            return <Register toggle={this.toggleRegister.bind(this)}
                             isOpen={this.state.show_register}
                             isSubmitting={this.props.isSubmitting}
                             regSubmit={this.props.registrationSubmit}
                             regSubmitBegin={this.props.regSubmitBegin}
                             submitErrors={this.props.submitErrors}
                             onRegister={this.loginOnRegistration.bind(this)}
                             clearErr={this.props.refreshRegistration.bind(this)}
            />
        }
        if (this.state.show_help) {
            return <Forgotten toggle={this.toggleLoginHelp.bind(this)}
                              isOpen={this.state.show_help}
                              forgotField={this.state.help_topic}
                              sendEmail={this.props.forgottenLogin}
                              passwordResetSent={this.props.passwordResetSent}
                              usernameReminderSent={this.props.usernameReminderSent}
            />
        }
        return (
            <Formik
                initialValues={{ username: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={this.handleFormSubmit}
            >
                {props => {
                    const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
                    return (
                        <div className="center">
                        <div className="card">
                        <h5>Login</h5>
                        <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={values.username}
                            onBlur={handleBlur}
                            onChange={val => {handleChange(val); this.setState({login_fail: false})}}
                            className={errors.username && touched.username ? 'auth-item-error' : 'form-item'}
                        />
                        {errors.username && touched.username && (<div className="login-error">{errors.username}</div>)}
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={val => {handleChange(val); this.setState({login_fail: false})}}
                            className={errors.password && touched.password ? 'auth-item-error' : (
                                this.state.login_fail && !errors.username && !errors.password )
                                ? 'password-invalid-login' : 'form-item'}
                        />
                        {errors.password && touched.password && (<div className="login-error">{errors.password}</div>)}
                        { this.state.login_fail && !errors.username && !errors.password && (
                            <div className="login-error">Invalid credentials</div> )}
                        <button type="submit" className="form-submit login-submit">Submit</button>
                        </form>
                        <button
                            onClick={this.toggleRegister.bind(this)}
                            className="form-submit reg-modal-button"
                        >Register</button>
                            <div className="forgot-links">
                                {['username', 'password'].map(str => {
                                    return <h6 data-field={str} onClick={this.toggleLoginHelp.bind(this)} key={str}
                                               className="forgot-field">Forgot {str}</h6>
                                })}
                            </div>
                            { this.props.passwordReset && (
                                <Alert className="password-reset-done"
                                       color={this.props.passwordReset.includes('invalid') ? "danger" : "primary"}
                                >{this.props.passwordReset}</Alert>
                            )}
                        </div>
                        </div>
                    )
                }}
            </Formik>
        );
    }
    handleFormSubmit(values){
        this.Auth.login(values.username, values.password)
            .then(() => {this.props.history.replace('/')})
            .catch(() => this.setState({login_fail: true}));
    }
    toggleLoginHelp(event) {
        this.props.refreshRegistration();
        this.setState({show_help: !this.state.show_help, help_topic: event.target.getAttribute('data-field')})
    }
}

const mapStateToProps = state => {
    return {
        registrationData: state.registration.regData,
        isSubmitting: state.registration.isSubmitting,
        submitErrors: state.registration.errors,
        passwordReset: state.registration.passwordReset,
        passwordResetSent: state.registration.passwordResetSent,
        usernameReminderSent: state.registration.usernameReminderSent,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        refreshRegistration: () => dispatch(refreshRegistration()),
        regSubmitBegin: () => dispatch(regSubmitBegin()),
        registrationSubmit: (val, loginOnReg) => dispatch(registrationSubmit(val, loginOnReg)),
        forgottenLogin: (fType, val) => dispatch(forgottenLogin(fType, val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);