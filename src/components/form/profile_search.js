import React from 'react';
import { Formik } from "formik";
import { ProfileSearchSchema } from "../../schemas/profile";

const ProfileSearch = ({ getProfileMatches }) => {

    return (
        <Formik
            enableReinitialize
            initialValues={{input_text: ''}}
            validationSchema={ProfileSearchSchema}
            onSubmit={val => { if (val.input_text) getProfileMatches(val.input_text) }}
        >
            {props => {
                const {values, touched, handleBlur, errors, handleSubmit, setFieldValue} = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <div className='display-inline'>
                        <input
                            type='text' name='qualify_text'
                            value={values.input_text}
                            onBlur={handleBlur}
                            onChange={ e => { setFieldValue('input_text', e.target.value) }}
                        />
                        <button type='submit' className='qualify-add-btn left-6'
                                style={errors.input_text || !values.input_text ? {backgroundColor: '#c8d8df'} : {}}
                        >Search</button>
                        </div>
                        {errors.input_text && touched.input_text && (
                            <div className="dp-edit-err left-6 top-10">{errors.input_text}</div>
                        )}
                    </form>
                );
            }}
        </Formik>
    );
};
export default ProfileSearch;