import React from 'react';
import { Table } from "reactstrap";
import { Formik } from "formik";
import { isValidDate, isNumeric } from "../../utils/validation";

const DataPointTableAdd = ({dataPoints, selectedParameter, postAddedDataPoints, val2headers }) => {
    return (
        <Formik
            initialValues={{items: 1}}
            onSubmit={val => postAddedDataPoints({ ...val, parameter: selectedParameter.name })}
            validate={(values) => {
                const errors = {};
                Object.entries(values).forEach(item => {
                    if (item[0] && item[0].split('_')[1] === 'date') {
                        if (item[1] && !isValidDate(item[1])) {
                            errors[item[0]] = "Expected format: YYYY-MM-DD"
                        }
                    } else if (item[0] && item[0].split('_')[1]) {
                        if (item[1] && !isNumeric(item[1])) {
                            errors[item[0]] = "Must be a valid number"
                        }
                    }
                });
                return errors
            }}
            render={({ values, handleSubmit, setFieldValue, errors, touched, handleBlur }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Table className='data-points-table' bordered>
                            <tbody>
                            <tr style={{fontSize: 'small'}}>
                                <td className='dp-date'>Date (YYYY-MM-DD)</td>
                                { val2headers[1] ? <td>
                                    {val2headers[1].concat(' ', '(' , selectedParameter.unit_symbol, ')')}</td> : null }
                                { val2headers.length > 2 ? <td>
                                    {val2headers[2].concat(' ', '(' , selectedParameter.unit_symbol, ')')}</td> : null }
                            </tr>
                            {[...Array(values['items'])].map((obj, ind) => {
                                const dateKey = `${ind}_date`;
                                const valKey = `${ind}_value`;
                                const val2Key = `${ind}_value2`;
                                const dateError = errors[dateKey] && touched[dateKey];
                                const valueError = errors[valKey] && touched[valKey];
                                const value2Error = errors[valKey] && touched[valKey];
                                const handleDelClick = () => {
                                    setFieldValue('items', --values['items']);
                                    Object.entries(values).forEach((item) => {
                                        const firstChar = parseInt(item[0][0]);
                                        if (firstChar && firstChar > ind) {
                                            const fieldLabel = item[0].split('_')[1];
                                            setFieldValue(`${firstChar - 1}_${fieldLabel}`, item[1])
                                        }
                                    })
                                };
                                const delIcon = values['items'] > 1 ?
                                    <span role="img" aria-label="trash" className='del-icon'
                                          onClick={handleDelClick}>&#x274C;</span> : null;
                                const tdOneClsName = ' '.concat(
                                    selectedParameter.num_values > 1 ? 'two-val-date dp-edit ' : 'dp-edit ');
                                return (
                                    <tr key={ind}>
                                        <td className={errors['date'] ? `td-err ${tdOneClsName}` : tdOneClsName}>
                                            {delIcon}
                                            <input
                                                type='text' name={dateKey}
                                                value={values[dateKey] || ''}
                                                onBlur={handleBlur}
                                                onChange={ e => setFieldValue(dateKey, e.target.value)}
                                            />
                                            {dateError && <div className='dp-edit-err'>{errors[dateKey]}</div>}
                                        </td>
                                        <td className={valueError ? 'td-err dp-edit' : 'dp-edit'}>
                                            <input
                                                type='text' name={valKey} className='dp-edit'
                                                value={values[valKey] || ''}
                                                onBlur={handleBlur}
                                                maxLength="6"
                                                onChange={e => setFieldValue(valKey, e.target.value)}
                                            />
                                            {valueError && <div className='dp-edit-err'>{errors[valKey]}</div>}
                                        </td>
                                        { val2headers && val2headers.length > 2 ?
                                            <td className={valueError ? 'td-err' : 'dp-edit'}>
                                            <input
                                                type='text' name={val2Key} className='dp-edit'
                                                value={values[val2Key] || ''}
                                                onBlur={handleBlur}
                                                maxLength="6"
                                                onChange={e => setFieldValue(val2Key, e.target.value)}
                                            />
                                            {value2Error && <div className='dp-edit-err'>{errors[val2Key]}</div>}
                                        </td> : null }

                                    </tr>
                                )
                            })}
                            <tr className='short-row'>
                                <td colSpan={val2headers && val2headers.length > 2 ? 3 : 2}>
                                    <button type='button' className='dp-add'
                                            onClick={() => {
                                                setFieldValue('items', ++values['items']);
                                                ['date', 'value', 'value2'].forEach(str => {
                                                    setFieldValue(`${values['items'] + 1}_${str}`, '')
                                                })
                                            }}
                                    ><span role="img" aria-label="add" >&#x2795;</span> Add row</button>
                                    <button type='submit' className='data-points-header-action'
                                    ><span role="img" aria-label="save" >&#x2714;&#xFE0F;</span> Save records</button>
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