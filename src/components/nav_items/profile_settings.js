import React from 'react';
import {Modal, Alert, UncontrolledTooltip} from 'reactstrap';
import { Formik, Field } from 'formik';
import { EmailField } from '../../schemas/profile'

const ProfileSettings = ({ email, saveEmail, editMode, setEditMode, isVerified, postNewEmail }) => {

    if (!editMode){
        return (
            <table>
            <tbody>
                <tr className="no-border">
                    <td>Email:
                        <span style={{paddingLeft:8}}>
                            {email.length <= 25 ? email : email.substring(0, 23).concat('...')}
                        </span>
                        <span onClick={() => setEditMode(true)} role="img" aria-label="info" className='csr-pt left-6'>
                            &#x270F;
                        </span>
                    </td>
                </tr>
            </tbody>
            </table>
        )
    } else {
        return (
            <Formik
                enableReinitialize
                initialValues={{email: email}}
                validationSchema={EmailField}
                onSubmit={(val) => {
                    postNewEmail(val);
                    setEditMode(false)
                }}
            >
                {props => {
                    const {values, touched, handleBlur, errors, handleSubmit, setFieldValue} = props;
                    return (
                        <form onSubmit={handleSubmit}>
                        <table className='top-14'>
                        <tbody>
                            <tr className="no-border">
                                <td>
                                    <label>Enter new email address: </label>
                                </td>
                            </tr>
                            <tr className="no-border">
                                <td>
                                <input
                                    className='email-input'
                                    type='text' name='target_value'
                                    value={values.email}
                                    maxLength="50"
                                    onBlur={handleBlur}
                                    onChange={ e => { setFieldValue('email', e.target.value) }}
                                />
                                <button type='submit' className='qualify-add-btn margin-top-initial left-14'
                                        style={!values.email || errors.email ? {backgroundColor: '#c8d8df'} : {}}
                                ><span role="img" aria-label="save" >&#x2714;&#xFE0F;</span> Save
                                </button>
                                {touched.email && errors.email && <div className='dp-edit-err'>{errors.email}</div>}
                                </td>
                            </tr>
                        </tbody>
                        </table>
                        </form>
                    );
                }}
            </Formik>
        );
    }
};
export default ProfileSettings;