import { FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, FETCH_SUMMARY_DATA_FAILURE, SHOW_PROFILE_MENU,
    PROFILE_MENU_EDIT_SUCCESS, PROFILE_MENU_FETCH_SUCCESS, PROFILE_MENU_FETCH_FAILURE } from '../constants/profile'
import axios from "axios";
import {userConstants as constants} from "../constants/user";

export const fetchProfileSummary = () => {
    let url = `http://127.0.0.1:8000/api/profile/summary`;
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => {
                dispatch({ type: FETCH_SUMMARY_DATA_SUCCESS, payload: { profileData } });
            })
            .catch(error => {
                dispatch({type: FETCH_SUMMARY_DATA_FAILURE, payload: { error }});
            });
    }
};

export const fetchProfileSummaryBegin = () => ({
    type: FETCH_SUMMARY_DATA_BEGIN
});

export const showProfileMenu = (value) => ({
    type: SHOW_PROFILE_MENU, value
});

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
        axios.post(url, JSON.stringify({value}),
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token') }})
            .then(() => { dispatch({ type: PROFILE_MENU_EDIT_SUCCESS, payload: {value}}) } )
            .catch(() => { dispatch({ type: PROFILE_MENU_EDIT_SUCCESS, payload: {value}}) } )
    }
};
// export const updateProfileMenu2 = () => {
//     let url = `http://127.0.0.1:8000/api/profile/info-update`;
//     return dispatch => {
//         axios.post(url,  JSON.stringify({formData}, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
//             .then(val => {
//                 dispatch({ type: FETCH_SUMMARY_DATA_SUCCESS, payload: { val } });
//             })
//             .catch(error => {
//                 dispatch({type: FETCH_SUMMARY_DATA_FAILURE, payload: { error }});
//             });
//     }
// };

export const forgottenLogin = (field, email) => {
    const url = `http://127.0.0.1:8000/api/users/help/${field}`;
    return dispatch => {
        axios.post(url, JSON.stringify({email}), {headers: {"Content-Type": "application/json", }})
            .then(() => {dispatch({type: field === 'password' ? constants.PASSWORD_RESET_SUCCESS :
                    constants.USERNAME_REMINDER_SUCCESS})
            })
    }
};