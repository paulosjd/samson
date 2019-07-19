import React, {useState} from "react";
import {Formik} from "formik";
import {CsvUpload} from "../../schemas/csv_load";

const CsvUploadForm = ({ summaryItems, allParams, handleCsvUploadSubmit, dateFormats }) => {

    const [filename, setFilename] = useState('');
    const [uploadLabels, setuploadLabels] = useState([]);

    // For units of measurement values or options
    const unitOptionSaved = (param) => {
        const savedParamInd = summaryItems.findIndex(x => x.parameter.name === param);
        if (savedParamInd > -1) {
            const item = summaryItems[savedParamInd].parameter;
            return item.unit_name.concat(' (', item.unit_symbol, ')')
        }
    };

    return (
        <Formik
            initialValues={{ file: null, param_choice: '', date_fmt: '', unit_choice: ''}}
            onSubmit={handleCsvUploadSubmit}
            validationSchema={CsvUpload}
            render={({ values, handleSubmit, setFieldValue, errors, touched }) => {

                // Units of measurement values or options
                let unitOptionField = null;
                const savedUnitOption = unitOptionSaved(values.param_choice);
                if (savedUnitOption){
                    // Saved unit of measurement for parameter found, so show this for expected input
                    unitOptionField = (
                        <React.Fragment>
                            <span className="navitem-info"><strong>Expected units of measurement:</strong></span>
                            <span className="navitem-info">{savedUnitOption}</span>
                        </React.Fragment>)
                } else if (values.param_choice) {
                    // Parameter selected but not unit of measurement saved, so show options to save
                    const paramIndex = allParams.findIndex(x => x.name === values.param_choice);
                    const unitOptions = allParams[paramIndex].available_unit_options.map(x => x.name);
                    unitOptionField = (
                        <React.Fragment>
                            <label style={{marginLeft: 26}}>Units of measurement:</label>
                            <select id='unit_choice' className='unit-opt-select' value={values.unit_choice}
                                    onChange={ e => setFieldValue("unit_choice", e.target.value) }>
                                {unitOptions.map((val, i) => { return <option key={i} value={val}>{val}</option>})}
                            </select>
                        </React.Fragment>)
                }

                const paleCls = !values.file || !values.param_choice || !values.date_fmt ? "no-val" : "";
                return (
                    <form onSubmit={handleSubmit}>
                    <div>
                        <select id='param_choice' className='modal-select' value={values.param_choice}
                            onChange={ e => {
                                setFieldValue("param_choice", e.target.value);
                                setuploadLabels(e.target.options[e.target.selectedIndex].dataset.labels.split(', '))
                                if (!unitOptionSaved(e.target.value)) {
                                    const apInd = allParams.findIndex(x => x.name === e.target.value);
                                    setFieldValue("unit_choice", allParams[apInd].available_unit_options[0].name)
                                } else setFieldValue("unit_choice", '')  // unitOptionSaved, so server doesn't need
                            }}>
                            <option value='' disabled>Parameter</option>
                            {allParams.map((val, i) => {
                                return <option key={i} data-fields={val.upload_fields}
                                           data-labels={val.upload_field_labels}
                                           value={val.name}>{val.name}</option>
                            })}
                        </select>
                        <select id='date_fmt' className='modal-select' value={values.date_fmt}
                                onChange={ e => {setFieldValue("date_fmt", e.target.value)}}>
                            <option value='' disabled>Date format</option>
                            {dateFormats.map((val, i) => {
                                return <option key={i} value={val}>{val}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        {(errors.param_choice && touched.param_choice) &&
                        (<span className="navitem-field-err">{errors.param_choice}</span>)}
                        {(errors.date_fmt && touched.date_fmt) &&
                        (<span style={{float: 'right', marginRight: 128}}
                               className="navitem-field-err">{errors.date_fmt}</span>)}
                        {unitOptionField &&  unitOptionField}
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
                    <button type="submit" className={"btn btn-primary navitem-btn ".concat(paleCls)}>Submit</button>
                    </form>
                );
            }}
        />
    )
};

export default CsvUploadForm