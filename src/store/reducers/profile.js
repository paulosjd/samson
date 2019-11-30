import {
    FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, FETCH_SUMMARY_DATA_FAILURE, SUBMIT_CSV_LOAD_SUCCESS,
    SUBMIT_CSV_LOAD_FAILURE, CSV_LOAD_CONFIRM, CSV_LOAD_CLEAR, CLEAR_CSV_LOAD_CONFIRM, DATA_POINTS_REFRESH,
    TARGETS_DATA_REFRESH, UNIT_INFO_REFRESH, POST_CUSTOM_PARAM_FAILURE, UPDATE_BOOKMARKS, UPDATE_LINKED_PARAMS,
    SHARE_VIEW_EXTRAS, REPORT_DOWNLOAD_SCHEDULE_FAILURE, REPORT_DOWNLOAD_SCHEDULE_SUCCESS
} from "../constants/profile";

const initialState = {
    summaryItems: [],
    allParams: [],
    blankParams: [],
    dateFormats: [],
    unitInfo: [],
    rollingMeans: [],
    monthlyChanges: [],
    bookmarks: [],
    linkedParams: [],
    loading: false,
    error: null,
    username: '',
    uploadData: {},
    loadError: null,
    uploadFilename: '',
    showCsvLoadSuccess: false,
    isShareView: false,
    reportDownloadFail: false,
    reportDownloadSuccess: false,
    reportTaskId: '',

    isFetching: false,
    items:[],
    error2:{}
};

const initialShareViewState = {
    shareViewUsername: '',
};

export default function profile(state = initialState, action) {
    switch(action.type) {
        case FETCH_SUMMARY_DATA_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_SUMMARY_DATA_SUCCESS:
            const profileData = action.payload.profileData.data;
            return {
                ...state,
                ...initialShareViewState,
                loading: false,
                loadError: false,
                allParams: profileData.all_params,
                dateFormats: profileData.date_formats,
                dataPoints: profileData.datapoints,
                blankParams: profileData.blank_params,
                linkedParams: profileData.linked_parameters,
                unitInfo: profileData.unit_info,
                ideals: profileData.ideals,
                rollingMeans: profileData.rolling_means,
                monthlyChanges: profileData.monthly_changes,
                bookmarks: profileData.bookmarks,
                isShareView: profileData.is_shared_view,
                summaryItems: summaryItemsFromPayload(profileData.profile_summary),
            };
        case SHARE_VIEW_EXTRAS:
            return {
                ...state,
                shareViewUsername: action.payload.data.share_view_username
            };
        case UPDATE_BOOKMARKS:
            return {...state, bookmarks: action.payload.bookmarksData.data};
        case UPDATE_LINKED_PARAMS:
            return {...state, linkedParams: action.payload.payload.data.linked_parameters};
        case TARGETS_DATA_REFRESH:
            return {...state, ideals: action.payload.targetsData.data};
        case UNIT_INFO_REFRESH:
            return { ...state, unitInfo: action.payload.unitInfoData.data };
        case DATA_POINTS_REFRESH:
            const data = action.payload.profileData.data;
            return {
                ...state,
                dataPoints: data.all_data,
                rollingMeans: data.rolling_means,
                monthlyChanges: data.monthly_changes
            };
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
        case REPORT_DOWNLOAD_SCHEDULE_FAILURE:
            return { ...state, reportDownloadFail: action.value };
        case REPORT_DOWNLOAD_SCHEDULE_SUCCESS:
            const newState = { ...state, reportDownloadSuccess: action.value };
            if (action.value) {
                newState.reportTaskId = action.task_id
            }
            return newState;
        case 'FETCH_JOKE':
            return {...state, isFetching:true};
        case 'FETCH_JOKE_SUCCESS':
            return {...state, isFetching:false, items:action.data};
        case 'FETCH_JOKE_FAILURE':
            return {...state, isFetching:false, error:action.data};

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
    }).sort((a,b) => {
        if (a.parameter.name < b.parameter.name) return -1;
        if (a.parameter.name > b.parameter.name) return 1;
        return 0;
    })
};