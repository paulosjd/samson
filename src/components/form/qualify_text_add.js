import React from 'react';
import { Formik } from "formik";
import {QualifyTextAddSchema} from "../../schemas/body_inputs";

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
                return (
                    <div className="card qualify-text">
                        <form onSubmit={handleSubmit}>
                            <div style={{display: 'inline-block', marginBottom: 4}}>
                                <label style={{marginBottom: 0, lineHeight: 0.5}}>{activeLabel}</label>
                                <span role="img" aria-label="cross" className='cross-symbol'
                                      onClick={() => setHideText(true)}
                                >&#x1F5D9;</span>
                            </div>
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
                            ><span role="img" aria-label="save" >&#x2714;&#xFE0F;</span> Save
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