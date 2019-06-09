import { FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, FETCH_SUMMARY_DATA_FAILURE, SET_USERNAME
} from "../constants/profile";

const initialState = {
    summaryItems: [],
    metricItems: [],
    loading: false,
    error: null,
    username: ''
};

export default function profile(state = initialState, action) {
    switch(action.type) {
        case FETCH_SUMMARY_DATA_BEGIN:
            return { ...state, loading: true, error: null};
        case FETCH_SUMMARY_DATA_SUCCESS:
            return { ...state, loading: false, summaryItems: action.payload.profileData};
        case FETCH_SUMMARY_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload.error};
        default:
            return state
    }
}