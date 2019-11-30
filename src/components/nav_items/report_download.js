import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, Table, Alert, UncontrolledTooltip, Tooltip } from 'reactstrap';
import ProfileSearch from "../form/profile_search";
import { showNavItem } from "../../store/actions/profile";
import { baseUrl, loadSharedViewData, resetBodyState, updateProfileShare } from "../../store/actions/body";
import { PROFILE_SEARCH_RESULTS, PROFILE_SHARE_FETCH_SUCCESS, PROFILE_SHARE_REQUEST_FAILURE
} from "../../store/constants/profile";

const ReportDownloadMenu = ({ toggle, isOpen, handleSave, profileData, summaryParams, requestVerificationEmail, verificationEmailSent
                           }) => {
    const [removedParamIds, setRemovedParamsIds] = useState([]);
    const [removedStats, setRemovedStats] = useState([]);
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const profileSearchResults = content.menu.profileSearchResults;
    const isDemo = content.auth.username.startsWith('demo_');

    // submit -- post all param_ids execpt those in removed list, and removed stats post names of those in removed list

    let hasData = false;
    let reportOptions = <h6 className='menu-text'>No data available</h6>;
    if (summaryParams.length > 0 && removedParamIds.length < summaryParams.length) {
        hasData = true;
        reportOptions = (
            <Table className='report-param-table'>
                <tbody>
                    <tr>
                        <td><p className='section-label'>Tracking metrics</p></td>
                    </tr>
                    { summaryParams.filter(obj => !removedParamIds.includes(obj.id)).map(obj => {
                        return (
                            <tr key={obj.id}>
                                <td>
                                    <button className='report-param-btn'>
                                        {obj.name}
                                        <span className='del-share' id='delBtn'
                                              onClick={() => setRemovedParamsIds([...removedParamIds, obj.id])}
                                        >X</span>
                                    </button>
                                </td>
                            </tr>
                        )
                    }) }
                    { removedStats.length !== 2 && <tr><td><p className='section-label2'>Extra stats</p></td></tr> }
                    <tr>
                        <td>
                            <button className='report-param-btn color2' onClick={(e) => console.log(e)}>
                                Monthly averages
                                <span className='del-share' id='delBtn'
                                      onClick={() => console.log('sf')}
                                >X</span>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className='report-param-btn color2' onClick={(e) => console.log(e)}>
                                Rolling averages
                                <span className='del-share' id='delBtn'
                                      onClick={() => setRemovedStats([...removedStats, ''])}
                                >X</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-300">
            <ModalBody className='padleft-0 padright-0 padbottom-8' >
                { hasData && <div>
                    <button className='download-report-btn' onClick={() => console.log(true)}>Download report</button>
                    { content.menu.profileShareRequestFailure && (
                        <Alert className="share-req-fail" color="danger">Something went wrong</Alert> )}
                </div> }
                { reportOptions }
            </ModalBody>

        </Modal>
    );
};
export default ReportDownloadMenu;