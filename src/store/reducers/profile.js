import {
    FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, FETCH_SUMMARY_DATA_FAILURE, SUBMIT_CSV_LOAD_SUCCESS,
    SUBMIT_CSV_LOAD_FAILURE, CSV_LOAD_CONFIRM, CSV_LOAD_CLEAR, CLEAR_CSV_LOAD_CONFIRM, DATA_POINTS_REFRESH,
    ADD_BLANK_PARAM
} from "../constants/profile";


const initialState = {
    summaryItems: [],
    allParams: [],
    blankParams: [],
    dateFormats: [],
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
            console.log(action.payload.profileData.data.datapoints)
            return {
                ...state,
                loading: false,
                summaryItems: action.payload.profileData.data.profile_summary.map(obj => {
                    return {
                        parameter: {
                        ...obj.parameter, unit_name: obj.parameter.unit_name, unit_symbol: obj.parameter.unit_symbol
                        },
                        data_point: obj.data_point}
                }),
                allParams: action.payload.profileData.data.all_params,
                dateFormats: action.payload.profileData.data.date_formats,
                dataPoints: action.payload.profileData.data.datapoints,
                blankParams: action.payload.profileData.data.blank_params,
            };
        case ADD_BLANK_PARAM:
            let blankParams = [ ...state.blankParams ];
            if (!blankParams.includes(action.value.data)) {
                blankParams.push(action.value.data);
            }
            return { ...state, blankParams };
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
        default:
            return state
    }
}
