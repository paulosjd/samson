import axios from "axios";
import {
    SET_MENU_ITEM_INDEX, SET_FEAT_ITEM_INDEX, SET_EDIT_DATA_FLAG, SET_ADD_DATA_FLAG, EDIT_DATA_FAILURE,
    CLEAR_EDIT_DATA_FAILURE, SET_SHOW_ADD_METRIC, SET_SHOW_ADD_QUALIFIER, SET_EDIT_TARGET_FLAG, SET_EDIT_TARGET2_FLAG,
    APPEND_EDITED_DP_PARAMS, RESET_CHART_SELECTION, SET_SHOW_ROLLING_MEANS, SET_SHOW_ADD_CUSTOM_METRIC,
    SET_METRIC_ADD_FORM_HAS_VALUE, SET_SHOW_MEAN, SET_SHOW_MONTHLY_DIFFS, SET_SHOW_ADD_LINKED_PARAM, RESET_BODY_STATE
} from '../constants/body'
import {
    DATA_POINTS_REFRESH, TARGETS_DATA_REFRESH, UPDATE_LINKED_PARAMS, PROFILE_SHARE_FETCH_SUCCESS,
    FETCH_SUMMARY_DATA_SUCCESS, SHARE_VIEW_EXTRAS, FETCH_SUMMARY_DATA_FAILURE
} from "../constants/profile";

export const baseUrl = 'http://127.0.0.1:8000/api';

export const setMenuItemIndex = (value) => ({
    type: SET_MENU_ITEM_INDEX, value
});

export const setFeatItemIndex = (value) => ({
    type: SET_FEAT_ITEM_INDEX, value
});

export const setEditDataFlag = (value) => ({
    type: SET_EDIT_DATA_FLAG, value
});

export const setEditTargetFlag = (value) => ({
    type: SET_EDIT_TARGET_FLAG, value
});

export const setEditTarget2Flag = (value) => ({
    type: SET_EDIT_TARGET2_FLAG, value
});

export const clearEditDataFailure = () => ({
    type: CLEAR_EDIT_DATA_FAILURE
});

export const setAddDataFlag = (value) => ({
    type: SET_ADD_DATA_FLAG, value
});

export const setMetricAddFormHasValue = (value) => ({
    type: SET_METRIC_ADD_FORM_HAS_VALUE, value
});

export const setShowAddMetric = (value) => ({
    type: SET_SHOW_ADD_METRIC, value
});

export const setShowAddCustomMetric = (value) => ({
    type: SET_SHOW_ADD_CUSTOM_METRIC, value
});

export const setShowAddQualifier = (value) => ({
    type: SET_SHOW_ADD_QUALIFIER, value
});

export const setShowLinkedParamAdd = (value) => ({
    type: SET_SHOW_ADD_LINKED_PARAM, value
});

export const resetChartSelection = () => ({
    type: RESET_CHART_SELECTION
});

export const resetBodyState = () => ({
    type: RESET_BODY_STATE
});

export const setShowRollingMeans = (value) => ({
    type: SET_SHOW_ROLLING_MEANS, value
});

export const setShowMean = (value) => ({
    type: SET_SHOW_MEAN, value
});

export const setShowMonthlyDiffs = (value) => ({
    type: SET_SHOW_MONTHLY_DIFFS, value
});

export const postEditedDataPoints = (value, action='edit') => {
    return dispatch => {
        axios.post(`${baseUrl}/datapoints/${action}`, {value},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({ type: DATA_POINTS_REFRESH, payload: {profileData} }))
            .then(() => dispatch({ type: APPEND_EDITED_DP_PARAMS, value: value.parameter }))
            .catch((error) => dispatch({ type: EDIT_DATA_FAILURE, payload: error }) )
    }
};

export const postQualifyingText = (value) => {
    const url = `${baseUrl}/datapoints/qualifying-text`;
    return dispatch => {
        axios.post(url,{value},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
            .then(profileData => dispatch({ type: DATA_POINTS_REFRESH, payload: {profileData} }))
    }
};

export const postLinkedParams = (value, action) => {
    const url = `${baseUrl}/profile/linked-param/${action}`;
    return dispatch => {
        axios.post(url,{value},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
            .then(payload => dispatch({ type: UPDATE_LINKED_PARAMS, payload: {payload} }))
            .then(() => {return dispatch(setShowLinkedParamAdd(false))})
    }
};

export const postTargetValue = (value) => {
    const url = `${baseUrl}/profile/target-update`;
    return dispatch => {
        axios.post(url,{value},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
            .then(targetsData => dispatch({ type: TARGETS_DATA_REFRESH, payload: {targetsData} }))
    }
};

export const updateProfileShare = (ojbId, action) => {
    const url = `${baseUrl}/profile/profile-share/${action}`;
    return dispatch => {
        axios.post(url,{profile_share_id: ojbId},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}} )
            .then(shareInfo => dispatch({ type: PROFILE_SHARE_FETCH_SUCCESS, payload: {shareInfo} }))
    }
};

export const loadSharedViewData = (profileId) => {
    let url = `${baseUrl}/profile/shared-summary/${profileId}`;
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => {
                dispatch({ type: FETCH_SUMMARY_DATA_SUCCESS, payload: {profileData} });
                dispatch({ type: SHARE_VIEW_EXTRAS, payload: profileData });
            })
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};