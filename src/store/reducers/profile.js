import { FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, FETCH_SUMMARY_DATA_FAILURE, SHOW_PROFILE_MENU,
    PROFILE_MENU_EDIT_SUCCESS, PROFILE_MENU_FETCH_SUCCESS
} from "../constants/profile";

const initialState = {
    summaryItems: [],
    metricItems: [],
    loading: false,
    error: null,
    username: '',
    showProfileMenu: false,
    birthYear: '',
    gender: '',
};

export default function profile(state = initialState, action) {
    switch(action.type) {
        case FETCH_SUMMARY_DATA_BEGIN:
            return { ...state, loading: true, error: null};
        case FETCH_SUMMARY_DATA_SUCCESS:
            return { ...state, loading: false, summaryItems: action.payload.profileData.data};
        case FETCH_SUMMARY_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload.error};
        case SHOW_PROFILE_MENU:
            return { ...state, showProfileMenu: action.value };
        case PROFILE_MENU_FETCH_SUCCESS:
            return { ...state, ...action.payload.profileInfo.data }
        case PROFILE_MENU_EDIT_SUCCESS:
            return { ...state, ...action.value  };
        default:
            return state
    }
}