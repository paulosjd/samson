import React, { useState, useEffect} from 'react';
import {Modal, ModalHeader, Alert, ModalBody} from 'reactstrap';
import { Formik, Field } from 'formik';
import { ProfileInfo } from '../../schemas/profile'
import CsvDownloadForm from "../form/csv_download";

// cats:  Exercise regimen, dietary changes, medidcations, others
// time-span

const CsvDownloadMenu = ({ toggle, isOpen, profileData, showCsvLoadSuccess, clearCsvLoad }) => {
    let modalBody ;
    console.log('profileData.summaryItems')
    console.log(profileData.summaryItems)
    const paramOptions = profileData.summaryItems.map(val => val.parameter);
    if (paramOptions.length > 0) {
        modalBody = (
            <CsvDownloadForm
                // handleCsvUploadSubmit={reqCsvUpload}
                allParams={profileData.allParams}
                dateFormats={profileData.dateFormats}
                paramOptions={paramOptions}
            />
        )} else  modalBody = <ModalBody>You need to add parameters to track first</ModalBody>;
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="csv-upload-modal">
            <ModalHeader>Download tracking data</ModalHeader>
            {showCsvLoadSuccess && <Alert className="upload-success-alert" color="info">Download complete</Alert>}
            {modalBody}
            {profileData.loadError && 'errorMsg'}
        </Modal>
    );
};

export default CsvDownloadMenu;