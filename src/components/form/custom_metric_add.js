import React from 'react';
import { Formik } from 'formik';
import {Alert} from "reactstrap";
import { CustomMenuItemAddSchema } from "../../schemas/body_inputs";

const CustomMetricAdd = ({ toggle, isOpen, availParams, postMenuItemAdd, customItemSaveError, setShowAddMetric,
                             setMetricAddFormHasValue, clearSaveError }) => {

    // setShowAddMetric --> false on submit ?
    // Test by first return 400 or submit one name which should...

    return (
        <Formik
            initialValues={{param_name: '', unit_symbol: ''}}
            validationSchema={CustomMenuItemAddSchema}
            onSubmit={(val) => {
                if (!customItemSaveError) {
                    postMenuItemAdd(val)
                //    close form dialog  e.g setShowAddMetric(false)
                }
            }}
        >
            {props => {
                const {values, touched, errors, handleSubmit, handleChange, handleBlur} = props;
                return (
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <label className='param-name-input' >Parameter name</label>
                            <input
                                type='text' className='param-name-input'
                                name='param_name'
                                value={values.param_name}
                                onBlur={handleBlur}
                                maxLength="20"
                                onChange={(val) => {
                                    handleChange(val);
                                    clearSaveError()
                                }}
                            />
                            {(errors.param_name && touched.param_name) &&
                            (<span className="item-field-err2">{errors.param_name}</span>)}

                            <label className='param-name-input' style={{marginTop: 8}} >Unit of measure symbol</label>
                            <input
                                type='text' className='param-name-input'
                                name='unit_symbol'
                                value={values.unit_symbol}
                                onBlur={handleBlur}
                                maxLength="8"
                                onChange={handleChange}
                            />
                            {(errors.unit_symbol && touched.unit_symbol) &&
                            (<span className="item-field-err2">{errors.unit_symbol}</span>)}

                            { customItemSaveError && (<Alert className="metric-add-error" color="warning">
                                <span role="img" aria-label="red-cross">&#x274C; {customItemSaveError}</span></Alert> )}

                            <button
                                type='submit' className='item-add-btn'
                                style={!values.param_name || !values.unit_symbol || customItemSaveError
                                        ? {backgroundColor: '#c8d8df', marginLeft: 16} : {marginLeft: 16}}
                            ><span role="img" aria-label="save" >&#x2714;&#xFE0F;</span> Save
                            </button>

                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};
export default CustomMetricAdd;