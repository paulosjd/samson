import React from 'react';
import { Table } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { validDate, validNumber } from '../../schemas/constants'

const DataPointTableEdit = ({dataPoints, selectedParameter, setEditDataFlag}) => {

    const initial = {};
    const schemaShape = {};
    dataPoints.forEach(item => {
        selectedParameter.upload_fields.split(', ').forEach(fieldName => {
            const key = `${item.id}_${fieldName}`;
            initial[key] = item[fieldName];
            schemaShape[key] = fieldName === 'date' ? validDate : validNumber
        })
    });
    const yupSchema = Yup.object().shape(schemaShape);

    console.log(initial);

    return (
        <Formik
            initialValues={initial}
            onSubmit={val => { console.log(val); setEditDataFlag(false)}}
            validationSchema={yupSchema}
            render={({values, handleSubmit, setFieldValue, errors, touched, handleBlur, submitForm}) => {
                console.log(errors)
                return (
                    <form onSubmit={handleSubmit}>
                        <Table className='data-points-table' bordered>
                            <thead>
                            <tr>
                                <th colSpan={2}>
                                    <span>{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>
                                    <button type='submit' className='data-points-header-action'
                                    >&#x2714;&#xFE0F; Save</button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {dataPoints.map(obj => {
                                return (
                                    <tr key={obj.id}>
                                        <td><input
                                            type='text' name={`${obj.id}_date`}
                                            value={values[`${obj.id}_date`]}
                                            onBlur={handleBlur}
                                            onChange={ e => setFieldValue(`${obj.id}_date`, e.target.value) }
                                        />
                                            {errors[`${obj.id}_date`] && touched[`${obj.id}_date`] &&
                                            <div className='dp-edit-err'>{errors[`${obj.id}_date`]}</div>}
                                        </td>
                                        <td><input
                                            type='text' name={`${obj.id}_value`}
                                            value={values[`${obj.id}_value`]}
                                            onBlur={handleBlur}
                                            onChange={ e => {setFieldValue(`${obj.id}_value`, e.target.value)}}
                                        />
                                            {errors[`${obj.id}_value`] && touched[`${obj.id}_value`] &&
                                            <div className='dp-edit-err'>{errors[`${obj.id}_value`]}</div>}
                                        </td>
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