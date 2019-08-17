import axios from "axios";
import {
    SET_MENU_ITEM_INDEX, SET_FEAT_ITEM_INDEX, SET_EDIT_DATA_FLAG, SET_ADD_DATA_FLAG, EDIT_DATA_FAILURE,
    CLEAR_EDIT_DATA_FAILURE, SET_SHOW_ADD_METRIC, SET_SHOW_ADD_QUALIFIER
} from '../constants/body'
import {DATA_POINTS_REFRESH } from "../constants/profile";

export const setMenuItemIndex = (value) => ({
    type: SET_MENU_ITEM_INDEX, value
});

export const setFeatItemIndex = (value) => ({
    type: SET_FEAT_ITEM_INDEX, value
});

export const setEditDataFlag = (value) => ({
    type: SET_EDIT_DATA_FLAG, value
});

export const clearEditDataFailure = () => ({
    type: CLEAR_EDIT_DATA_FAILURE
});

export const setAddDataFlag = (value) => ({
    type: SET_ADD_DATA_FLAG, value
});

export const setShowAddMetric = (value) => ({
    type: SET_SHOW_ADD_METRIC, value
});

export const setShowAddQualifier = (value) => ({
    type: SET_SHOW_ADD_QUALIFIER, value
});

export const postEditedDataPoints = (value, action='edit') => {
    return dispatch => {
        axios.post(`http://127.0.0.1:8000/api/datapoints/${action}`, {value},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({ type: DATA_POINTS_REFRESH, payload: {profileData} }))
            .catch((error) => dispatch({ type: EDIT_DATA_FAILURE, payload: error }) )
    }
};



