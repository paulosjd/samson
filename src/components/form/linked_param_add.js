import React from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";

const LinkedParamAdd = ({ paramId, availParams, postLinkedParams }) => {

    const LinkedParamAddSchema = Yup.object().shape({
        param_choice: Yup.string().required('Required'),
    });
    
    return (
        <Formik
            initialValues={{param_choice: ''}}
            validationSchema={LinkedParamAddSchema}
            onSubmit={val => {
                const paramChoiceInd = availParams.findIndex(obj => obj.name === val.param_choice);
                if (paramChoiceInd > -1) {
                    postLinkedParams(
                        {parameter_id: paramId, linked_parameter_id: availParams[paramChoiceInd].id}, 'add')
                }
            }}
        >
            {props => {
                const {values, touched, errors, handleSubmit, setFieldValue} = props;
                return (
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <div className='display-inline'>
                            <select id='param_choice' className='item-add-sel' value={values.param_choice}
                                    onChange={ e => setFieldValue("param_choice", e.target.value) }>
                                <option value='' disabled>Parameter</option>
                                {availParams.map((val, i) => {
                                    return <option key={i} data-fields={val.upload_fields}
                                                   data-labels={val.upload_field_labels}
                                                   value={val.name}>{val.name}</option>
                                })}
                            </select>
                            {(errors.param_choice && touched.param_choice) &&
                            (<span className="item-field-err2">{errors.param_choice}</span>)}
                            <button type='submit' className='item-add-btn' disabled={!values.param_choice}
                                    style={!values.param_choice ? {backgroundColor: '#c8d8df'} : {}}
                            ><span role="img" aria-label="save" >&#x2714;&#xFE0F;</span> Save
                            </button>
                            </div>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};
export default LinkedParamAdd;