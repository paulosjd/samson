import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, Table, Alert, UncontrolledTooltip } from 'reactstrap';
import { Field, Formik } from "formik";
import ProfileSearch from "../form/profile_search";
import { baseUrl } from "../../store/actions/body";
import {
    PROFILE_MENU_FETCH_FAILURE, PROFILE_SEARCH_RESULTS, PROFILE_SHARE_FETCH_SUCCESS, PROFILE_SHARE_REQUEST_FAILURE,
} from "../../store/constants/profile";
import {userConstants as constants} from "../../store/constants/user";

const ProfileSharesMenu = ({ toggle, isOpen, handleSave, profileData, requestVerificationEmail, verificationEmailSent
}) => {
    const [requestConfirmMessage, setRequestConfirmMessage] = useState('');
    const [requestConfirmId, setRequestConfirmId] = useState(null);
    const [showRequestConfirm, setShowRequestConfirm] = useState(false);
    const [showProfileSearch, setShowProfileSearch] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const content = useSelector(state => state); //this hook gives us redux store state
    const dispatch = useDispatch(); //this hook gives us dispatch method

    const getProfileMatches = (value) => {
        const url = `${baseUrl}/profile/profile-search/${value}`;
        return dispatch => {
            axios.get(url,{headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
                .then(profileMatches => dispatch({ type: PROFILE_SEARCH_RESULTS, payload: profileMatches }))
                .then(() => setHasSearched(true))
        }
    };
    const postShareRequest = () => {
        const url = `${baseUrl}/profile/profile-share/request`;
        return dispatch => {
            axios.post(url,{message: requestConfirmMessage, profile_id: requestConfirmId},
                {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
                .then((shareInfo) => dispatch({ type: PROFILE_SHARE_FETCH_SUCCESS, payload: {shareInfo} }))
                .then(() => {setShowRequestConfirm(false); setShowProfileSearch(false)})
                .catch(() => dispatch({ type: PROFILE_SHARE_REQUEST_FAILURE, value: true }))
                .then(() => setTimeout(() => dispatch(
                    { type: PROFILE_SHARE_REQUEST_FAILURE, value: false }),2500))
        }
    };
    const profileSearchResults = content.menu.profileSearchResults;

    if (!profileData.is_verified) {
        return (
            <Modal isOpen={isOpen} toggle={
                toggle} className="registration-modal">
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
                   isOpen={showRequestConfirm}
                   toggle={() => {setShowRequestConfirm(!setShowRequestConfirm); setRequestConfirmMessage('')}} >
                <ModalHeader><p className='fontsize10 bottom-0'>Confirm share request</p></ModalHeader>
                <ModalBody className='confirm-send-req'>
                    <div><label>Add an invitation message</label></div>
                    <textarea
                        maxLength={50}
                        placeholder="Enter message..."
                        value={requestConfirmMessage}
                        onChange={e => setRequestConfirmMessage(e.target.value)}
                    />
                    <p className='fontsize10 bottom-0 top-10'>{`Request profile share with ${name}?`}</p>
                    <div>
                        <button type="button" className='del-acc-btn'
                                onClick={() => dispatch(postShareRequest())}
                        >OK</button>
                        <button type="button" className='del-acc-btn'
                                onClick={() => {setShowRequestConfirm(false); setRequestConfirmMessage('')}}
                        >Cancel</button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }

    if (showProfileSearch) {
        let results;
        if (profileSearchResults && profileSearchResults.length > 0) {
            results = profileSearchResults.map(obj => {
                return (
                    <tr key={obj.id}>
                        <td><button className='req-btn'
                                    onClick={() => {setRequestConfirmId(obj.id); setShowRequestConfirm(true)}}
                            >{obj.name}</button>
                        </td>
                    </tr>
                )
            });
        } else if (hasSearched) {
            results = <tr><td><p className='fontsize9 left-14 bottom-0'>No matching results</p></td></tr>
        }
        return (
            <Modal className='max-width-320' isOpen={showProfileSearch}
                toggle={() => {
                    setShowProfileSearch(!showProfileSearch);
                    setHasSearched(false);
                    dispatch({ type: PROFILE_SEARCH_RESULTS, payload: [] })
                }}>
                <ModalHeader><p className='fontsize9 bottom-0'>Search by profile name</p></ModalHeader>
                <ProfileSearch
                    getProfileMatches={(val) => dispatch(getProfileMatches(val))}
                />
                <Table bordered>
                    <tbody className='prof-results'>
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
    const sharedProfilesBody = profiles.length < 1 ? <h6 className='font-normal'>No shared profiles yet</h6> : (
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