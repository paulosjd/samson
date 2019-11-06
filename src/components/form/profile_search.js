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
                const {values, errors, handleSubmit, setFieldValue} = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <div className='display-inline search-prof-form'>
                        <input
                            type='text'
                            placeholder='Enter search'
                            maxLength={20}
                            value={values.input_text}
                            onChange={ e => { setFieldValue('input_text', e.target.value) }}
                        />
                        <button type='submit' className='qualify-add-btn left-6'
                                style={errors.input_text || !values.input_text ? {backgroundColor: '#c8d8df'} : {}}
                        >Search</button>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
};
export default ProfileSearch;