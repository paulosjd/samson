import axios from "axios";
import download from 'downloadjs';
import { FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, FETCH_SUMMARY_DATA_FAILURE, SHOW_PROFILE_MENU,
    PROFILE_MENU_EDIT_SUCCESS, PROFILE_MENU_FETCH_SUCCESS, PROFILE_MENU_FETCH_FAILURE, PROFILE_MENU_EDIT_FAILURE,
    CLEAR_PROFILE_UPDATE_STATUS, SHOW_INTERVENTIONS_MENU, SHOW_CSV_UPLOAD_MENU, SHOW_CSV_DOWNLOAD_MENU,
    SUBMIT_CSV_LOAD_SUCCESS, SUBMIT_CSV_LOAD_FAILURE, CSV_LOAD_CONFIRM, CSV_LOAD_CLEAR,
    CLEAR_CSV_LOAD_CONFIRM, ADD_BLANK_PARAM, TARGETS_DATA_REFRESH
} from '../constants/profile'
import { SET_SHOW_ADD_METRIC } from "../constants/body";

export const fetchProfileSummary = () => {
    let url = `http://127.0.0.1:8000/api/profile/summary`;
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({ type: FETCH_SUMMARY_DATA_SUCCESS, payload: {profileData} }))
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

export const fetchProfileSummaryBegin = () => ({
    type: FETCH_SUMMARY_DATA_BEGIN
});

export const showNavItem = (item, value) => {
    switch (item) {
        case 'interventions':
            return ({ type: SHOW_INTERVENTIONS_MENU, value });
        case 'csv_download':
            return ({ type: SHOW_CSV_DOWNLOAD_MENU, value });
        case 'csv_upload':
            return ({ type: SHOW_CSV_UPLOAD_MENU, value });
        default:
            return ({ type: SHOW_PROFILE_MENU, value })
    }
};

export const fetchProfileInfo = () => {
    const url = 'http://127.0.0.1:8000/api/profile/info-update';
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token') }})
            .then((profileInfo) => { dispatch({ type: PROFILE_MENU_FETCH_SUCCESS, payload: {profileInfo}}) })
            .catch(() => dispatch({ type: PROFILE_MENU_FETCH_FAILURE }))
    }
};

export const updateProfileInfo = (value) => {
    const url = 'http://127.0.0.1:8000/api/profile/info-update';
    return dispatch => {
        axios.post(url,
            {birth_year: value.birthYear, gender: value.gender, height: value.height },
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(() => dispatch({ type: PROFILE_MENU_EDIT_SUCCESS, payload: {value} }))
            .then(() => setTimeout(() => dispatch({ type: CLEAR_PROFILE_UPDATE_STATUS }),2500))
            .catch(() => dispatch({ type: PROFILE_MENU_EDIT_FAILURE }) )
    }
};

export const postCsvUpload = (value) => {
    const formData = new FormData();
    // todo: make dry with a python style for in ... formData.set(.., getattr(...)?
    formData.set('file',value.file);
    formData.set('date_format',value.date_fmt);
    formData.set('param_choice',value.param_choice);
    formData.set('unit_choice',value.unit_choice);

    const url = 'http://127.0.0.1:8000/api/datapoints/upload';
    return dispatch => {
        axios.post(url, formData,
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token'),
                    'Content-Type': 'multipart/form-data'}} )
            .then((val) => dispatch({ type: SUBMIT_CSV_LOAD_SUCCESS, value: val }) )
            .catch((error) => dispatch({ type: SUBMIT_CSV_LOAD_FAILURE, payload: error }) )
    }
};

export const postMenuItemAdd = (value) => {
    const url = 'http://127.0.0.1:8000/api/profile/menu-item-add';
    return dispatch => {
        axios.post(url, {data: { param_choice: value.param_choice, unit_choice: value.unit_choice }},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
            .then(profileData => dispatch({ type: FETCH_SUMMARY_DATA_SUCCESS, payload: {profileData} }))
            .then(() => dispatch({ type: SET_SHOW_ADD_METRIC, value: false}) )
    }
};

export const confirmCsvUpload = (data, meta) => {
    const url = 'http://127.0.0.1:8000/api/datapoints/upload';
    return dispatch => {
        axios.post(url, {data: {...data, confirm: true}, meta: meta },
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
            .then(() => dispatch({ type: CSV_LOAD_CONFIRM }) )
            .then(() => setTimeout(() => dispatch({ type: CLEAR_CSV_LOAD_CONFIRM }), 2500))
            .catch((error) => dispatch({ type: SUBMIT_CSV_LOAD_FAILURE, payload: error }) )
    }
};

export const clearCsvLoad = () => ({
    type: CSV_LOAD_CLEAR
});

export const getCsvDownload = (value) => {
    const url = 'http://127.0.0.1:8000/api/datapoints/download';
    const fileName = value.fields.join('_').replace(/ /g, '_').toLowerCase().concat(
        new Date().toISOString().slice(0,7).replace('-', ''), '.csv');
    return dispatch => {
        axios.post(url, value,
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token') }})
            .then(response => {
                download(response.data, fileName, 'text/csv'); dispatch({ type: CSV_LOAD_CONFIRM })} )
            .then(() => setTimeout(() => dispatch({ type: CLEAR_CSV_LOAD_CONFIRM }), 2500))
            .catch((error) => { dispatch({ type: SUBMIT_CSV_LOAD_FAILURE, payload: error }) } )
    }
};

export const targetDataRefresh = () => {
    const url = 'http://127.0.0.1:8000/api/profile/target-update';
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token') }})
            .then((targetsData) => { dispatch({ type: TARGETS_DATA_REFRESH, payload: {targetsData}}) })
    }
};
