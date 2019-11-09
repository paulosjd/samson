import {
    PROFILE_MENU_EDIT_SUCCESS, PROFILE_MENU_EDIT_FAILURE, CLEAR_PROFILE_UPDATE_STATUS, PROFILE_MENU_FETCH_SUCCESS,
    SHOW_MENU_EDIT_SUCCESS, PROFILE_SHARE_FETCH_SUCCESS, SUMMARY_DATA_PROFILE_EXTRAS
} from "../constants/profile";
import { USER_EMAIL_UPDATE, userConstants } from "../constants/user";

const initialState = {
    profileUpdateSuccess: false,
    profileUpdateFailure: false,
    verificationEmailSent: false,
    email: '',
    is_verified: '',
    birth_year: '',
    height: '',
    gender: '',
    active_shares: [],
    share_requests_made: [],
    share_requests_received: []
};

export default function extras(state = initialState, action) {
    switch(action.type) {
        case PROFILE_MENU_EDIT_SUCCESS:
            return { ...state, ...action.value, profileUpdateFailure: false, profileUpdateSuccess: true };
        case PROFILE_MENU_EDIT_FAILURE:
            return { ...state, profileUpdateSuccess: false, profileUpdateFailure: true };
        case SHOW_MENU_EDIT_SUCCESS:
            return { ...state, profileUpdateSuccess: true };
        case CLEAR_PROFILE_UPDATE_STATUS:
            return { ...state, profileUpdateSuccess: false, profileUpdateFailure: false };
        case PROFILE_MENU_FETCH_SUCCESS:
            return { ...state, ...action.payload.profileInfo.data };
        case PROFILE_SHARE_FETCH_SUCCESS:
            return { ...state, ...action.payload.shareInfo.data };
        case USER_EMAIL_UPDATE:
            return {...state, email: action.payload.targetsData.data.email};
        case SUMMARY_DATA_PROFILE_EXTRAS:
            return { ...state, share_requests_received: action.payload.profileData.data.share_requests_received };
        case userConstants.VERIFICATION_EMAIL_SUCCESS:
            return {...state, verificationEmailSent: action.value};
        default:
            return state
    }
}