import React from 'react';
import { Formik } from "formik";
import { TargetValueSchema } from "../../schemas/body_inputs";

const TargetValueAdd = ({ postTargetValue, setShowTargetForm, targetValue, paramId, isVal2, labelSuffix }) => {
    const valKey = isVal2 ? 'target_value2' : 'target_value';
    return (
        <Formik
            enableReinitialize
            initialValues={{[valKey]: targetValue}}
            validationSchema={TargetValueSchema}
            onSubmit={(val) => {
                postTargetValue({...val, param_id: paramId});
                setShowTargetForm(false)
            }}
        >
            {props => {
                const {values, touched, handleBlur, errors, handleSubmit, setFieldValue} = props;
                return (
                        <form onSubmit={handleSubmit}>
                            <label>{`Target value${labelSuffix ? ' ('.concat(labelSuffix, ')'): ''}: `}</label>
                            <input
                                className='target-val-input'
                                type='text' name='target_value'
                                value={values[valKey]}
                                maxLength="6"
                                onBlur={handleBlur}
                                onChange={ e => { setFieldValue(valKey, e.target.value) }}
                            />
                            <button type='submit' className='qualify-add-btn margin-top-initial left-14'
                                    style={!values[valKey] ? {backgroundColor: '#c8d8df'} : {}}
                            ><span role="img" aria-label="save" >&#x2714;&#xFE0F;</span> Save
                            </button>
                        {touched[valKey] && errors[valKey] &&
                        <div className='dp-edit-err left-62'>{errors[valKey]}</div>}
                        </form>
                );
            }}
        </Formik>
    );
};
export default TargetValueAdd