import { FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, FETCH_SUMMARY_DATA_FAILURE, SHOW_PROFILE_MENU,
    PROFILE_MENU_EDIT_SUCCESS, PROFILE_MENU_FETCH_SUCCESS, PROFILE_MENU_FETCH_FAILURE, PROFILE_MENU_EDIT_FAILURE,
    CLEAR_PROFILE_UPDATE_STATUS, SHOW_INTERVENTIONS_MENU, SHOW_CSV_UPLOAD_MENU, SHOW_CSV_DOWNLOAD_MENU,
    SUBMIT_CSV_UPLOAD_SUCCESS, SUBMIT_CSV_UPLOAD_FAILURE, CSV_UPLOAD_CONFIRM, CSV_UPLOAD_CLEAR,
    CLEAR_CSV_UPLOAD_CONFIRM,
} from '../constants/profile'
import axios from "axios";

export const fetchProfileSummary = () => {
    let url = `http://127.0.0.1:8000/api/profile/summary`;
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => {
                dispatch({ type: FETCH_SUMMARY_DATA_SUCCESS, payload: { profileData } });
            })
            .catch((error) => {
                dispatch({type: FETCH_SUMMARY_DATA_FAILURE, payload: { error }});
            });
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
            .then((profileInfo) => { dispatch({ type: PROFILE_MENU_FETCH_SUCCESS, payload: {profileInfo}}) } )
            .catch(() => { dispatch({ type: PROFILE_MENU_FETCH_FAILURE }) } )
    }
};

export const updateProfileInfo = (value) => {
    const url = 'http://127.0.0.1:8000/api/profile/info-update';
    return dispatch => {
        axios.post(url,
            {birth_year: value.birthYear, gender: value.gender },
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
            .then(() => dispatch({ type: PROFILE_MENU_EDIT_SUCCESS, payload: {value}}) )
            .then(() => setTimeout(() => dispatch({ type: CLEAR_PROFILE_UPDATE_STATUS }), 2500))
            .catch(() => dispatch({ type: PROFILE_MENU_EDIT_FAILURE }) )
    }
};

export const postCsvUpload = (value) => {
    const formData = new FormData();
    formData.set('file',value.file);
    formData.set('date_format',value.date_fmt);
    formData.set('param_choice',value.param_choice);
    const url = 'http://127.0.0.1:8000/api/upload/datapoints';
    return dispatch => {
        axios.post(url, formData,
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token'),
                    'Content-Type': 'multipart/form-data'}} )
            .then((val) => dispatch({ type: SUBMIT_CSV_UPLOAD_SUCCESS, value: val }) )
            // .then(() => setTimeout(() => dispatch({ type: CLEAR_PROFILE_UPDATE_STATUS }), 2500))
            .catch((error) => { dispatch({ type: SUBMIT_CSV_UPLOAD_FAILURE, payload: error }) } )
    }
};

export const confirmCsvUpload = (data, meta) => {
    const url = 'http://127.0.0.1:8000/api/upload/datapoints';
    return dispatch => {
        axios.post(url, {data: {...data, confirm: true}, meta: meta },
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
            .then(() => dispatch({ type: CSV_UPLOAD_CONFIRM }) )
            .then(() => setTimeout(() => dispatch({ type: CLEAR_CSV_UPLOAD_CONFIRM }), 2500))
            .catch((error) => dispatch({ type: SUBMIT_CSV_UPLOAD_FAILURE, payload: error }) )
    }
};

export const clearCsvUpload = () => ({
    type: CSV_UPLOAD_CLEAR
});


// HOW TO MAKE ANY 401 Resp make redirect to login?  ... make so more than hour than not problem