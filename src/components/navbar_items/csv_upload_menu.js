import React from 'react';
import { Modal, ModalHeader, Alert } from 'reactstrap';
import { Formik, Field } from 'formik';
import { CsvUpload } from '../../schemas/csv_upload'
import CsvUploadForm from '../form/csv_upload'

const CsvUploadMenu = ({ toggle, isOpen, handleSave, profileData, postCsvUpload }) => {
    const uploadData = profileData.uploadData
    const updateSuccess = profileData.profileUpdateSuccess;
    const updateFailure = profileData.profileUpdateFailure;
    console.log(uploadData)
    if (uploadData){
        return (
            <table>
                <tbody>{uploadData.data.map((item, key) => {
                    return (
                        <tr key = {key}>
                            <td>{item.date}</td>
                            <td>{item.value}</td>
                        </tr>
                    )
                })}</tbody>
            </table>
        )
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="csv-upload-modal">
            <CsvUploadForm
                handleCsvUploadSubmit={postCsvUpload}
            />


                {/*handle csv upload action catch fail  */}
        </Modal>
    );
};
export default CsvUploadMenu;