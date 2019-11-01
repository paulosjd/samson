import {
    PROFILE_MENU_EDIT_SUCCESS, PROFILE_MENU_EDIT_FAILURE, CLEAR_PROFILE_UPDATE_STATUS, PROFILE_MENU_FETCH_SUCCESS,
    SHOW_MENU_EDIT_SUCCESS, TARGETS_DATA_REFRESH,
} from "../constants/profile";
import {USER_EMAIL_UPDATE} from "../constants/user";

const initialState = {
    profileUpdateSuccess: false,
    profileUpdateFailure: false,
    email: '',
    is_verified: '',
    birth_year: '',
    height: '',
    gender: '',
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
            console.log(action.payload.profileInfo.data)
            return { ...state, ...action.payload.profileInfo.data };
        case USER_EMAIL_UPDATE:
            return {...state, email: action.payload.targetsData.data.email};
        default:
            return state
    }
}