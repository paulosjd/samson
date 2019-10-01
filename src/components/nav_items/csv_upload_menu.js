import React from 'react';
import { Modal, Table, ModalHeader, Alert } from 'reactstrap';
import { toTitleCase } from '../../utils/helpers'
import CsvUploadForm from '../form/csv_upload'

const CsvUploadMenu = ({ toggle, isOpen, handleSave, profileData, postCsvUpload, csvUploadConfirm,
                           clearLoadError, showCsvLoadSuccess, fetchProfileSummary }) => {
    const uploadData = profileData.uploadData;
    const errorMsg = <Alert className="navitem-alert" color="warning">
        <span role="img" aria-label="red-cross">&#x274C; {profileData.loadError}</span></Alert>;
    if (showCsvLoadSuccess) {
        fetchProfileSummary()
    }

    if (uploadData.data && uploadData.meta ) {
        return (
            <Modal isOpen={isOpen} toggle={toggle} className="csv-upload-modal">
                <ModalHeader>Confirm data</ModalHeader>
                <Table className='data-table'>
                    <thead>
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
                        onClick={() => csvUploadConfirm(uploadData, uploadData.meta)}
                    >Submit</button>
                    <button type="button" className="btn btn-danger csv-upload-clear"
                            onClick={clearLoadError}>Clear</button>
                </div>
                { profileData.loadError && errorMsg }
            </Modal>
        )
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="csv-upload-modal">
            <ModalHeader>Upload tracking data</ModalHeader>
            {showCsvLoadSuccess && <Alert className="upload-success-alert" color="info">
                Data was successfully uploaded!</Alert>}
            <CsvUploadForm
                handleCsvUploadSubmit={postCsvUpload}
                allParams={profileData.allParams}
                dateFormats={profileData.dateFormats}
                summaryItems={profileData.summaryItems}
            />
            {profileData.loadError && errorMsg}
        </Modal>
    );
};

export default CsvUploadMenu;