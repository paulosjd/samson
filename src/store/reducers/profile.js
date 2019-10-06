import {
    FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, FETCH_SUMMARY_DATA_FAILURE, SUBMIT_CSV_LOAD_SUCCESS,
    SUBMIT_CSV_LOAD_FAILURE, CSV_LOAD_CONFIRM, CSV_LOAD_CLEAR, CLEAR_CSV_LOAD_CONFIRM, DATA_POINTS_REFRESH,
    TARGETS_DATA_REFRESH, UNIT_INFO_REFRESH, POST_CUSTOM_PARAM_FAILURE, UPDATE_BOOKMARKS
} from "../constants/profile";

const initialState = {
    summaryItems: [],
    allParams: [],
    blankParams: [],
    dateFormats: [],
    unitInfo: [],
    rollingMeans: [],
    bookmarks: [],
    loading: false,
    error: null,
    username: '',
    uploadData: {},
    loadError: null,
    uploadFilename: '',
    showCsvLoadSuccess: false,
};

export default function profile(state = initialState, action) {
    switch(action.type) {
        case FETCH_SUMMARY_DATA_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_SUMMARY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                loadError: false,
                summaryItems: summaryItemsFromPayload(action.payload.profileData.data.profile_summary),
                allParams: action.payload.profileData.data.all_params,
                dateFormats: action.payload.profileData.data.date_formats,
                dataPoints: action.payload.profileData.data.datapoints,
                blankParams: action.payload.profileData.data.blank_params,
                unitInfo: action.payload.profileData.data.unit_info,
                ideals: action.payload.profileData.data.ideals,
                rollingMeans: action.payload.profileData.data.rolling_means,
                bookmarks: action.payload.profileData.data.bookmarks,
        };
        case UPDATE_BOOKMARKS:
            return {...state, bookmarks: action.payload.bookmarksData.data};
        case TARGETS_DATA_REFRESH:
            return {...state, ideals: action.payload.targetsData.data};
        case UNIT_INFO_REFRESH:
            return { ...state, unitInfo: action.payload.unitInfoData.data };
        case DATA_POINTS_REFRESH:
            return { ...state, dataPoints: action.payload.profileData.data };
        case FETCH_SUMMARY_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        case SUBMIT_CSV_LOAD_SUCCESS:
            return { ...state, loadError: null, uploadData: action.value.data };
        case SUBMIT_CSV_LOAD_FAILURE:
            return { ...state, loading: false, loadError: action.payload.response.data.error };
        case CSV_LOAD_CONFIRM:
            return { ...state, uploadData: {}, showCsvLoadSuccess: true };
        case CLEAR_CSV_LOAD_CONFIRM:
            return { ...state, showCsvLoadSuccess: false, loadError: null };
        case CSV_LOAD_CLEAR:
            return { ...state, uploadData: {}, uploadFilename: '', loadError: null};
        case POST_CUSTOM_PARAM_FAILURE:
            return { ...state, loadError: action.payload.response.data.error };
        default:
            return state
    }
}

const summaryItemsFromPayload = (summary_data) => {
    return summary_data.map(obj => {
        return {
            parameter: {
                ...obj.parameter, unit_name: obj.parameter.unit_name, unit_symbol: obj.parameter.unit_symbol
            },
            data_point: obj.data_point}
    })
};