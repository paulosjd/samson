import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, Table, Alert, UncontrolledTooltip, Tooltip } from 'reactstrap';
import ProfileSearch from "../form/profile_search";
import { showNavItem } from "../../store/actions/profile";
import { baseUrl, loadSharedViewData, resetBodyState, updateProfileShare } from "../../store/actions/body";
import { PROFILE_SEARCH_RESULTS, PROFILE_SHARE_FETCH_SUCCESS, PROFILE_SHARE_REQUEST_FAILURE
} from "../../store/constants/profile";

const ProfileSharesMenu = ({ toggle, isOpen, handleSave, profileData, requestVerificationEmail, verificationEmailSent
}) => {
    const [requestConfirmMessage, setRequestConfirmMessage] = useState('');
    const [requestConfirmId, setRequestConfirmId] = useState(null);
    const [showRequestConfirm, setShowRequestConfirm] = useState(false);
    const [showProfileSearch, setShowProfileSearch] = useState(false);
    const [delConfirmObj, setDelConfirmObj] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [tooltipTargetIsOpen, setTooltipTargetIsOpen] = useState({});
    const acceptShareRequest = (objId) => updateProfileShare(objId, 'accept');
    const deleteShareRequest = (objId) => updateProfileShare(objId, 'delete');
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const profileSearchResults = content.menu.profileSearchResults;
    const isDemo = content.auth.username.startsWith('demo_');

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
                })
                .then(() => { return dispatch({ type: PROFILE_SEARCH_RESULTS, payload: []}) })
                .then(() => setTimeout(() => dispatch(
                    { type: PROFILE_SHARE_REQUEST_FAILURE, value: false }),3000))
        }
    };

    const tooltipToggle = targetName => {
        if (!tooltipTargetIsOpen[targetName]) {
            setTooltipTargetIsOpen({
                [targetName]: {tooltipOpen: true}
            });
        } else {
            setTooltipTargetIsOpen({
                [targetName]: {tooltipOpen: !tooltipTargetIsOpen[targetName].tooltipOpen}
            });
        }
    };
    const isToolTipOpen = (targetName) => {
        return tooltipTargetIsOpen[targetName] ? tooltipTargetIsOpen[targetName].tooltipOpen : false;
    };

    if (!profileData.is_verified && !isDemo) {
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

    if (delConfirmObj) {
        return (
            <Modal className='max-width-320'
                   isOpen={!!delConfirmObj}
                   toggle={() => {if (delConfirmObj) {
                       setDelConfirmObj(null)
                   }}} >
                <ModalHeader>
                    <p className='fontsize10 bottom-0'>{`Delete profile view share with ${delConfirmObj.name}?`}</p>
                </ModalHeader>
                <ModalBody className='confirm-send-req'>
                    <div>
                        <button type="button" className='del-acc-btn'
                                onClick={() => {
                                    dispatch(deleteShareRequest(delConfirmObj.id)); setDelConfirmObj(null)
                                }}
                        >OK</button>
                        <button type="button" className='del-acc-btn'
                                onClick={() => setDelConfirmObj(null)}
                        >Cancel</button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }

    let sharedProfilesBody = <h6 className='menu-text'>No shared profiles yet</h6>;
    if (profileData.active_shares.length > 0) {
        const handleProfileClick = (profileId, e) => {
            if (e.target.id !== 'delBtn') {
                dispatch(loadSharedViewData(profileId));
                dispatch(showNavItem('profile_shares', false));
                dispatch(resetBodyState())
            }
        };
        const tableBody = profileData.active_shares.map(obj => {
            return (
                <tr key={obj.id}>
                    <td>
                        <button className='view-prof-btn' onClick={(e) => handleProfileClick(obj.profile_id, e)}>
                            {obj.name}
                            <span className='del-share' id='delBtn'
                                  onClick={() => setDelConfirmObj(obj)}
                            >X</span>
                        </button>
                    </td>
                </tr>
            )
        });
        sharedProfilesBody = (
            <Table className='pend-table'>
                <tbody>
                { tableBody }
                </tbody>
            </Table>
        );
    }

    let awaitingConfirmSection;
    if (profileData.share_requests_received.length > 0) {
        const awaitingConfirms = profileData.share_requests_received.map(obj => {
            return (
                <tr key={obj.id}>
                    <td style={{width: 28}}>
                        <span role="img" aria-label="trash" className='del-icon' id='reject'
                              onClick={() => dispatch(deleteShareRequest(obj.id))}
                        >&#x274C;</span>
                        <UncontrolledTooltip id="ttip" placement="bottom" target="reject">Dismiss</UncontrolledTooltip>
                    </td>
                    <td style={{width: 28}}>
                        <span role="img" aria-label="tick" className='del-icon' id='accept'
                              onClick={() => dispatch(acceptShareRequest(obj.id))}
                        >&#x2714;</span>
                        <UncontrolledTooltip id="ttip" placement="bottom" target="accept">Accept</UncontrolledTooltip>
                    </td>
                    <td style={{width: 158}}>
                        <button className='pend-req-name'>{obj.requester}</button>
                    </td>
                    <td>
                        <span role="img" aria-label="message" className='del-icon' id={`msg-${obj.id}`}>&#x1F4DD;</span>
                        <Tooltip
                            id="ttip" placement={'top'}
                            isOpen={isToolTipOpen(`msg-${obj.id}`)}
                            toggle={() => tooltipToggle(`msg-${obj.id}`)}
                            target={`msg-${obj.id}`}
                        >{obj.message}</Tooltip>
                    </td>
                </tr>
            )
        });
        awaitingConfirmSection = <Table className='pend-table'><tbody>{ awaitingConfirms }</tbody></Table>
    }

    let pendingRequestsSection = null;
    if (profileData.share_requests_made.length > 0) {
        const pendingRequests = profileData.share_requests_made.map(obj => {
            return (
                <tr key={obj.id}>
                    <td style={{width: 28}}>
                        <span role="img" aria-label="trash" className='del-icon' id='cancel'
                              onClick={() => dispatch(deleteShareRequest(obj.id))}
                        >&#x274C;</span>
                        <UncontrolledTooltip id="ttip" placement="bottom" target="cancel">Cancel</UncontrolledTooltip>
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
            <ModalHeader><p className='fontsize10 bottom-0'>Shared profile views</p></ModalHeader>
            <ModalBody className='padleft-0 padright-0 padbottom-8' >
                { sharedProfilesBody }
                <div className='search-prof-btn'>
                    <button onClick={() => {setShowProfileSearch(true)}}>Profile search</button>
                    { content.menu.profileShareRequestFailure && (
                        <Alert className="share-req-fail" color="danger">Something went wrong</Alert> )}
                </div>
            </ModalBody>
            { awaitingConfirmSection && (
                <React.Fragment>
                    <ModalHeader className='pend-head'>
                        <p className='fontsize10 bottom-0'>Pending requests</p>
                    </ModalHeader>
                    <ModalBody className='await-con-body bottom-5'>
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