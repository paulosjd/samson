import React from 'react';
import { Table } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { validDate, validNumber } from '../../schemas/constants'

const DataPointTableEdit = ({dataPoints, selectedParameter, postEditedDataPoints }) => {

    const initial = {delItems: []};
    const schemaShape = {};
    dataPoints.forEach(item => {
        selectedParameter.upload_fields.split(', ').forEach(fieldName => {
            const key = `${item.id}_${fieldName}`;
            initial[key] = item[fieldName];
            schemaShape[key] = fieldName === 'date' ? validDate : validNumber
        })
    });
    const valSchema = Yup.object().shape(schemaShape);

    return (
        <Formik
            initialValues={initial}
            onSubmit={val => postEditedDataPoints({ ...val, parameter: selectedParameter.name })}
            validationSchema={valSchema}
            render={({values, handleSubmit, setFieldValue, errors, touched, handleBlur}) => {
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
                        {dataPoints.map((obj, ind) => {
                            const dateKey = `${obj.id}_date`;
                            const valKey = `${obj.id}_value`;
                            const dateError = errors[dateKey] && touched[dateKey];
                            const valueError = errors[valKey] && touched[valKey];
                            const objIsPendingDel = values.delItems.includes(obj.id);
                            const handleDelIconClick = () => {
                                const delList = [...values.delItems];
                                if (!objIsPendingDel) delList.push(obj.id);
                                setFieldValue('delItems', delList);
                                setFieldValue(valKey, dataPoints[ind].value);
                                setFieldValue(dateKey, dataPoints[ind].date)
                            };
                            return (
                                <tr key={obj.id} className={objIsPendingDel ? 'pend-del' : ''}>
                                    <td className={dateError ? 'td-err' : ''}>
                                        { !objIsPendingDel ? <span role="img" aria-label="trash" className='del-icon'
                                              onClick={handleDelIconClick}>&#x274C;</span> : ''}
                                        <input
                                            type='text' name={dateKey}
                                            value={values[dateKey]}
                                            onBlur={handleBlur}
                                            disabled={objIsPendingDel}
                                            onChange={ e => setFieldValue(dateKey, e.target.value) }
                                            className={objIsPendingDel ? 'pend-del' : ''}
                                        />
                                        {dateError && <div className='dp-edit-err'>{errors[dateKey]}</div>}
                                    </td>
                                    <td className={ valueError ? 'td-err' : ''}>
                                        <input
                                            type='text' className={objIsPendingDel ? 'pend-del dp-edit' : 'dp-edit'}
                                            value={values[valKey]}
                                            onBlur={handleBlur}
                                            disabled={objIsPendingDel}
                                            onChange={ e => {setFieldValue(valKey, e.target.value)}}
                                        />
                                        {valueError && <div className='dp-edit-err'>{errors[valKey]}</div>}
                                    </td>
                                </tr>
                            )
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