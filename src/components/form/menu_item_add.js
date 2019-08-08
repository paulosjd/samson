import React, {useState} from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from "yup";
// import { RegisterSchema } from '../../schemas/auth'

const MenuItemAdd = ({ toggle, isOpen, availParams, summaryItems }) => {

    const [uploadLabels, setuploadLabels] = useState([]);

    console.log(availParams)
// available_unit_options: Array [ {…} ]  { name: "kilograms", symbol: "kg", conversion_factor: 1 }
// name: "Body weight"
// upload_field_labels: "dates, weight measurements"
// upload_fields: "date, value"

    // For units of measurement values or options
    const unitOptionSaved = (param) => {
        const savedParamInd = summaryItems.findIndex(x => x.parameter.name === param);
        if (savedParamInd > -1) {
            const item = summaryItems[savedParamInd].parameter;
            return item.unit_name.concat(' (', item.unit_symbol, ')')
        }
    };

    const Schema = Yup.object().shape({
        param_choice: Yup.string().required('Required'),
    });

    return (
        <Formik
            initialValues={{param_choice: '', unit_choice: ''}}
            validationSchema={Schema}
            onSubmit={(values) => {console.log(values)}}
        >
            {props => {
                const {values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue} = props;
                // const handleFieldChange = val => {handleChange(val); clearErr()};
                // will need to make call to refresh summary data now
                return (
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <select id='param_choice' className='modal-select' value={values.param_choice}
                                onChange={ e => {
                                    setFieldValue("param_choice", e.target.value);
                                    setuploadLabels(
                                        e.target.options[e.target.selectedIndex].dataset.labels.split(', ')
                                    );
                                    if (!unitOptionSaved(e.target.value)) {
                                        const apInd = availParams.findIndex(x => x.name === e.target.value);
                                        setFieldValue(
                                            "unit_choice", availParams[apInd].available_unit_options[0].name
                                        )
                                    } else setFieldValue("unit_choice", '')  // unitOptionSaved, server doesn't need
                                }}>
                                <option value='' disabled>Parameter</option>
                                {availParams.map((val, i) => {
                                    return <option key={i} data-fields={val.upload_fields}
                                                   data-labels={val.upload_field_labels}
                                                   value={val.name}>{val.name}</option>
                                })}
                            </select>

                            <button
                                type="submit"
                                className="form-submit reg-submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};
export default MenuItemAdd;