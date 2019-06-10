import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";

const Schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    username: Yup.string().required('Username is required')
        .matches(/[a-zA-Z0-9]/, 'Username can only contain numbers and letters'),
    password: Yup.string().required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    password_confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirm is required')
});

const Register = ({ toggle, isOpen, isSubmitting, registrationSubmit, registrationSubmitBegin }) => {
    console.log('is isSubmitting: ' + isSubmitting)
    console.log({toggle, isOpen, isSubmitting, registrationSubmit, registrationSubmitBegin})
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="registration-modal">
        <ModalHeader toggle={this.toggle}>Create profile</ModalHeader>
            <Formik
                initialValues={{ email: '', password: '', confirm_password: '', username: ''}}
                onSubmit={(values) => {registrationSubmitBegin(); registrationSubmit(values)}}
                validationSchema={Schema}
            >
                {props => {
                    const {values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;
                    // console.log(props)
                    // console.log(errors)
                    return (
                        <div className="card">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username" style={{ display: 'block' }}>
                                Username
                            </label>
                            <input
                                id="username"
                                placeholder="Enter a username"
                                type="text"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.username && touched.username ? 'text-input error' : 'form-item'
                                }
                            />
                            {errors.username && touched.username && (
                                <div className="register-input-feedback">{errors.username}</div>
                            )}

                            <label htmlFor="password" style={{ display: 'block' }}>
                                Password
                            </label>
                            <input
                                id="password"
                                placeholder="Enter a password"
                                type="text"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.password && touched.password ? 'text-input error' : 'form-item'
                                }
                            />
                            {errors.password && touched.password && (
                                <div className="register-input-feedback">{errors.password}</div>
                            )}

                            <label htmlFor="password_confirm" style={{ display: 'block' }}>
                                Confirm password
                            </label>
                            <input
                                id="password_confirm"
                                placeholder="Re-enter password"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                                className={
                                    errors.password && touched.password ? 'text-input error' : 'form-item'
                                }
                            />
                            {errors.password && touched.password && (
                                <div className="register-input-feedback">{errors.password}</div>
                            )}

                            <label htmlFor="email" style={{ display: 'block' }}>
                                Email
                            </label>
                            <input
                                id="email"
                                placeholder="Enter an email"
                                type="text"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.email && touched.email ? 'text-input error' : 'form-item'
                                }
                            />
                            {errors.email && touched.email && (
                                <div className="register-input-feedback">{errors.email}</div>
                            )}
                            <button type="submit" disabled={isSubmitting} className="form-submit reg-submit">
                                Submit
                            </button>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        </Modal>
    );
};
export default Register;