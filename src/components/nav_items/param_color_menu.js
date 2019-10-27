import React from 'react';
import { Modal, ModalHeader, Table, Alert, UncontrolledTooltip } from 'reactstrap';
import { Field, Formik } from "formik";
import InputRange from "react-input-range"
import 'react-input-range/lib/css/index.css'
import { getColorData } from "../../utils/helpers";

const ParamColorMenu = ({ toggle, isOpen, unitInfo, postColorSchema, updateSuccess }) => {

    const initial = {};
    unitInfo.sort((a,b) => {
        // Sort alphabetically by 'param_name'
        if (a.param_name < b.param_name) return -1;
        if (a.param_name > b.param_name) return 1;
        return 0;
    }).forEach(item => {
        const colorData = getColorData(unitInfo, item.param_name);
        initial[item.param_name + '_color_hex'] = item.color_hex;
        initial[item.param_name + '_min'] = parseInt(colorData.rangeVal1 * 100);
        initial[item.param_name + '_max'] = parseInt(colorData.rangeVal2 * 100);
    });
    const colorChoices = ['#99c140', '#ffbf00', '#ff7f00'];

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
            <ModalHeader>Select color scheme</ModalHeader>
            <Formik
                enableReinitialize
                initialValues={initial}
                onSubmit={postColorSchema}
            >
                {props => {
                    const formBody = unitInfo.map((obj, ind) => {
                        let name = obj.param_name;
                        return (
                            <tr key={ind + 'tr'} className='tall-row'>
                            <td>
                                <Field
                                    key={ind + 'field'}
                                    component="select"
                                    name={name + '_color_hex'} selected={props.values[name + '_color_hex']}
                                    style={{backgroundColor: props.values[name + '_color_hex']}}>
                                <option key={ind + 'opt'} value="" style={{backgroundColor: '#fff'}}>Default</option>
                                {colorChoices.map((color_hex, ind2) => {
                                    return (
                                        <option
                                            key={ind + ind2}
                                            value={color_hex}
                                            style={{backgroundColor: color_hex}}>
                                        </option>)
                                })}
                                </Field>
                            </td>
                            <td>
                                <label htmlFor={name}>{name}</label>
                            </td>
                            <td>
                                <InputRange
                                    maxValue={40}
                                    minValue={0}
                                    formatLabel={value => `${value} %`}
                                    value={{min: props.values[name + '_min'], max: props.values[name + '_max']}}
                                    onChange={value => {props.setFieldValue(name + '_min', value.min);
                                                        props.setFieldValue(name + '_max', value.max)}
                                    }
                                />
                            </td>
                            <td>
                                <InputRange
                                    maxValue={60}
                                    minValue={0}
                                    formatLabel={value => `${value} %`}
                                    value={{min: props.values[name + '_max'], max: 60}}
                                    onChange={value => {
                                        if (value.min >= 40) {
                                            props.setFieldValue(name + '_max', 40)
                                        } else if (value.min >= props.values[name + '_min']) {
                                            props.setFieldValue(name + '_max', value.min)
                                        }
                                    }}
                                />
                            </td>
                            </tr>
                        )
                    });

                    return (
                        <div className="card">
                            <form onSubmit={props.handleSubmit}>
                                <Table className='param-color-table' bordered>
                                <thead>
                                <tr className='short-row'>
                                    <th width="12%"> </th>
                                    <th width="24%"> </th>
                                    <th >Amber warning
                                        <span role="img" aria-label="info" id="warn-info1">&#x2139;</span>
                                        <UncontrolledTooltip id="ttip" placement="bottom" target="warn-info1"
                                        >Variance from target value which shows amber warning
                                        </UncontrolledTooltip>
                                    </th>
                                    <th>Red warning
                                        <span role="img" aria-label="info" id="warn-info2">&#x2139;</span>
                                        <UncontrolledTooltip id="ttip" placement="bottom" target="warn-info2"
                                        >Variance from target value which shows red warning
                                        </UncontrolledTooltip>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {formBody}
                                </tbody>
                                </Table>
                                { updateSuccess && (
                                    <Alert className="profile-edit-alert" color="info" style={{maxWidth: 770}}
                                    >Successfully saved!</Alert> ) }
                                <button
                                    type="submit" className="form-submit reg-submit"
                                >Save changes</button>
                            </form>
                        </div>
                    )}}
            </Formik>
        </Modal>
    );
};

export default ParamColorMenu;