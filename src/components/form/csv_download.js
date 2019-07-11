import React, {useState} from "react";
import {Formik} from "formik";
import {CsvDownload} from "../../schemas/csv_load";
import MultiSelect from "./multi_select"

const CsvDownloadForm = (props) => {

    const [dropDownClicked, setDropDownClicked] = useState(false);
    const paramOptions = props.paramOptions.map((obj, ind) => { return { ...obj, id: ind, label: obj.name} });
    const [multiSelect, setMultiSelect] = useState(paramOptions);  // contains the selected objects
    const selectedParams = multiSelect.filter(obj => obj.value).map(obj => obj.name);

    return (
        <Formik
            initialValues={{ date_fmt: '' }}
            onSubmit={(val) => {
                if (selectedParams.length > 0) {
                    props.handleCsvDownloadSubmit({ ...val, fields: selectedParams })
                } else props.setParamChoiceError(true)
            }}
            validationSchema={CsvDownload}
            render={({ values, handleSubmit, setFieldValue, errors }) => {
                const paleCls = selectedParams.length < 1 || !values.date_fmt ? "no-val" : "";
                return (
                    <form onSubmit={handleSubmit}>
                        <label style={{marginLeft: 22, marginTop: 12}}>Select parameters</label>
                        <MultiSelect
                            dropDownClicked={dropDownClicked}
                            setDropDownClicked={setDropDownClicked}
                            options={multiSelect}
                            optionClicked={setMultiSelect}
                            selectedBadgeClicked={(val) => {setMultiSelect(val); props.setParamChoiceError(false)} }
                            selectedOptionsStyles={selectedOptionsStyles}
                            optionsListStyles={optionsListStyles}
                        />
                        <label style={{marginLeft: 26}}>Select a date format</label>
                        <select id='date_fmt' className='modal-select' value={values.date_fmt}
                                onChange={ e => {setFieldValue("date_fmt", e.target.value)}}>
                            <option value='' disabled>Date format</option>
                            {props.dateFormats.map((val, i) => {
                                return <option key={i} value={val}>{val}</option>
                            })}
                        </select>
                        {errors.date_fmt && <div className="date_fmt_error">Required</div>}
                        <button type="submit" className={"btn btn-primary navitem-btn ".concat(paleCls)}>Submit</button>
                    </form>
                );
            }}
        />
    )
};

export default CsvDownloadForm

const selectedOptionsStyles = {
    color: "#3c763d",
    backgroundColor: "#dff0d8"
};
const optionsListStyles = {
    backgroundColor: "#fcf8e3",
    color: "#8a6d3b"
};