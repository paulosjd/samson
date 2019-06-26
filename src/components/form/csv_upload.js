import {Formik} from "formik";
import {CsvUpload} from "../../schemas/csv_upload";
import {Modal} from "reactstrap";
import React from "react";

const CsvUploadForm = (props) => {
    return (
        <Formik
            initialValues={{ file: null }}
            onSubmit={props.handleCsvUploadSubmit}
            validationSchema={CsvUpload}
            render={({ values, handleSubmit, setFieldValue, errors }) => {
                console.log(errors)
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input id="file" name="file" type="file" className="form-control"
                                   onChange={ event => {setFieldValue("file", event.currentTarget.files[0])} }
                            />
                            {errors.file && (<div className="login-error">{errors.file}</div>)}
                        </div>
                        <button type="submit" className="btn btn-primary">submit</button>
                    </form>
                );
            }} />
    )
};

export default CsvUploadForm
