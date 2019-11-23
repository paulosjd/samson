import React from 'react';
import { Modal, ModalHeader, Table, Alert, UncontrolledTooltip } from 'reactstrap';
import { Field, Formik } from "formik";
import {useSelector} from "react-redux";

const LinkedParamsMenu = ({ toggle, isOpen, summaryParams, postLinkedParamsEdit, updateSuccess, linkedParams }) => {

    const content = useSelector(state => state);
    summaryParams = summaryParams.concat(content.profile.blankParams);

    const initial = {};
    summaryParams.sort((a,b) => {
        // Sort alphabetically by 'name'
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }).forEach(item => {
        initial[item.name] = linkedParams[item.name] || '';
    });
    const paramNames = summaryParams.map(obj => obj.name);

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-500">
        <ModalHeader>Select linked metrics</ModalHeader>
        <Formik
            enableReinitialize
            initialValues={initial}
            onSubmit={values => {
                // Get ids from names to send to server, since no unique constraint on name
                const idDict = {};
                Object.entries(values).forEach(item => {
                    const paramIdInd = summaryParams.findIndex(x => x.name === item[1]);
                    idDict[item[0]] = paramIdInd > -1 ? summaryParams[paramIdInd].id : ''
                });
                postLinkedParamsEdit(idDict)
            }}
        >
            {props => {
                const formBody = summaryParams.map((obj, ind) => {
                    const name = obj.name;
                    return (
                        <tr key={ind + 'tr'} className='tall-row'>
                            <td>
                                <label htmlFor={name}>{name}</label>
                            </td>
                            <td>
                                <Field
                                    key={ind + 'field'}
                                    component="select"
                                    name={name} selected={props.values[name]}>
                                    <option key={ind + 'opt'} value="" > </option>
                                    {paramNames.filter(x => x !== obj.name).map((linkedName, ind2) => {
                                        return <option key={ind2} value={linkedName}>{linkedName}</option>
                                    })}
                                </Field>
                            </td>
                        </tr>
                    )
                });

                return (
                    <div className="card">
                        { summaryParams.length > 1 ? (
                            <form onSubmit={props.handleSubmit}>
                                <Table bordered>
                                    <thead>
                                    <tr className='short-row'>
                                        <th> </th>
                                        <th>Linked parameter
                                            <span role="img" aria-label="info" id="lp_info">&#x2139;</span>
                                            <UncontrolledTooltip id="ttip" placement="bottom" target="lp_info">
                                                Secondary data source in time series charts
                                            </UncontrolledTooltip>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {formBody}
                                    </tbody>
                                </Table>
                                { updateSuccess && (
                                    <Alert className="profile-edit-alert" color="info" style={{maxWidth: 500}}>
                                        Successfully saved!</Alert> ) }
                                <button type="submit" className="form-submit top-10">
                                    Save changes
                                </button>
                            </form>
                        ) : <span>At least 2 tracking metrics are required</span>}
                    </div>
                )}}
        </Formik>
        </Modal>
    );
};

export default LinkedParamsMenu;