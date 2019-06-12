import React, { Component } from 'react';
import {connect} from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import AuthService from '../../utils/auth_service';
import Register from './register'
import { regSubmitBegin, registrationSubmit, refreshRegistration } from "../../store/actions/user";
import { LoginSchema } from './schemas'
import './login.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {show_register: false};
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount() {
        this.props.refreshRegistration();
        if(this.Auth.loggedIn())
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
                             registrationSubmit={this.props.registrationSubmit}
                             regSubmitBegin={this.props.regSubmitBegin}
                             submitErrors={this.props.submitErrors}
                             onRegister={this.loginOnRegistration.bind(this)}
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
                    console.log('{values, touched, errors, handleChange, handleBlur, handleSubmit}')
                    console.log({values, touched, errors, handleChange, handleBlur, handleSubmit})
                    return (
                        <div className="center">
                        <div className="card">
                        <h5>Login</h5>
                        <form onSubmit={handleSubmit}>
                        <input
                            id="username"
                            placeholder="Username"
                            type="text"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.username && touched.username ? 'auth-item-error' : 'form-item'}
                        />
                        {errors.username && touched.username && (<div className="login-error">{errors.username}</div>)}
                        <input
                            id="password"
                            placeholder="Password"
                            type="text"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.password && touched.password ? 'auth-item-error' : 'form-item'}
                        />
                        {errors.password && touched.password && (<div className="login-error">{errors.password}</div>)}
                        <button type="submit" className="form-submit login-submit">Submit</button>
                        </form>
                        <button
                            onClick={this.toggleRegister.bind(this)}
                            style={{marginTop: 20, height: 25, backgroundColor: '#BFC9B8'}}
                            className="form-submit"
                        >Register</button>
                        </div>
                        </div>
                    )
                }}
            </Formik>
        );
    }

    handleFormSubmit(values){
        console.log(values);
        this.Auth.login(values.username, values.password)
            .then(() => {
                this.props.history.replace('/');
            })
    }
}

const mapStateToProps = state => {
    return {
        registrationData: state.registration.regData,
        isSubmitting: state.registration.isSubmitting,
        submitErrors: state.registration.errors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        refreshRegistration: () => dispatch(refreshRegistration()),
        regSubmitBegin: () => dispatch(regSubmitBegin()),
        registrationSubmit: (val, loginOnReg) => dispatch(registrationSubmit(val, loginOnReg)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);