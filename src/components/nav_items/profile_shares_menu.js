import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Table, Alert, UncontrolledTooltip } from 'reactstrap';
import { Field, Formik } from "formik";
import InputRange from "react-input-range"
import ProfileSettings from "./profile_menu";
import ProfileSearch from "../form/profile_search";
import { ProfileInfo } from "../../schemas/profile";

const ProfileSharesMenu = ({ toggle, isOpen, handleSave, profileData, requestVerificationEmail, verificationEmailSent,
                               getProfileMatches}) => {

    const updateSuccess = profileData.profileUpdateSuccess;
    const updateFailure = profileData.profileUpdateFailure;
    const [emailEditMode, setEmailEditMode] = useState(false);
    const [showProfileSearch, setShowProfileSearch] = useState(false);

    if (!profileData.is_verified) {
        return (
            <Modal isOpen={isOpen} toggle={toggle} className="registration-modal">
                <ModalHeader><p className='fontsize10 bottom-0'>Profile needs verifying</p></ModalHeader>
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

    if (showProfileSearch) {
        return (
            <Modal className='max-width-320' isOpen={showProfileSearch}
                toggle={() => setShowProfileSearch(!showProfileSearch)}>
                <ProfileSearch
                    getProfileMatches={getProfileMatches}/>
                <ul>
                    <li>item1</li>
                </ul>
                {/*{matchedProfiles.map(obj => {return <li>{obj.name}</li>})}*/}
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
    const sharedProfilesBody = profiles.length < 1 ? <h6 className='font-normal'>No shared profiles available</h6> : (
        <Table bordered>
            <thead><tr className='short-row'><th> </th><th>Username</th></tr></thead>
            <tbody>
                {tableBody}
            </tbody>
        </Table>
    );

    const pendingRequests = [1];
    let pendingRequestsSection = null;
    if (pendingRequests.length > 0) {
        pendingRequestsSection = (
            <ModalBody>
                Test abcd
            </ModalBody>
        )
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-320">
            <ModalHeader><p className='fontsize10 bottom-0'>View shared profiles</p></ModalHeader>
            <ModalBody>
                { sharedProfilesBody }
                <button className='btn search-prof-btn' onClick={() => {setShowProfileSearch(true)}}>
                    Profile search</button>
            </ModalBody>
            { pendingRequestsSection && (
                <ModalHeader className='pend-head'>
                    <p className='fontsize10 bottom-0'>Pending requests</p>
                </ModalHeader>) }
            { pendingRequestsSection }
        </Modal>
    );
};
export default ProfileSharesMenu;