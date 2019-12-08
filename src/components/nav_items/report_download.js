import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Modal, ModalBody, Table, Alert } from 'reactstrap';
import { fetchReportCall, showNavItem } from "../../store/actions/profile";
import { baseUrl } from "../../store/actions/body";
import {
    REPORT_DOWNLOAD_SCHEDULE_FAILURE, REPORT_DOWNLOAD_SCHEDULE_SUCCESS
} from "../../store/constants/profile";

const ReportDownloadMenu = ({ toggle, isOpen, summaryParams }) => {
    const [removedParamIds, setRemovedParamsIds] = useState([]);
    const [removedStats, setRemovedStats] = useState([]);
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const hasReportFile = content.profile.hasReportFile;

    const handleSubmit = () => {
        const param_ids = summaryParams.filter(obj => !removedParamIds.includes(obj.id)).map(obj => obj.id);
        const postData = {param_ids, removed_stats: removedStats, date: new Date().toDateString()};
        const poll = (task_id) => {
            let i = 0;
            const interval = setInterval(() => {
                i++;
                if (i > 3) {
                    clearInterval(interval)
                }
                if (!hasReportFile) {
                    dispatch(fetchReportCall(task_id));
                }
            }, 3500);
        };
        return dispatch => {
            axios.post(`${baseUrl}/profile/generate-report`, postData,
                {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
                .then(resp => {
                        dispatch({ type: REPORT_DOWNLOAD_SCHEDULE_SUCCESS, value: true });
                        setTimeout(poll, 2500, resp.data.task_id)
                })
                .then(() => setTimeout(() => dispatch(
                    { type: REPORT_DOWNLOAD_SCHEDULE_SUCCESS, value: false }),3500))
                .then(() => setTimeout(() =>
                    dispatch(showNavItem('csv_upload', false)), 2500)
                )
                .catch(() => dispatch({ type: REPORT_DOWNLOAD_SCHEDULE_FAILURE, value: true }))
                .then(() => setTimeout(() => dispatch(
                    { type: REPORT_DOWNLOAD_SCHEDULE_FAILURE, value: false }),3000))
        }
    };

    let hasData = false;
    let reportOptions = <h6 className='menu-text'>No data available</h6>;
    if (summaryParams.length > 0 && removedParamIds.length < summaryParams.length) {
        hasData = true;
        reportOptions = (
            <Table className='report-param-table'>
                <tbody>
                    <tr>
                        <td><p className='section-label'>Health metrics</p></td>
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
                    { !removedStats.includes('monthly') && <tr>
                        <td>
                            <button className='report-param-btn color2' onClick={(e) => console.log(e)}>
                                Monthly averages
                                <span className='del-share' id='delBtn'
                                      onClick={() => setRemovedStats([...removedStats, 'monthly'])}
                                >X</span>
                            </button>
                        </td>
                    </tr> }
                    { !removedStats.includes('rolling') && <tr>
                        <td>
                            <button className='report-param-btn color2' onClick={(e) => console.log(e)}>
                                Rolling averages
                                <span className='del-share' id='delBtn'
                                      onClick={() => setRemovedStats([...removedStats, 'rolling'])}
                                >X</span>
                            </button>
                        </td>
                    </tr> }
                </tbody>
            </Table>
        );
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-300">
            <ModalBody className='padleft-0 padright-0 padbottom-8' >
                { hasData && <div>
                    <button className='download-report-btn'
                            disabled={content.profile.reportDownloadSuccess}
                            onClick={() => dispatch(handleSubmit())}
                    >Download report</button>
                    { content.profile.reportDownloadSuccess && (
                        <Alert className="report-alert" color="success">Download scheduled</Alert> )}
                    { content.profile.reportDownloadFail && (
                        <Alert className="report-alert" color="danger">Something went wrong</Alert> )}
                </div> }
                { reportOptions }
            </ModalBody>
        </Modal>
    );
};
export default ReportDownloadMenu;