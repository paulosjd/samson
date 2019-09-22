import React, {useState} from 'react';
import {Modal, ModalHeader, Table, Alert, UncontrolledTooltip, Navbar} from 'reactstrap';
import {Field, Formik} from "formik";
import InputRange from "react-input-range"
import 'react-input-range/lib/css/index.css'

const ParamColorMenu = ({ toggle, isOpen, blankItems, unitInfo }) => {

    const initial = {};
    const sliderState = {};
    unitInfo.forEach(item => {
        initial[item.param_name] = item.color_hex;
        const [ sliderMin, setSliderMin] = useState(5);
        const [ sliderMax, setSliderMax] = useState(10);
        sliderState[item.param_name] = {
            min: sliderMin,
            max: sliderMax,
            setMin: setSliderMin,
            setMax: setSliderMax
        }
    });
    const colorChoices = ['#99c140', '#ffbf00', '#ff7f00'];

    // TODO python so that saves submitted (action use onSubmit in form, which dispatch/fetch, then reducer?/show alert saying saved)

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
            <ModalHeader>Select color schema</ModalHeader>
            <Formik
                enableReinitialize
                initialValues={initial}
                onSubmit={(val) => {
                    console.log(val)
                    // handleSave(val);
                    // targetDataRefresh()
                }}
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
                                    name={name} selected={props.values[name]}
                                    style={{backgroundColor: props.values[name]}}>
                                <option key={ind + 'opt'} value="">Default</option>
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
                                    maxValue={100}
                                    minValue={0}
                                    formatLabel={value => `${value} %`}
                                    value={{min: sliderState[name].min, max: sliderState[name].max}}
                                    // onChange={value => console.log({ value4: value })}
                                    onChange={value => {
                                        sliderState[name].setMin(value.min);
                                        sliderState[name].setMax(value.max)}
                                    }
                                    onChangeComplete={value => console.log(value)}
                                />
                            </td>
                            <td>
                                <InputRange
                                    maxValue={100}
                                    minValue={0}
                                    formatLabel={value => `${value} %`}
                                    value={{min: sliderState[name].min, max: sliderState[name].max}}
                                    // onChange={value => console.log({ value4: value })}
                                    onChange={value => {
                                        sliderState[name].setMin(value.min);
                                        sliderState[name].setMax(value.max)}
                                    }
                                    onChangeComplete={value => console.log(value)}
                                />                            </td>
                            </tr>
                        )
                    });

                    return (
                        <div className="card">
                            <form onSubmit={props.handleSubmit}>
                                <Table className='param-color-table' bordered>

                                    {/*<UncontrolledTooltip id="ttip" placement="bottom" target="profile"*/}
                                    {/*>Profile information</UncontrolledTooltip>*/}
                                <thead>
                                {/* Use tooltips  to explain about (Ideal color range % default color based up target variance) */}
                                <tr className='short-row'>
                                    <th width="12%"> </th>
                                    <th width="24%"> </th>
                                    <th >Range 1
                                        <span role="img" aria-label="info" id="warn-info1">&#x2139;</span>
                                        <UncontrolledTooltip id="ttip" placement="bottom" target="warn-info1"
                                        >Ideal color range % default color based up target variance
                                        </UncontrolledTooltip>
                                    </th>
                                    <th>Range 2
                                        <span role="img" aria-label="info" id="warn-info2">&#x2139;</span>
                                        <UncontrolledTooltip id="ttip" placement="bottom" target="warn-info2"
                                        >Ideal color range % default color based up target variance
                                        </UncontrolledTooltip>
                                    </th>
                                </tr>
                                {/* color_range_val_1 and 2 set using values of 1st slider, The second slider is read-only responds according.. to first */}
                                </thead>
                                <tbody>
                                {formBody}
                                </tbody>
                                </Table>
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