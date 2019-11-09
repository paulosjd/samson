import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {Modal, ModalHeader, ModalBody, Table, Alert, UncontrolledTooltip} from 'reactstrap';
import ProfileSearch from "../form/profile_search";
import { baseUrl, updateProfileShare } from "../../store/actions/body";
import { PROFILE_SEARCH_RESULTS, PROFILE_SHARE_FETCH_SUCCESS, PROFILE_SHARE_REQUEST_FAILURE
} from "../../store/constants/profile";

const ProfileSharesMenu = ({ toggle, isOpen, handleSave, profileData, requestVerificationEmail, verificationEmailSent
}) => {
    const [requestConfirmMessage, setRequestConfirmMessage] = useState('');
    const [requestConfirmId, setRequestConfirmId] = useState(null);
    const [showRequestConfirm, setShowRequestConfirm] = useState(false);
    const [showProfileSearch, setShowProfileSearch] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const acceptShareRequest = (objId) => updateProfileShare(objId, 'accept');
    const deleteShareRequest = (objId) => updateProfileShare(objId, 'delete');
    const dispatch = useDispatch(); //this hook gives us dispatch method
    const content = useSelector(state => state); //this hook gives us redux store state
    const profileSearchResults = content.menu.profileSearchResults;

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
                .then(shareInfo => dispatch({ type: PROFILE_SHARE_FETCH_SUCCESS, payload: {shareInfo} }))
                .catch(() => dispatch({ type: PROFILE_SHARE_REQUEST_FAILURE, value: true }))
                .then(() => {
                    setShowRequestConfirm(false); setShowProfileSearch(false); setHasSearched(false)
                } )
                .then(() => { return dispatch({ type: PROFILE_SEARCH_RESULTS, payload: []}) })
                .then(() => setTimeout(() => dispatch(
                    { type: PROFILE_SHARE_REQUEST_FAILURE, value: false }),3000))
        }
    };

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

    let awaitingConfirmSection;
    if (profileData.share_requests_received.length > 0) {
        const awaitingConfirms = profileData.share_requests_received.map(obj => {
            return (
                <tr key={obj.id}>
                    <td style={{width: 28}}>
                        <span role="img" aria-label="trash" className='del-icon'
                              onClick={() => dispatch(deleteShareRequest(obj.id))}
                        >&#x274C;</span>
                    </td>
                    <td style={{width: 28}}>
                        <span role="img" aria-label="tick" className='del-icon'
                              onClick={() => dispatch(acceptShareRequest(obj.id))}
                        >&#x2714;</span>
                    </td>
                    <td>
                        <button className='pend-req-name'>{obj.requester}</button>
                    </td>
                </tr>
            )
        });
        awaitingConfirmSection = <Table className='pend-table'><tbody>{ awaitingConfirms }</tbody></Table>
    }

    let sharedProfilesBody = <h6 className='font-normal'>No shared profiles yet</h6>;
    if (profileData.active_shares.length > 0) {
        const tableBody = profileData.active_shares.map((obj, ind) => {
            return (
                <tr key={ind}>
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
        sharedProfilesBody = (
            <Table className='pend-table'>
                <thead><tr className='short-row'><th> </th><th>Username</th></tr></thead>
                <tbody>
                    { tableBody }
                </tbody>
            </Table>
        );
    }

    let pendingRequestsSection = null;
    if (profileData.share_requests_made.length > 0) {
        const pendingRequests = profileData.share_requests_made.map(obj => {
            return (
                <tr key={obj.id}>
                    <td style={{width: 28}}>
                        <span role="img" aria-label="trash" className='del-icon'
                              onClick={() => dispatch(deleteShareRequest(obj.id))}
                        >&#x274C;</span>
                    </td>
                    <td>
                        <button className='pend-req-name'>{obj.receiver}</button>
                    </td>
                </tr>
            )
        });
        pendingRequestsSection = <Table className='pend-table'><tbody>{ pendingRequests }</tbody></Table>
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-320">
            <ModalHeader><p className='fontsize10 bottom-0'>View shared profiles</p></ModalHeader>
            <ModalBody>
                { sharedProfilesBody }
                <button className='btn search-prof-btn' onClick={() => {setShowProfileSearch(true)}}>
                    Profile search</button>
                { content.menu.profileShareRequestFailure && (
                    <Alert className="share-req-fail" color="danger">Something went wrong</Alert> )}
            </ModalBody>
            { awaitingConfirmSection && (
                <React.Fragment>
                    <ModalHeader className='pend-head'>
                        <p className='fontsize10 bottom-0'>Pending requests</p>
                    </ModalHeader>
                    <ModalBody className='await-con-body pend-body'>
                        { awaitingConfirmSection }
                    </ModalBody>
                </React.Fragment> )}
            { pendingRequestsSection && (
                <React.Fragment>
                    <ModalHeader className='pend-head'>
                        <p className='fontsize10 bottom-0'>Awaiting confirmation</p>
                    </ModalHeader>
                    <ModalBody className='pend-body'>
                        { pendingRequestsSection }
                    </ModalBody>
                </React.Fragment> )}

        </Modal>
    );
};
export default ProfileSharesMenu;