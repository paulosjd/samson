import { SET_MENU_ITEM_INDEX, SET_FEAT_ITEM_INDEX, SET_EDIT_DATA_FLAG, SET_ADD_DATA_FLAG, EDIT_DATA_FAILURE,
    CLEAR_EDIT_DATA_FAILURE, SET_SHOW_ADD_METRIC, SET_SHOW_ADD_QUALIFIER, SET_EDIT_TARGET_FLAG, SET_EDIT_TARGET2_FLAG,
    APPEND_EDITED_DP_PARAMS, RESET_SELECTED_ITEM_INDEX, RESET_CHART_SELECTION, SET_SHOW_ROLLING_MEANS,
    SET_SHOW_ADD_CUSTOM_METRIC, SET_METRIC_ADD_FORM_HAS_VALUE, SET_SHOW_MEAN,
} from '../constants/body'

const initialState = {
    selectedItemIndex: 0,
    selectedFeatIndex: 0,
    editData: false,
    addData: false,
    editTarget: false,
    editTarget2: false,
    editDataError: null,
    showAddMetric: false,
    showAddCustomMetric: false,
    showAddQualifier: false,
    editedDataPointParams: [],
    showRollingMeans: false,
    showMean: false,
    metricAddFormHasValue: false,
};

export default function profile(state = initialState, action) {
    state = { ...state, editData: false, addData: false, editDataError: null} ;
    switch(action.type) {
        case RESET_SELECTED_ITEM_INDEX:
            return { ...state, selectedItemIndex: 0, selectedFeatIndex: 0 };
        case RESET_CHART_SELECTION:
            return { ...state, showRollingMeans: false };
        case SET_SHOW_ROLLING_MEANS:
            return { ...state, showRollingMeans: action.value, showMean: false };
        case SET_SHOW_MEAN:
            return { ...state, showMean: action.value, showRollingMeans: false };
        case SET_MENU_ITEM_INDEX:
            return { ...state, selectedItemIndex: action.value };
        case SET_FEAT_ITEM_INDEX:
            return { ...state, selectedFeatIndex: action.value };
        case SET_EDIT_DATA_FLAG:
            return { ...state, editData: action.value, editDataError: null };
        case SET_EDIT_TARGET_FLAG:
            return { ...state, editTarget: action.value };
        case SET_EDIT_TARGET2_FLAG:
            return { ...state, editTarget2: action.value };
        case SET_ADD_DATA_FLAG:
            return { ...state, addData: action.value, editDataError: null };
        case EDIT_DATA_FAILURE:
            return { ...state, loadError: action.payload.response.data.error, editData: true };
        case CLEAR_EDIT_DATA_FAILURE:
            return { ...state, loadError: null };
        case SET_SHOW_ADD_METRIC:
            return { ...state, showAddMetric: action.value };
        case SET_SHOW_ADD_CUSTOM_METRIC:
            return { ...state, showAddCustomMetric: action.value };
        case SET_METRIC_ADD_FORM_HAS_VALUE:
            return { ...state, metricAddFormHasValue: action.value };
        case SET_SHOW_ADD_QUALIFIER:
            return { ...state, showAddQualifier: action.value };
        case APPEND_EDITED_DP_PARAMS:
            const newArray = [...state.editedDataPointParams, action.value];
            return { ...state, editedDataPointParams: newArray };
        default:
            return state
    }
}
