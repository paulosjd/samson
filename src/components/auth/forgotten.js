import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Formik } from 'formik';
import { ForgotFieldSchema } from '../../schemas/auth'

const Forgotten = ({ toggle, isOpen, forgotField, sendEmail, passwordResetSent, usernameReminderSent }) => {

    if (passwordResetSent || usernameReminderSent){
        const text = usernameReminderSent ? "We've emailed your username" :
            "We've emailed you instructions for resetting your password";
        return (
            <Modal isOpen={isOpen} toggle={toggle} className="registration-modal">
                <ModalHeader >{forgotField === 'password' ? 'Reset link sent' : 'Username reminder sent'}</ModalHeader>
                <ModalBody>{text}, if an account matching the email exists. You should receive it shortly.</ModalBody>
            </Modal>
        )
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="registration-modal">
            <ModalHeader >{forgotField === 'password' ? 'Reset password' : 'Recover username'}</ModalHeader>
            <h6 className="forgot-field-text">Submit email to receive a {forgotField === 'password' ?
            'password reset link' : 'reminder of your username'}</h6>
            <Formik
                initialValues={{email: ''}}
                validationSchema={ForgotFieldSchema}
                onSubmit={val => sendEmail(forgotField, val)}
            >
                {props => {
                    const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
                    return (
                        <div className="card">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email" style={{ display: 'block' }}>Email</label>
                                <input
                                    id="email"
                                    placeholder="Enter registered email"
                                    type="text"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={errors.email && touched.email ? 'text-input error' : 'form-item'}
                                />
                                {errors.email && touched.email && (<div className="auth-errors">{errors.email}</div>)}
                                <button type="submit" className="form-submit reg-submit">Submit</button>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        </Modal>
    );
};
export default Forgotten;