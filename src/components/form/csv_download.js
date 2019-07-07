import React, {useState} from "react";
import {Formik} from "formik";
import {CsvDownload} from "../../schemas/csv_download";
import MultiSelect from "./multi_select"

const CsvDownloadForm = (props) => {
    const paramOptions = props.paramOptions.map((obj, ind) => {
        return { ...obj, id: ind, label: obj.name}
    });
    const [uploadLabels, setuploadLabels] = useState([]);
    const [multiSelect, setMultiSelect] = useState(paramOptions);
    const [dropDownClicked, setDropDownClicked] = useState(false);


    const selectedOptionsStyles = {
        color: "#3c763d",
        backgroundColor: "#dff0d8"
    };
    const optionsListStyles = {
        backgroundColor: "#fcf8e3",
        color: "#8a6d3b"
    };

    return (
        <Formik
            initialValues={{ param_choice: '', date_fmt: '' }}
            // onSubmit={props.handleCsvUploadSubmit}
            onSubmit={() => console.log('sdf')}
            validationSchema={CsvDownload}
            render={({ values, handleSubmit, setFieldValue, errors, touched }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <label style={{marginLeft: 12, marginTop: 12}}>Select parameters</label>
                        <MultiSelect
                            dropDownClicked={dropDownClicked}
                            setDropDownClicked={setDropDownClicked}
                            options={multiSelect}
                            optionClicked={setMultiSelect}
                            selectedBadgeClicked={setMultiSelect}
                            selectedOptionsStyles={selectedOptionsStyles}
                            optionsListStyles={optionsListStyles} />
                        <button type="submit" className="btn btn-primary navitem-btn">Submit</button>
                    `</form>
                );
            }}
        />
    )
};

export default CsvDownloadForm