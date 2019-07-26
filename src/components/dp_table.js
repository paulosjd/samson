import React, { useState } from 'react';
import { Table } from "reactstrap";
import {CsvUpload} from "../schemas/csv_load";
import {Formik} from "formik";

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
        return (
            <div onBlur={setEditDataFlag}>
                <Table className='data-points-table' bordered>
                    <thead>
                    <tr>
                        <th colSpan={2}>
                            <span>{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>
                            <span onClick={() => setEditDataFlag(true)} className='data-points-header-action'
                            >&#x2714;&#xFE0F; Save</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    <Formik
                        initialValues={{file: null, param_choice: '', date_fmt: '', unit_choice: ''}}
                        onSubmit={handleCsvUploadSubmit}
                        validationSchema={CsvUpload}
                        render={({values, handleSubmit, setFieldValue, errors, touched}) => {

                            bodyRows = dataPoints.map(obj => {
                                return (
                                    <tr key={obj.id}>
                                        <td><input value={editedDates[obj.id] ? editedDates[obj.id] : obj.date}
                                                   onChange={e => setEditedDates({
                                                       ...editedDates,
                                                       [obj.id]: e.target.value
                                                   })}
                                        /></td>
                                        {/*editDataState[ind].date || obj.date  onChange={e => setEditDataState(e.target.value)*/}
                                        <td><input
                                            onChange={e => setEditedValues({...editedValues, [obj.id]: e.target.value})}
                                            value={obj.value}/></td>
                                    </tr>)
                            });

                            return (3


                            )

                        }}
                    />


                    </tbody>
                </Table>
            </div>
        )


    }
}

export default DataPointTable