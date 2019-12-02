import axios from "axios";
import download from 'downloadjs';
import {
    FETCH_SUMMARY_DATA_BEGIN,
    FETCH_SUMMARY_DATA_SUCCESS,
    FETCH_SUMMARY_DATA_FAILURE,
    SHOW_PROFILE_MENU,
    PROFILE_MENU_EDIT_SUCCESS,
    PROFILE_MENU_FETCH_SUCCESS,
    PROFILE_MENU_FETCH_FAILURE,
    PROFILE_MENU_EDIT_FAILURE,
    CLEAR_PROFILE_UPDATE_STATUS,
    SHOW_INTERVENTIONS_MENU,
    SHOW_CSV_UPLOAD_MENU,
    SHOW_CSV_DOWNLOAD_MENU,
    SUBMIT_CSV_LOAD_SUCCESS,
    SUBMIT_CSV_LOAD_FAILURE,
    CSV_LOAD_CONFIRM,
    CSV_LOAD_CLEAR,
    CLEAR_CSV_LOAD_CONFIRM,
    UNIT_INFO_REFRESH,
    SHOW_MENU_EDIT_SUCCESS,
    POST_CUSTOM_PARAM_FAILURE,
    UPDATE_BOOKMARKS,
    SHOW_LINKED_PARAMS_MENU,
    UPDATE_LINKED_PARAMS,
    SHOW_PROFILE_SHARES_MENU,
    PROFILE_SHARE_FETCH_SUCCESS,
    SUMMARY_DATA_PROFILE_EXTRAS,
    SHOW_REPORT_DOWNLOAD_MENU,
    SET_HAS_REPORT_FILE
} from '../constants/profile'
import {
    SET_SHOW_ADD_METRIC, RESET_SELECTED_ITEM_INDEX, SET_SHOW_ADD_CUSTOM_METRIC, EDIT_DATA_FAILURE
} from "../constants/body";

const baseUrl = 'http://127.0.0.1:8000/api';

export const fetchProfileSummary = () => {
    let url = `${baseUrl}/profile/summary`;
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => {
                dispatch({ type: FETCH_SUMMARY_DATA_SUCCESS, payload: {profileData} });
                dispatch({ type: SUMMARY_DATA_PROFILE_EXTRAS, payload: {profileData} });
            })
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

export const fetchProfileSummaryBegin = () => ({
    type: FETCH_SUMMARY_DATA_BEGIN
});

export const resetSelectedItemIndex = () => ({
    type: RESET_SELECTED_ITEM_INDEX
});

export const showNavItem = (item, value) => {
    switch (item) {
        case 'report_download':
            return ({ type: SHOW_REPORT_DOWNLOAD_MENU, value });
        case 'interventions':
            return ({ type: SHOW_INTERVENTIONS_MENU, value });
        case 'csv_download':
            return ({ type: SHOW_CSV_DOWNLOAD_MENU, value });
        case 'csv_upload':
            return ({ type: SHOW_CSV_UPLOAD_MENU, value });
        case 'linked_params':
            return ({ type: SHOW_LINKED_PARAMS_MENU, value });
        case 'profile_shares':
            return ({ type: SHOW_PROFILE_SHARES_MENU, value });
        default:
            return ({ type: SHOW_PROFILE_MENU, value })
    }
};

export const fetchProfileInfo = () => {
    const url = `${baseUrl}/profile/info-update`;
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then((profileInfo) => dispatch({ type: PROFILE_MENU_FETCH_SUCCESS, payload: {profileInfo} }))
            .catch(() => dispatch({ type: PROFILE_MENU_FETCH_FAILURE }))
    }
};

export const fetchProfileShareInfo = () => {
    const url = `${baseUrl}/profile/profile-share`;
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then((shareInfo) => dispatch({ type: PROFILE_SHARE_FETCH_SUCCESS, payload: {shareInfo} }))
    }
};

export const updateProfileInfo = (value) => {
    const url = `${baseUrl}/profile/info-update`;
    return dispatch => {
        axios.post(url,
            {birth_year: value.birthYear, gender: value.gender, height: value.height },
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(() => dispatch({ type: PROFILE_MENU_EDIT_SUCCESS, payload: {value} }))
            .then(() => setTimeout(() => dispatch({ type: CLEAR_PROFILE_UPDATE_STATUS }),2500))
            .then(() => {return dispatch(fetchProfileSummary())})
            .catch(() => dispatch({ type: PROFILE_MENU_EDIT_FAILURE }) )
    }
};

export const postCsvUpload = (value) => {
    const formData = new FormData();
    formData.set('file',value.file);
    formData.set('date_format',value.date_fmt);
    formData.set('param_choice',value.param_choice);
    formData.set('unit_choice',value.unit_choice);
    const url = `${baseUrl}/datapoints/upload`;
    return dispatch => {
        axios.post(url, formData,
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token'),
                    'Content-Type': 'multipart/form-data'}} )
            .then(val => dispatch({ type: SUBMIT_CSV_LOAD_SUCCESS, value: val }) )
            .catch(error => dispatch({ type: SUBMIT_CSV_LOAD_FAILURE, payload: error }) )
    }
};

