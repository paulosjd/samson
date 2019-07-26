import React, { useState } from 'react';
import { Table } from "reactstrap";
import { TableEdit } from "../schemas/table_edit";
import { Formik } from "formik";

const DataPointTable = ({dataPoints, selectedParameter, setEditDataFlag, editData}) => {
    let bodyRows;
    let actionButton;
    if (!editData) {
        return (
            <div onBlur={setEditDataFlag}>
                <Table className='data-points-table' bordered>
                    <thead>
                    <tr>
                        <th colSpan={2}>
                            <span>{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>
                            <span onClick={() => setEditDataFlag(true)} className='data-points-header-action'
                            >&#x270F;&#xFE0F; Edit records</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataPoints.map(obj => {
                        return (
                            <tr key={obj.id}>
                                <td>{obj.date}</td>
                                <td>{obj.value}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        )
    } else {

        const initial = {};
        // dataPoints.forEach(item => {console.log(Object.entries(item))})
        dataPoints.forEach(item => {
            selectedParameter.upload_fields.split(', ').forEach(fieldName => {
                initial[`${item.id}_${fieldName}`] = item[fieldName]
            })
        });
        console.log(initial);

        return (
            <div onBlur={setEditDataFlag}>
                    <Formik
                        initialValues={initial}
                        onSubmit={val => console.log(val)}
                        validationSchema={TableEdit}
                        render={({values, handleSubmit, setFieldValue, errors, touched}) => {

                            return (
                                    <form onSubmit={handleSubmit}>
                                    <Table className='data-points-table' bordered>
                                    <thead>
                                    <tr>
                                        <th colSpan={2}>
                                            <span>{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>
                                            <span onClick={() => setEditDataFlag(true)}
                                                  className='data-points-header-action'
                                            >&#x2714;&#xFE0F; Save</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataPoints.map(obj => {
                                        return (
                                            <tr key={obj.id}>
                                                <td><input type='text'
                                                    name='date'
                                                    value={values[`${obj.id}_date`]}
                                                    onChange={ e => {setFieldValue(`${obj.id}_date`, e.target.value)}}
                                                /></td>
                                                {/*editDataState[ind].date || obj.date  onChange={e => setEditDataState(e.target.value)*/}
                                                <td><input type='text'
                                                    name='value'
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
            </div>
        )


    }
}

export default DataPointTable