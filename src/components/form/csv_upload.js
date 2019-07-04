import React, {useState} from "react";
import {Formik} from "formik";
import {CsvUpload} from "../../schemas/csv_upload";

const CsvUploadForm = (props) => {
    const [filename, setFilename] = useState('');
    const [uploadLabels, setuploadLabels] = useState([]);
    const paramChoices = [...new Set(props.summaryItems.map(item => item.parameter))];
    console.log(paramChoices)
    return (
        <Formik
            initialValues={{ file: null, param_choice: '', date_fmt: '' }}
            onSubmit={props.handleCsvUploadSubmit}
            validationSchema={CsvUpload}
            render={({ values, handleSubmit, setFieldValue, errors, touched }) => {
                return (
                    <form onSubmit={handleSubmit}>
                    <div>
                        <select id='param_choice' className='modal-select' value={values.param_choice}
                                onChange={ e => {
                                    setFieldValue("param_choice", e.target.value);
                                    setuploadLabels(e.target.options[e.target.selectedIndex].dataset.labels.split(', '))
                                }}>
                            <option value='' disabled>Parameter</option>
                            {paramChoices.map((val, i) => {
                                return <option key={i}
                                               data-fields={val.upload_fields}
                                               data-labels={val.upload_field_labels}
                                               value={val.name}
                                >{val.name}</option>
                            })}
                        </select>
                        <select id='date_fmt' className='modal-select' value={values.date_fmt}
                                onChange={ e => {setFieldValue("date_fmt", e.target.value)}}>
                            <option value='' disabled>Date format</option>
                            {props.dateFormats.map((val, i) => {
                                return <option key={i} value={val}>{val}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        {(errors.param_choice && touched.param_choice) &&
                        (<span className="navitem-field-err">{errors.param_choice}</span>)}
                        {(errors.date_fmt && touched.date_fmt) &&
                        (<span style={{float: 'right', marginRight: 158}}
                               className="navitem-field-err">{errors.date_fmt}</span>)}
                        {uploadLabels.length > 0 &&
                        <div>
                            <span className="navitem-info"><strong>Expected format:</strong></span>
                            <span className="navitem-info">
                                {uploadLabels.map((val, i) => {
                                    const letter = String.fromCharCode(97 + i).toUpperCase();
                                    return `Column ${letter}: ${val}`}).join(".  ")}</span>
                            <span className="navitem-info">Headers are optional</span>
                        </div>}
                    </div>
                    <div className="form-group overflow-hidden">
                        <label htmlFor="file" className="navitem-file-input"><span role="img" aria-label="f-select"
                            >&#x1F4E4; {filename ? filename : 'Select a csv file'}</span>
                        <input id="file" name="file" type="file"
                               onChange={ event => {
                                   setFieldValue("file", event.currentTarget.files[0]);
                                   setFilename(event.currentTarget.files[0].name)
                               }}/>
                        {errors.file && touched.file && (<div className="navitem-field-err">{errors.file}</div>)}
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary navitem-btn">Submit</button>
                    </form>
                );
            }}
        />
    )
};

export default CsvUploadForm