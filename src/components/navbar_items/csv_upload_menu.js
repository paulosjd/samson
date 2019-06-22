import React, { useState, useEffect} from 'react';
import { Modal, ModalHeader, Alert } from 'reactstrap';
import { Formik, Field } from 'formik';
import { ProfileInfo } from '../../schemas/profile'

// cats:  Exercise regimen, dietary changes, medidcations, others
// time-span

const CsvUploadMenu = ({ toggle, isOpen, profileData }) => {
    const [count, setCount] = useState(0);

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="profile-edit-modal">
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            </div>
        </Modal>
    );
};

export default CsvUploadMenu;