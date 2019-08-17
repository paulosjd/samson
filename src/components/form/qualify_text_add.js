import React from 'react';
import { Formik } from "formik";
import {QualifyTextAddSchema} from "../../schemas/dp_detail";

const QualifyTextAdd = ({dataPoints, selectedParameter, postAddedDataPoints, val2headers }) => {
    return (
        <Formik
            initialValues={{qualify_text: ''}}
            validationSchema={QualifyTextAddSchema}
            onSubmit={val => console.log(val)}
        >
            {props => {
                const {values, touched, handleBlur, errors, handleSubmit, setFieldValue} = props;
                console.log(errors)
                return (
                    <div className="card qualify-text">
                        <form onSubmit={handleSubmit}>
                            <div className='display-inline'>
                                <label>Notes: </label>
                            <input
                                type='text' name='qualify_text'
                                value={values.qualify_text}
                                onBlur={handleBlur}
                                onChange={ e => { setFieldValue('qualify_text', e.target.value) }}
                            />
                            <button type='submit' className='qualify-add-btn'
                                    style={!values.qualify_text ? {backgroundColor: '#c8d8df'} : {}}
                            >&#x2714;&#xFE0F; Save
                            </button>
                            </div>
                            {touched.qualify_text && errors.qualify_text &&
                            <div className='dp-edit-err left-62'>{errors.qualify_text}</div>}
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};
export default QualifyTextAdd