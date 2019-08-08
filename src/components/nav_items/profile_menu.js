import React from 'react';
import { Modal, ModalHeader, Alert } from 'reactstrap';
import { Formik, Field } from 'formik';
import { ProfileInfo } from '../../schemas/profile'

const ProfileMenu = ({ toggle, isOpen, username, handleSave, profileData }) => {
    const updateSuccess = profileData.profileUpdateSuccess;
    const updateFailure = profileData.profileUpdateFailure;
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-320">
            <ModalHeader>{username}</ModalHeader>
            <Formik
                enableReinitialize
                initialValues={{birthYear: profileData.birth_year, gender: profileData.gender}}
                validationSchema={ProfileInfo}
                onSubmit={handleSave}
            >
                {props => {
                    const startYear = new Date().getFullYear() - 98;
                    const years = Array.from(new Array(80),(val, index) => index + startYear);
                    return (
                        <div className="card">
                            <form onSubmit={props.handleSubmit}>
                                <label htmlFor="birthYear" >Year of birth</label>
                                <Field component="select" name="birthYear" selected={props.values.birthYear}
                                       className="profile-edit-field">
                                    <option value="0"> </option>
                                    {years.map((year, index) => {
                                        return <option key={`year${index}`} value={year}>{year}</option>
                                    })}
                                </Field>
                                <label htmlFor="gender" >Gender</label>
                                <Field component="select" selected={props.values.gender} name="gender"
                                       className="profile-edit-field">
                                    <option value=""> </option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </Field>
                                <button type="submit" className="form-submit reg-submit">Save changes</button>
                            </form>
                        </div>
                    );
                }}
            </Formik>
            { ( updateSuccess || updateFailure ) && (
                <Alert className="profile-edit-alert" color={updateSuccess ? "info" : "warning"}
                >{updateSuccess ? 'Successfully saved!' : 'Sorry, please try again later'}</Alert> ) }
        </Modal>
    );
};
export default ProfileMenu;