export const confirmCsvUpload = (data, meta) => {
    const url = `${baseUrl}/datapoints/upload`;
    return dispatch => {
        axios.post(url, {data: {...data, confirm: true}, meta: meta },
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(() => dispatch({ type: CSV_LOAD_CONFIRM }) )
            .then(() => setTimeout(() => dispatch({ type: CLEAR_CSV_LOAD_CONFIRM }), 2500))
            .catch((error) => dispatch({ type: SUBMIT_CSV_LOAD_FAILURE, payload: error }) )
    }
};

export const postMenuItemAdd = (value) => {
    const url = `${baseUrl}/profile/menu-item-add`;
    return dispatch => {
        axios.post(url, {data: { param_choice: value.param_choice, unit_choice: value.unit_choice }},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({ type: FETCH_SUMMARY_DATA_SUCCESS, payload: {profileData} }) )
            .then(() => dispatch({ type: SET_SHOW_ADD_METRIC, value: false }) )
    }
};

export const postCustomMenuItemAdd = (value) => {
    const url = `${baseUrl}/profile/custom-metric-add`;
    return dispatch => {
        axios.post(url, {data: { param_name: value.param_name, unit_symbol: value.unit_symbol }},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({ type: FETCH_SUMMARY_DATA_SUCCESS, payload: {profileData} }) )
            .then(() => dispatch({ type: SET_SHOW_ADD_CUSTOM_METRIC, value: false }) )
            .catch((error) => dispatch({ type: POST_CUSTOM_PARAM_FAILURE, payload: error }) )
    }
};

export const clearLoadError = () => ({
    type: CSV_LOAD_CLEAR
});

export const getCsvDownload = (value) => {
    const url = `${baseUrl}/datapoints/download`;
    const fileName = value.fields.join('_').replace(/ /g, '_').toLowerCase().concat(
        new Date().toISOString().slice(0,7).replace('-', ''), '.csv');
    return dispatch => {
        axios.post(url, value,
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token') }})
            .then(response => {
                download(response.data, fileName, 'text/csv'); dispatch({ type: CSV_LOAD_CONFIRM })} )
            .then(() => setTimeout(() => dispatch({ type: CLEAR_CSV_LOAD_CONFIRM }), 2500))
            .catch((error) => dispatch({ type: SUBMIT_CSV_LOAD_FAILURE, payload: error }))
    }
};

export const fetchReportCall = (task_id) => {
    return dispatch => {
        const fileName = 'health_metrics_report_'.concat(
            new Date().toISOString().slice(0,7).replace('-', ''), '.pdf');
        dispatch({ type: SET_HAS_REPORT_FILE, value: false });
        return axios.get(`${baseUrl}/profile/generate-report/${task_id}`,
            { headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(result => {
                if (result.headers['content-type'] === 'application/pdf') {
                    dispatch({ type: SET_HAS_REPORT_FILE, value: true })
                    download(result.data, fileName, 'application/pdf');
                }
            })
            .then(() => setTimeout(() =>
                dispatch({ type: SET_HAS_REPORT_FILE, value: false }), 3600)
            )
    }
};

export const postColorSchema = (value) => {
    return dispatch => {
        axios.post(`${baseUrl}/profile/param-colors`, value,
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then((unitInfoData) => dispatch({ type: UNIT_INFO_REFRESH, payload: {unitInfoData}}) )
            .then(() => dispatch({ type: SHOW_MENU_EDIT_SUCCESS }))
            .then(() => setTimeout(() => dispatch({ type: CLEAR_PROFILE_UPDATE_STATUS }),2500))
            .catch(() => dispatch({ type: PROFILE_MENU_EDIT_FAILURE }) )
    }
};

export const postLinkedParamsEdit = (value) => {
    return dispatch => {
        axios.post(`${baseUrl}/profile/linked-param/edit`, value,
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(payload => dispatch({ type: UPDATE_LINKED_PARAMS, payload: {payload} }))
            .then(() => dispatch({ type: SHOW_MENU_EDIT_SUCCESS }))
            .then(() => setTimeout(() => dispatch({ type: CLEAR_PROFILE_UPDATE_STATUS }),2500))
            .catch(() => dispatch({ type: PROFILE_MENU_EDIT_FAILURE }) )
    }
};

export const postEditedBookmarks = (value, action='edit') => {
    return dispatch => {
        axios.post(`${baseUrl}/profile/bookmarks-${action}`, {value},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(bookmarksData => dispatch({ type: UPDATE_BOOKMARKS, payload: {bookmarksData} }))
            .catch((error) => dispatch({ type: EDIT_DATA_FAILURE, payload: error }) )
    }
};
