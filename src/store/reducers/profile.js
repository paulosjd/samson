import {
    FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, FETCH_SUMMARY_DATA_FAILURE, SHOW_PROFILE_MENU,
    PROFILE_MENU_EDIT_SUCCESS, PROFILE_MENU_FETCH_SUCCESS, PROFILE_MENU_EDIT_FAILURE, CLEAR_PROFILE_UPDATE_STATUS,
    SHOW_INTERVENTIONS_MENU, SHOW_CSV_UPLOAD_MENU
} from "../constants/profile";

const initialState = {
    summaryItems: [],
    metricItems: [],
    loading: false,
    error: null,
    username: '',
    showProfileMenu: false,
    showCsvUploadMenu: false,
    showInterventionsMenu: false,
    profileUpdateSuccess: false,
    profileUpdateFailure: false,
    birthYear: '',
    gender: '',
};

export default function profile(state = initialState, action) {
    const semiClearState = clearNavItems(state);
    switch(action.type) {
        case FETCH_SUMMARY_DATA_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_SUMMARY_DATA_SUCCESS:
            return { ...state, loading: false, summaryItems: action.payload.profileData.data };
        case FETCH_SUMMARY_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        case SHOW_CSV_UPLOAD_MENU:
            return { ...semiClearState, showCsvUploadMenu: action.value };
        case SHOW_PROFILE_MENU:
            return { ...semiClearState, showProfileMenu: action.value };
        case SHOW_INTERVENTIONS_MENU:
            return { ...semiClearState, showInterventionsMenu: action.value };
        case PROFILE_MENU_FETCH_SUCCESS:
            return { ...state, ...action.payload.profileInfo.data };
        case PROFILE_MENU_EDIT_SUCCESS:
            return { ...state, ...action.value, profileUpdateFailure: false, profileUpdateSuccess: true };
        case PROFILE_MENU_EDIT_FAILURE:
            return { ...state, profileUpdateSuccess: false, profileUpdateFailure: true };
        case CLEAR_PROFILE_UPDATE_STATUS:
            return { ...state, profileUpdateSuccess: false, profileUpdateFailure: false };
        default:
            return state
    }
}

const clearNavItems = (state) => {
    return {
        ...state,
        showProfileMenu: false,
        showInterventionsMenu: false,
        profileUpdateSuccess: false,
        profileUpdateFailure: false,
    }
};