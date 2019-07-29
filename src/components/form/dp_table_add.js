import React from 'react';
import { Table } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { validDateIfTouched, validNumberIfTouched } from '../../schemas/constants'

const DataPointTableAdd = ({dataPoints, selectedParameter, postEditedDataPoints }) => {

    const valSchema = Yup.object().shape({'0_date': validDateIfTouched, '0_value': validNumberIfTouched});

    console.log(dataPoints);

    return (
        <Formik
            initialValues={{items: [{}, ]}}
            onSubmit={val => console.log({ ...val, parameter: selectedParameter.name })}

            // onSubmit={val => postEditedDataPoints({ ...val, parameter: selectedParameter.name })}
            validationSchema={valSchema}
            render={({values, handleSubmit, setFieldValue, errors, touched, handleBlur}) => {
                console.log(values)
                console.log(errors)
                return (
                    <form onSubmit={handleSubmit}>
                        <Table className='data-points-table' bordered>
                            <tbody>
                            <tr className='short-row'>
                                <td>Date (YYYY-MM-DD)</td>
                                <td>{selectedParameter.name.concat(' ', '(' , selectedParameter.unit_symbol, ')')}</td>
                            </tr>
                            {values['items'].map((obj, ind) => {
                                const dateKey = `${ind}_date`;
                                const valKey = `${ind}_value`;
                                const dateError = errors[dateKey] && touched[dateKey];
                                const valueError = errors[valKey] && touched[valKey];
                                const delIcon = values['items'].length > 1 ?
                                    <span role="img" aria-label="trash" className='del-icon'
                                          onClick={()=>console.log('sdf')}>&#x274C;</span> : null;
                                return (
                                    <tr key={ind}>
                                        <td className={errors['date'] ? 'td-err' : ''}>
                                            {delIcon}
                                            <input
                                                type='text' name={dateKey}
                                                value={values[dateKey]}
                                                onBlur={handleBlur}
                                                onChange={ e => setFieldValue(dateKey, e.target.value) }
                                            />
                                            {dateError && <div className='dp-edit-err'>{errors[dateKey]}</div>}
                                        </td>
                                        <td className={valueError ? 'td-err' : ''}>
                                            <input
                                                type='text' className='dp-edit'
                                                value={values[valKey]}
                                                onBlur={handleBlur}
                                                onChange={ e => {setFieldValue(valKey, e.target.value)}}
                                            />
                                            {valueError && <div className='dp-edit-err'>{errors[valKey]}</div>}
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr className='short-row'>
                                <td colSpan={2}>
                                    <button className='dp-add' onClick={() => values['items'].push({})}
                                    >&#x2795; Add row</button>
                                    <button type='submit' className='data-points-header-action'
                                    >&#x2714;&#xFE0F; Save records</button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </form>
                )
            }}
        />
    )
};

export default DataPointTableAdd