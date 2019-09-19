import React, { useState } from 'react';
import { Modal, ModalHeader, Alert, ModalBody } from 'reactstrap';
import CsvDownloadForm from "../form/csv_download";

const CsvDownloadMenu = ({ toggle, isOpen, profileData, showCsvLoadSuccess, getCsvDownload, clearCsvLoad }) => {

    const [paramChoiceError, setParamChoiceError] = useState(false);
    const paramOptions = profileData.summaryItems.map(val => val.parameter);
    let modalBody ;

    if (paramOptions.length > 0) {
        modalBody = (
            <CsvDownloadForm
                handleCsvDownloadSubmit={getCsvDownload}
                allParams={profileData.allParams}
                dateFormats={profileData.dateFormats}
                setParamChoiceError={setParamChoiceError}
                paramOptions={paramOptions}
            />
        )} else  modalBody = <ModalBody>You need to add parameters to track first</ModalBody>;

    return (
        <Modal className="csv-upload-modal" isOpen={isOpen} toggle={toggle}>
            <ModalHeader>Download tracking data</ModalHeader>
            {showCsvLoadSuccess && <Alert className="upload-success-alert" color="info">Download complete</Alert>}
            {modalBody}
            {profileData.loadError && <Alert className="upload-success-alert" color="warning" style={{marginTop: 4}}>
                <span role="img" aria-label="red-cross">&#x274C; {'Error here!!'}</span></Alert>}
            {paramChoiceError && <Alert className="upload-success-alert" color="warning" style={{marginTop: 4}}>
                <span role="img" aria-label="red-cross">&#x274C; Tracking parameters required</span></Alert>}
        </Modal>
    );
};

export default CsvDownloadMenu;