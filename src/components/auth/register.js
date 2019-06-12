import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import { Formik } from 'formik';
import { RegisterSchema } from './schemas'

const Register = ({ toggle, isOpen, isSubmitting, registrationSubmit, regSubmitBegin, submitErrors, onRegister }) => {
    const usernameError = (submitErrors && submitErrors.username) ? <div className="auth-errors">
        {submitErrors.username}</div> : undefined;
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="registration-modal">
        <ModalHeader toggle={this.toggle}>Create profile</ModalHeader>
            <Formik
                initialValues={{ email: '', password: '', confirm_password: '', username: ''}}
                validationSchema={RegisterSchema}
                onSubmit={(values) => {
                    regSubmitBegin();
                    registrationSubmit(values, onRegister)}
                }
            >
                {props => {
                    const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
                    return (
                        <div className="card">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username" style={{ display: 'block' }}>Username</label>
                            <input
                                id="username"
                                placeholder="Enter a username"
                                type="text"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={ (usernameError || ( errors.username && touched.username ))
                                              ? 'text-input error' : 'form-item' }
                            />
                            {(usernameError || ( errors.username && touched.username )) && (
                                <div className="auth-errors">{usernameError || errors.username}</div>
                            )}
                            <label htmlFor="password" style={{ display: 'block' }}>Password</label>
                            <input
                                id="password"
                                placeholder="Enter a password"
                                type="text"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.password && touched.password ? 'text-input error' : 'form-item'}
                            />
                            {errors.password && touched.password && (
                                <div className="auth-errors">{errors.password}</div>
                            )}
                            <label htmlFor="password_confirm" style={{ display: 'block' }}>Confirm password</label>
                            <input
                                id="password_confirm"
                                placeholder="Re-enter password"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                                className={errors.password_confirm && touched.password_confirm
                                    ? 'text-input error' : 'form-item'}
                            />
                            {errors.password_confirm && touched.password_confirm && (
                                <div className="auth-errors">{errors.password_confirm}</div>
                            )}
                            <label htmlFor="email" style={{ display: 'block' }}>Email</label>
                            <input
                                id="email"
                                placeholder="Enter an email"
                                type="text"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.email && touched.email ? 'text-input error' : 'form-item'}
                            />
                            {errors.email && touched.email && (<div className="auth-errors">{errors.email}</div>)}
                            { submitErrors && !usernameError && <div className="auth-errors">Please try again</div> }
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="form-submit reg-submit"
                            >
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