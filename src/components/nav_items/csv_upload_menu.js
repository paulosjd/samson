import React from 'react';
import { Modal, Table, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { toTitleCase } from '../../utils/helpers'
import CsvUploadForm from '../form/csv_upload'

const CsvUploadMenu = ({ toggle, isOpen, handleSave, profileData, postCsvUpload, csvUploadConfirm,
                           clearCsvUpload }) => {
    const uploadData = profileData.uploadData;
    const errorMsg = <Alert className="navitem-alert" color="warning">
        <span role="img" aria-label="red-cross">&#x274C; {profileData.uploadError}</span></Alert>;

    if (uploadData.data && uploadData.meta ) {
        return (
            <Modal isOpen={isOpen} toggle={toggle} className="csv-upload-modal">
                <ModalHeader>Confirm data</ModalHeader>
                <Table className='data-table'>
                    <thead>

                    {/* api - mandatory: date, value, optional: time, value2  */}
                    {/* api - parameters must provide these */}

                    <tr>{uploadData.meta.field_order.map((item, key) => {
                            return <th key={key}>{toTitleCase(item)}</th>})}</tr>
                    </thead>
                    <tbody>{uploadData.data.map((item, key) => {
                        return (
                            <tr key = {key} >
                                <td >{item.date}</td>
                                <td>{item.value}</td>
                                {item.value2 && <td>{item.value2}</td>}
                            </tr>
                        )
                    })}</tbody>
                </Table>
                <div style={{display: 'inline-flex'}}>
                    <button type="submit" className="btn btn-success csv-upload-confirm"
                        onClick={() => csvUploadConfirm(uploadData)}
                    >Submit</button>
                    <button type="button" className="btn btn-danger csv-upload-clear"
                            onClick={clearCsvUpload}>Clear</button>
                    { profileData.uploadError && errorMsg }
                </div>
            </Modal>
        )
    }

    let modalBody = profileData.summaryItems && profileData.summaryItems.length > 0 ?
        <CsvUploadForm
            handleCsvUploadSubmit={postCsvUpload}
            allParams={profileData.allParams}
            dateFormats={profileData.dateFormats}
            summaryItems={profileData.summaryItems}
        /> : <ModalBody>You need to add parameters to track first</ModalBody>;
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="csv-upload-modal">
            <ModalHeader>Upload tracking data</ModalHeader>
            {modalBody}
            { profileData.uploadError && errorMsg }
        </Modal>
    );
};

export default CsvUploadMenu;