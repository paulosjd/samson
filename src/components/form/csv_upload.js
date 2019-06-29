import React from "react";
import {Formik} from "formik";
import {CsvUpload} from "../../schemas/csv_upload";

const CsvUploadForm = (props) => {
    return (
        <Formik
            initialValues={{ file: null }}
            onSubmit={props.handleCsvUploadSubmit}
            validationSchema={CsvUpload}
            render={({ values, handleSubmit, setFieldValue, errors }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group navitem-form">
                            <label htmlFor="file" className="navitem-file-input btn"><button type="button" className="btn"> Select a csv file
                            <input id="file" name="file" type="file" className="form-control"
                                   onChange={ event => {setFieldValue("file", event.currentTarget.files[0])} }/>
                            {errors.file && (<div className="navitem-field-err">{errors.file}</div>)}
                            </button></label>
                        </div>
                        <button type="submit" className="btn btn-primary navitem-btn">&#xe333; submit</button>
                    </form>
                );
            }} />
    )
};

export default CsvUploadForm