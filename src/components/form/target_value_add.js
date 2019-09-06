import React from 'react';
import { Formik } from "formik";
import { TargetValueSchema } from "../../schemas/body_inputs";

const TargetValueAdd = ({postTargetValue, setShowTargetForm, targetValue}) => {
    console.log(targetValue)
    return (
        <Formik
            enableReinitialize
            initialValues={{target_value: targetValue}}
            validationSchema={TargetValueSchema}
            onSubmit={(val) => {
                // postTargetValue({...val, paramName});
                console.log(val)
                postTargetValue(val);
                setShowTargetForm(false)
            }}
        >
            {props => {
                const {values, touched, handleBlur, errors, handleSubmit, setFieldValue} = props;
                console.log(errors)
                return (
                        <form onSubmit={handleSubmit}>
                            <label>Target value: </label>
                            <input
                                className='target-val-input'
                                type='text' name='target_value'
                                value={values.target_value}
                                maxLength="6"
                                onBlur={handleBlur}
                                onChange={ e => { setFieldValue('target_value', e.target.value) }}
                            />
                            <button type='submit' className='qualify-add-btn margin-top-initial'
                                    style={!values.target_value ? {backgroundColor: '#c8d8df'} : {}}
                            >&#x2714;&#xFE0F; Save
                            </button>
                        {touched.target_value && errors.target_value &&
                        <div className='dp-edit-err left-62'>{errors.target_value}</div>}


                        </form>
                );
            }}
        </Formik>
    );
};
export default TargetValueAdd