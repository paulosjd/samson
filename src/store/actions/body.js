import axios from "axios";
import {
    SET_MENU_ITEM_INDEX, SET_FEAT_ITEM_INDEX, SET_EDIT_DATA_FLAG, SET_ADD_DATA_FLAG
} from '../constants/body'
import { DATA_POINTS_REFRESH } from "../constants/profile";

export const setMenuItemIndex = (value) => ({
    type: SET_MENU_ITEM_INDEX, value
});

export const setFeatItemIndex = (value) => ({
    type: SET_FEAT_ITEM_INDEX, value
});

export const setEditDataFlag = (value) => ({
    type: SET_EDIT_DATA_FLAG, value
});

export const setAddDataFlag = (value) => ({
    type: SET_ADD_DATA_FLAG, value
});

export const postEditedDataPoints = (value) => {
    const url = 'http://127.0.0.1:8000/api/datapoints/edit';
    setEditDataFlag(false);
    return dispatch => {
        axios.post(url,
            {value},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({ type: DATA_POINTS_REFRESH, payload: {profileData} }))
            // .catch(() => dispatch({ type: PROFILE_MENU_EDIT_FAILURE }) )
    }
};
