import React from 'react';
import { Formik } from "formik";
import {QualifyTextAddSchema} from "../../schemas/dp_detail";

const QualifyTextAdd = ({postQualifyingText, qualifyingText, activeObjId, activeLabel, setHideText}) => {

    return (
        <Formik
            enableReinitialize
            initialValues={{qualify_text: qualifyingText}}
            validationSchema={QualifyTextAddSchema}
            onSubmit={(val) => {
                postQualifyingText({...val, objId: activeObjId});
                setHideText(true)
            }}
        >
            {props => {
                const {values, touched, handleBlur, errors, handleSubmit, setFieldValue} = props;
                console.log(errors)
                return (
                    <div className="card qualify-text">
                        <form onSubmit={handleSubmit}>
                            <label style={{marginBottom: 0, lineHeight: 0.5}}>{activeLabel}</label>
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