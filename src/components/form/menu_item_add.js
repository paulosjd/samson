import React from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";

const MenuItemAdd = ({ toggle, isOpen, availParams, postMenuItemAdd, setShowAddMetric }) => {

    const Schema = Yup.object().shape({
        param_choice: Yup.string().required('Required'),
        unit_choice: Yup.string().required('Required'),
    });

    return (
        <Formik
            initialValues={{param_choice: '', unit_choice: ''}}
            validationSchema={Schema}
            onSubmit={postMenuItemAdd}
        >
            {props => {
                const {values, touched, errors, handleSubmit, setFieldValue} = props;

                const getUnitOptions = (param_choice) => {
                    const paramIndex = availParams.findIndex(x => x.name === param_choice);
                    return availParams[paramIndex].available_unit_options;

                };

                const getUnitChoiceField = () => {
                    const unitOptions = getUnitOptions(values.param_choice);
                    return(
                        <select id='unit_choice' className='unit-opt-select' value={values.unit_choice}
                                onChange={ e => setFieldValue("unit_choice", e.target.value) }
                        >{unitOptions.map((val, i) => {
                            return <option key={i} value={val.name}>{val.name.concat(' (', val.symbol, ')')}</option>})}
                        </select>
                    )
                };

                return (
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <select id='param_choice' className='item-add-sel' value={values.param_choice}
                                onChange={ e => {
                                    setFieldValue("param_choice", e.target.value);
                                    setFieldValue("unit_choice", getUnitOptions(e.target.value)[0].name);
                                }}>
                                <option value='' disabled>Parameter</option>
                                {availParams.map((val, i) => {
                                    return <option key={i} data-fields={val.upload_fields}
                                                   data-labels={val.upload_field_labels}
                                                   value={val.name}>{val.name}</option>
                                })}
                            </select>
                            {(errors.param_choice && touched.param_choice) &&
                            (<span className="item-field-err">{errors.param_choice}</span>)}

                            { values.param_choice && getUnitChoiceField() }

                            <button type='submit' className='item-add-btn'
                                    style={!values.param_choice || !values.unit_choice
                                        ? {backgroundColor: '#c8d8df'} : {}}
                            >&#x2714;&#xFE0F; Save
                            </button>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};
export default MenuItemAdd;