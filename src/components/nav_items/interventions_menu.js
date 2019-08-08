import React from 'react';
import { Modal, ModalHeader, Alert } from 'reactstrap';
import { Formik, Field } from 'formik';
import { ProfileInfo } from '../../schemas/profile'

// cats:  Exercise regimen, dietary changes, medidcations, others
// time-span

const InterventionsMenu = ({ toggle, isOpen,  profileData }) => {

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-320">
            Foo!
        </Modal>
    );
};

export default InterventionsMenu;