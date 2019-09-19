import React from 'react';
import { Modal, ModalHeader, Table, Alert } from 'reactstrap';
import ParamColorForm from "../form/param_color";
import {Field, Formik} from "formik";
import {ProfileInfo} from "../../schemas/profile";
import * as Yup from "yup";
import {validColorChoice} from "../../schemas/constants";

const ParamColorMenu = ({ toggle, isOpen, unitInfo }) => {

    console.log(unitInfo)
    //
    // summaryItems = summaryItems.map(val => val.parameter);
    // blankItems = blankItems.map(val => val.parameter);

    // const paletteChoices = {
    //     blank: '',
    //     ideal_range: '#c2ddeb',
    //     ideal_plus_1: '#f4c3ab',
    //     ideal_plus_2: '#F39879'
        // allow user to select from whole big palette
    // };
    const paletteChoices = ['#c2ddeb', '#f4c3ab', '#F39879']

    // const foo = summaryItems.map(val => val.parameter).concat(blankItems.map(val => val.parameter));

    const initial = {};
    unitInfo.forEach(item => {
        initial[item.param_name] = item.color_hex;
    });

    console.log(unitInfo)

    // Default means based upon rate target - e.g. more than 5%

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-320">
            <ModalHeader>Select color schema</ModalHeader>
            <Formik
                enableReinitialize
                initialValues={initial}
                // validationSchema={}
                onSubmit={(val) => {
                    console.log(val)
                    // handleSave(val);
                    // targetDataRefresh()
                }}
            >
                {props => {
                    const formBody = unitInfo.map(obj => {
                        let key = obj.param_name;
                        return (
                            <tr key={key + 'tr'}>

                            <Field key={key + 'field'} component="select" name={key} selected={props.values[key]}
                               className="profile-edit-field">
                            <option key={key + 'opt'} value="0">Default</option>
                            {paletteChoices.map((color_hex, index) => {
                                return <option key={key + index} value={color_hex} style={{backgroundColor: color_hex}}> </option>
                            })}
                        </Field>
                                <label key={key + 'lab'} htmlFor={key}>{key}</label>

                            </tr>
                        )
                    });

                    return (
                        <div className="card">
                            <form onSubmit={props.handleSubmit}>
                                <Table className='data-points-table' bordered>
                                {formBody}
                                </Table>
                                <button type="submit" className="form-submit reg-submit">Save changes</button>
                            </form>
                        </div>
                    )}}
            </Formik>
            {/*{ ( updateSuccess || updateFailure ) && (*/}
                {/*<Alert className="profile-edit-alert" color={updateSuccess ? "info" : "warning"}*/}
                {/*>{updateSuccess ? 'Successfully saved!' : 'Sorry, please try again later'}</Alert> ) }*/}
            {/*{profileData.loadError && errorMsg}*/}
        </Modal>
    );
};

export default ParamColorMenu;