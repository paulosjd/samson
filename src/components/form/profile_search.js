import React from 'react';
import { Formik } from "formik";
import { ProfileSearchSchema } from "../../schemas/profile";

const ProfileSearch = ({ getProfileMatches, }) => {

    return (
        <Formik
            enableReinitialize
            initialValues={{input_text: ''}}
            validationSchema={ProfileSearchSchema}
            onSubmit={val => getProfileMatches(val.input_text)}
        >
            {props => {
                const {values, touched, handleBlur, errors, handleSubmit, setFieldValue} = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <div className='display-inline'>
                        <label>Search by profile name: </label>
                        <input
                            type='text' name='qualify_text'
                            value={values.qualify_text}
                            onBlur={handleBlur}
                            onChange={ e => { setFieldValue('input_text', e.target.value) }}
                        />
                        <button type='submit' className='qualify-add-btn'
                                style={errors.input_text || !values.input_text ? {backgroundColor: '#c8d8df'} : {}}
                        >Save</button>
                        </div>
                        {errors.input_text && touched.input_text && (
                            <div className="auth-errors">{errors.input_text}</div>
                        )}
                    </form>
                );
            }}
        </Formik>
    );
};
export default ProfileSearch;