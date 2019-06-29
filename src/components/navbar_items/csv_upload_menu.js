import React from 'react';
import { Modal, Table, ModalHeader, Alert, Button } from 'reactstrap';
import { Formik, Field } from 'formik';
import { toTitleCase } from '../../utils/helpers'
import CsvUploadForm from '../form/csv_upload'

const CsvUploadMenu = ({ toggle, isOpen, handleSave, profileData, postCsvUpload, csvUploadConfirm,
                           clearCsvUpload }) => {
    const uploadData = profileData.uploadData;
    const errorMsg = <Alert className="navitem-alert" color="warning">{profileData.uploadError}</Alert>;
    if (uploadData.data && uploadData.meta ) {
        return (
            <Modal isOpen={isOpen} toggle={toggle} className="csv-upload-modal">
                <ModalHeader>Confirm data</ModalHeader>
                <Table>
                    <thead>
                    <tr>{uploadData.meta.field_order.map((item, key) => {
                            return <th key = {key}>{toTitleCase(item)}</th>})}</tr>
                    </thead>
                    <tbody>{uploadData.data.map((item, key) => {
                        return (
                            <tr key = {key}>
                                <td>{item.date}</td>
                                <td>{item.value}</td>
                                {/*might need put item.value as array and map out - allow more than one val per date*/}
                                {/* or customize iter so get date, then val, then e.g. val2 etc. - as per field map */}
                            </tr>
                        )
                    })}</tbody>
                </Table>
                <button type="submit" className="btn btn-success csv-upload-confirm"
                    onClick={() => csvUploadConfirm(uploadData)}
                >Submit</button>
                <button type="button" onClick={clearCsvUpload} className="btn btn-danger csv-upload-clear">Clear</button>
                { profileData.uploadError && errorMsg }
            </Modal>
        )
    }
    // console.log(profileData.uploadError);
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="csv-upload-modal">
            <ModalHeader>Upload tracking data</ModalHeader>
            <CsvUploadForm
                handleCsvUploadSubmit={postCsvUpload}
            />
            { profileData.uploadError && errorMsg }
        </Modal>
    );
};
export default CsvUploadMenu;