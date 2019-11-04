import React, {useState} from 'react';
import {Modal, ModalHeader, Table, Alert, UncontrolledTooltip, ModalBody} from 'reactstrap';
import { Field, Formik } from "formik";
import InputRange from "react-input-range"
import ProfileSettings from "./profile_menu";
import {ProfileInfo} from "../../schemas/profile";

const ProfileSharesMenu = ({ toggle, isOpen, handleSave, profileData, requestVerificationEmail, verificationEmailSent, }) => {

    const updateSuccess = profileData.profileUpdateSuccess;
    const updateFailure = profileData.profileUpdateFailure;
    const [emailEditMode, setEmailEditMode] = useState(false);
    const [showDelConfirm, setShowDelConfirm] = useState(false);

    if (!profileData.is_verified) {
        return (
            <Modal isOpen={isOpen} toggle={toggle} className="registration-modal">
                <ModalHeader><h6 className='fontsize10 bottom-0'>Profile needs verifying</h6></ModalHeader>
                <ModalBody>Please verify your account in order to access shared user profiles
                    <div className='top-10'>
                        <a onClick={requestVerificationEmail} className='send-ver fontsize8'>
                            Resend verification email</a></div>
                    { verificationEmailSent && (
                        <Alert className="email-sent" color="success">Profile verification email sent</Alert> )}
                </ModalBody>
            </Modal>
        )
    }

    if (showDelConfirm) {
        return (
            <Modal isOpen={showDelConfirm} toggle={() => setShowDelConfirm(!showDelConfirm)} className='max-width-320'>
                <h5 className='acc-del-text'>Confirm profile deletion</h5>
                <div className='left-28'>
                    {/*<button type="button" className='del-acc-btn'*/}
                            {/*onClick={() => {confirmAccountDelete(); handleLogout()}}*/}
                    {/*>OK</button>*/}
                    {/*<button type="button" className='del-acc-btn' onClick={()=> setShowDelConfirm(false)}*/}
                    {/*>Cancel</button>*/}
                </div>
            </Modal>
        );
    }

    let settingsArea;
    // if (!showSettings) {
        // settingsArea = (<span role="img" aria-label="palette" className='right-18 csr-pt'
        //                       onClick={() => setShowSettings(true)}>&#x2699; Profile settings</span>)
    // } else {
    //     settingsArea = (
    //         <ProfileSettings
    //             email={profileData.email}
    //             isVerified={profileData.is_verified}
    //             editMode={emailEditMode}
    //             setEditMode={setEmailEditMode}
    //             // postNewEmail={postNewEmail}
    //         />)
    // }

    const profiles = [];
    // const profiles = [{name: 'foobar', id: 34}, ];

    const tableBody = profiles.map((obj, ind) => {
        return (
            <tr key={ind + 'tr'}>
                <td>
                    <span className='csr-pt fontsize12 ' role="img" aria-label="info" id="view">&#x2139;</span>
                    <UncontrolledTooltip id="ttip" placement="bottom" target="view">View profile</UncontrolledTooltip>
                </td>
                <td>
                    <h6>{obj.name}</h6>
                </td>
            </tr>
        )
    });
    const sharedProfilesBody = profiles.length < 1 ? <h6>No shared profiles available</h6> : (
        <Table bordered>
            <thead><tr className='short-row'><th> </th><th>Username</th></tr></thead>
            <tbody>
                {tableBody}
            </tbody>
        </Table>
    );

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-320">
            <ModalHeader><h6 className='fontsize10 bottom-0'>View shared profiles</h6></ModalHeader>
            <ModalBody>
                {sharedProfilesBody}
            </ModalBody>
        </Modal>
    );
};
export default ProfileSharesMenu;