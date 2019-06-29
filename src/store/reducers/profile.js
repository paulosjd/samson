import {
    FETCH_SUMMARY_DATA_BEGIN,
    FETCH_SUMMARY_DATA_SUCCESS,
    FETCH_SUMMARY_DATA_FAILURE,
    SUBMIT_CSV_UPLOAD_SUCCESS,
    SUBMIT_CSV_UPLOAD_FAILURE,
    CSV_UPLOAD_CONFIRM,
    CSV_UPLOAD_CLEAR,

} from "../constants/profile";

const initialState = {
    summaryItems: [],
    loading: false,
    error: null,
    username: '',
    uploadData: {},
    uploadError: null,
};

export default function profile(state = initialState, action) {

    switch(action.type) {
        case FETCH_SUMMARY_DATA_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_SUMMARY_DATA_SUCCESS:
            return { ...state, loading: false, summaryItems: action.payload.profileData.data };
        case FETCH_SUMMARY_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        case SUBMIT_CSV_UPLOAD_SUCCESS:
            return { ...state, uploadData: action.value.data };
        case SUBMIT_CSV_UPLOAD_FAILURE:
            return { ...state, loading: false, uploadError: action.payload.response.data.error };
        case CSV_UPLOAD_CONFIRM:
            return { ...state, uploadData: action.value.data };
        case CSV_UPLOAD_CLEAR:
            return { ...state, uploadData: {}, uploadError: null };

        default:
            return state
    }
}
