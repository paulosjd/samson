import React, { useState, useEffect} from 'react';
import {Modal, ModalHeader, Alert, ModalBody} from 'reactstrap';
import { Formik, Field } from 'formik';
import { ProfileInfo } from '../../schemas/profile'
import CsvUploadForm from "./csv_upload_menu";

// cats:  Exercise regimen, dietary changes, medidcations, others
// time-span

const CsvDownloadMenu = ({ toggle, isOpen, profileData, showCsvDownloadSuccess }) => {
    // const modalBody = profileData.summaryItems && profileData.summaryItems.length > 0 ?
    //     <CsvUploadForm
    //         handleCsvUploadSubmit={reqCsvUpload}
    //         allParams={profileData.allParams}
    //         dateFormats={profileData.dateFormats}
    //         summaryItems={profileData.summaryItems}
    //     /> : <ModalBody>You need to add parameters to track first</ModalBody>;
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="profile-edit-modal">
            {/*<ModalHeader>Download tracking data</ModalHeader>*/}
            {/*{showCsvDownloadSuccess && <Alert className="upload-success-alert" color="info">*/}
                {/*Download complete</Alert>}*/}
            {/*{modalBody}*/}
            {/*{profileData.uploadError && errorMsg}*/}
        </Modal>
    );
};

export default CsvDownloadMenu;