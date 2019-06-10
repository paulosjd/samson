import React, { Component } from 'react';
import {connect} from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import AuthService from '../../utils/auth_service';
import Register from './register'
import './login.css';
import registration from "../../store/reducers/registration";
import { registrationSubmitBegin, registrationSubmit } from "../../store/actions/user";


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            invalid: false,
            show_register: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    toggleRegister(){
        this.setState({
            show_register: !this.state.show_register
        });
    }
    render() {
        let register = <button onClick={this.toggleRegister.bind(this)}
                               style={{marginTop: 20, height: 25, backgroundColor: '#BFC9B8'}}
                               className="form-submit"
                        >Register</button>;
        if (this.state.show_register) {
            return <Register toggle={this.toggleRegister.bind(this)}
                             isOpen={this.state.show_register}
                             isSubmitting={this.props.isSubmitting}
                             registrationSubmit={this.props.registrationSubmit}
                             registrationSubmitBegin={this.props.registrationSubmitBegin}
            />
        }
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            className="form-item"
                            placeholder="Username"
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                    { this.state.invalid ? <h5 style={{color: 'red'}}>
                        TODO FIX UP</h5> : register }
                </div>
            </div>
        );
    }

    handleFormSubmit(e){
        e.preventDefault();
        this.Auth.login(this.state.username,this.state.password)
            .then(() => {
                this.props.history.replace('/');
            })
            .catch(() => {this.setState({invalid: true})})
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
}

const mapStateToProps = state => {
                    console.log(state.registration.isSubmitting)
    return {
        isSubmitting: state.registration.isSubmitting,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        registrationSubmitBegin: () => dispatch(registrationSubmitBegin()),
        registrationSubmit: (val) => dispatch(registrationSubmit(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
