import React from 'react';
import { Table } from "reactstrap";
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import { TableEdit } from "../../schemas/table_edit";

import "react-datepicker/dist/react-datepicker.css";

const DataPointTableEdit = ({dataPoints, selectedParameter, setEditDataFlag}) => {

    const initial = {};
    dataPoints.forEach(item => {
        selectedParameter.upload_fields.split(', ').forEach(fieldName => {
            initial[`${item.id}_${fieldName}`] = item[fieldName]
        })
    });
    console.log(initial);

    return (
        <Formik
            initialValues={initial}
            onSubmit={val => console.log(val)}
            validationSchema={TableEdit}
            render={({values, handleSubmit, setFieldValue, errors, touched, submitForm}) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Table className='data-points-table' bordered>
                            <thead>
                            <tr>
                                <th colSpan={2}>
                                    <span>{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>
                                    <span onClick={() =>    {submitForm();
                                        setEditDataFlag(true)}}
                                          className='data-points-header-action'
                                    >&#x2714;&#xFE0F; Save</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {dataPoints.map(obj => {
                                return (
                                    <tr key={obj.id}>
                                        <td><input
                                            type='text' name='date'
                                            value={values[`${obj.id}_date`]}
                                            onChange={ e => {setFieldValue(`${obj.id}_date`, e.target.value)}}
                                        />
                                            {errors.date && <div >Required</div>}


                                        </td>
                                        <td><input
                                            type='text' name='value'
                                            value={values[`${obj.id}_value`]}
                                            onChange={ e => {setFieldValue(`${obj.id}_value`, e.target.value)}}
                                        /></td>
                                    </tr>)
                            })}
                            </tbody>
                        </Table>
                    </form>
                )
            }}
        />
    )
};

export default DataPointTableEdit