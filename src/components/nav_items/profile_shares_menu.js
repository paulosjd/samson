import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, Table, Alert, UncontrolledTooltip } from 'reactstrap';
import { Field, Formik } from "formik";
import InputRange from "react-input-range"
import ProfileSettings from "./profile_menu";
import ProfileSearch from "../form/profile_search";
import { baseUrl } from "../../store/actions/body";
import {PROFILE_SEARCH_RESULTS} from "../../store/constants/profile";

const ProfileSharesMenu = ({ toggle, isOpen, handleSave, profileData, requestVerificationEmail, verificationEmailSent
}) => {

    const updateSuccess = profileData.profileUpdateSuccess;
    const updateFailure = profileData.profileUpdateFailure;
    const [emailEditMode, setEmailEditMode] = useState(false);
    const [requestConfirmId, setRequestConfirmId] = useState(null);
    const [showRequestConfirm, setShowRequestConfirm] = useState(false);
    const [showProfileSearch, setShowProfileSearch] = useState(false);

    const content = useSelector(state => state); //this hook gives us redux store state
    const dispatch = useDispatch(); //this hook gives us dispatch method

    const getProfileMatches = (value) => {
        const url = `${baseUrl}/profile/profile-share/${value}`;
        return dispatch => {
            axios.get(url,{headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
                .then(profileMatches => dispatch({ type: PROFILE_SEARCH_RESULTS, payload: profileMatches }))
        }
    };

    const profileSearchResults = content.menu.profileSearchResults;

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

    if (showRequestConfirm) {
        const resultsInd = profileSearchResults.findIndex(x => x.id === requestConfirmId);
        const name = profileSearchResults[resultsInd].name;
        return (
            <Modal className='max-width-320'
                   isOpen={showRequestConfirm} toggle={() => {setShowRequestConfirm(!setShowRequestConfirm); }} >
                <h5 className='acc-del-text'>Confirm share request</h5>
                <label>{`Message to ${name}`}</label>
                <textarea
                    name='request_message'
                    maxLength={50}
                    placeholder='Enter message...'
                    onChange={ ()=>console.log('handle with useState that is submitted with requestConfirmId on OK click') }
                />
                <div className='left-28'>
                    <button type="button" className='del-acc-btn'
                            onClick={() => console.log('confirm -- submit request_message and requestConfirmId dispatch..') }
                    >OK</button>
                    <button type="button" className='del-acc-btn' onClick={()=> setShowRequestConfirm(false)}
                    >Cancel</button>
                </div>
            </Modal>
        );
    }

    if (showProfileSearch) {
        console.log(content.menu.profileSearchResults)
        const results = profileSearchResults.map(obj => {
            return (
                <tr key={obj.id}>
                    <td><button className='req-btn'
                                onClick={() => {setRequestConfirmId(obj.id); setShowRequestConfirm(true)}}
                    >{obj.name}</button></td>
                </tr>
            )
        });
        return (
            <Modal className='max-width-320' isOpen={showProfileSearch}
                toggle={() => setShowProfileSearch(!showProfileSearch)}>
                <ModalHeader><p className='fontsize10 bottom-0'>Search by profile name</p></ModalHeader>
                <ProfileSearch
                    getProfileMatches={(val) => dispatch(getProfileMatches(val))}
                />
                <Table bordered>
                    <tbody>
                        { results }
                    </tbody>
                </Table>
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
                { tableBody }
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