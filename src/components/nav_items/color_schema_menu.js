import React from 'react';
import { Modal, ModalHeader, Alert } from 'reactstrap';
import { Formik, Field } from 'formik';
import { ProfileInfo } from '../../schemas/profile'

// cats:  Exercise regimen, dietary changes, medidcations, others
// time-span

const ColorSchemeMenu = ({ toggle, isOpen,  summaryItems, blankItems }) => {

    //
    // summaryItems = summaryItems.map(val => val.parameter);
    // blankItems = blankItems.map(val => val.parameter);

    const foo = summaryItems.map(val => val.parameter).concat(blankItems.map(val => val.parameter))

    console.log(foo)
    // console.log(summaryItems)

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-320">
            <ModalHeader>Select color schema</ModalHeader>





        </Modal>
    );
};

export default ColorSchemeMenu;