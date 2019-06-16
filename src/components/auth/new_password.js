import React, { Component } from 'react';
import {connect} from "react-redux";
import { Formik } from 'formik';
import { passwordResetConfirm } from "../../store/actions/user";
import { ResetConfirmSchema } from '../../schemas/auth'
import './login.css';
import { Modal, ModalHeader } from "reactstrap";
import axios from "axios";
import {userConstants} from "../../store/constants/user";
import AuthService from "../../utils/auth_service";

class NewPasswordConfirm extends Component {

    constructor(props){
        console.log('new pword constructor')
        super(props);
        this.state = {
            show_register: false,
            login_fail: false,
            show_help: false,
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();

    }
    handleFormSubmit(values){
        const body = {new_password: values.new_password, uid: this.props.match.params.uid,
            token: this.props.match.params.token};
        this.props.passwordResetConfirm(body);
        this.props.history.replace('/')
    }
    render() {
        return (
            <Modal isOpen={true} className="registration-modal">
                <ModalHeader>Enter new password</ModalHeader>
                <h6 className="forgot-field-text">Please enter your new password twice to reset it</h6>
                <Formik
                    initialValues={{ new_password: '', new_password2: ''}}
                    validationSchema={ResetConfirmSchema}
                    onSubmit={this.handleFormSubmit}
                >
                    {props => {
                        const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
                        return (
                            <div className="card">
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="new_password" style={{ display: 'block' }}>New password</label>
                                    <input
                                        id="new_password"
                                        placeholder="Enter a password"
                                        type="password"
                                        value={values.new_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.new_password && touched.new_password ?
                                            'text-input error' : 'form-item new-password'}
                                    />
                                    {errors.new_password && touched.new_password && (
                                        <div className="auth-errors">{errors.new_password}</div>
                                    )}
                                    <label htmlFor="new_password2" style={{ display: 'block' }}>Confirm password</label>
                                    <input
                                        id="new_password2"
                                        placeholder="Re-enter password"
                                        type="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="off"
                                        className={errors.new_password2 && touched.new_password2
                                            ? 'text-input error' : 'form-item'}
                                    />
                                    {errors.new_password2 && touched.new_password2 && (
                                        <div className="auth-errors">{errors.new_password2}</div>
                                    )}
                                    <button type="submit" className="form-submit reg-submit">Submit</button>
                                </form>
                            </div>
                        );
                    }}
                </Formik>
            </Modal>
        );

    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        passwordResetConfirm: (val) => dispatch(passwordResetConfirm(val))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPasswordConfirm);