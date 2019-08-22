import {
    PROFILE_MENU_EDIT_SUCCESS, PROFILE_MENU_EDIT_FAILURE, CLEAR_PROFILE_UPDATE_STATUS, PROFILE_MENU_FETCH_SUCCESS,
} from "../constants/profile";

const initialState = {
    profileUpdateSuccess: false,
    profileUpdateFailure: false,
    birthYear: '',
    height: '',
    gender: '',
};

export default function extras(state = initialState, action) {
    switch(action.type) {
        case PROFILE_MENU_EDIT_SUCCESS:
            return { ...state, ...action.value, profileUpdateFailure: false, profileUpdateSuccess: true };
        case PROFILE_MENU_EDIT_FAILURE:
            return { ...state, profileUpdateSuccess: false, profileUpdateFailure: true };
        case CLEAR_PROFILE_UPDATE_STATUS:
            return { ...state, profileUpdateSuccess: false, profileUpdateFailure: false };
        case PROFILE_MENU_FETCH_SUCCESS:
            return { ...state, ...action.payload.profileInfo.data };
        default:
            return state
    }
}