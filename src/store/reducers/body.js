import { SET_MENU_ITEM_INDEX, SET_FEAT_ITEM_INDEX, SET_EDIT_DATA_FLAG, SET_ADD_DATA_FLAG, EDIT_DATA_FAILURE,
    CLEAR_EDIT_DATA_FAILURE, SET_SHOW_ADD_METRIC, SET_SHOW_ADD_QUALIFIER, SET_EDIT_TARGET_FLAG, SET_EDIT_TARGET2_FLAG,
    APPEND_EDITED_DP_PARAMS, RESET_SELECTED_ITEM_INDEX
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
    showAddQualifier: false,
    editedDataPointParams: []
};

export default function profile(state = initialState, action) {
    state = { ...state, editData: false, addData: false, editDataError: null};
    switch(action.type) {
        case RESET_SELECTED_ITEM_INDEX:
            return { ...state, selectedItemIndex: 0, selectedFeatIndex: 0};
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
        case SET_SHOW_ADD_QUALIFIER:
            return { ...state, showAddQualifier: action.value };
        case APPEND_EDITED_DP_PARAMS:
            const newArray = [...state.editedDataPointParams, action.value];
            return { ...state, editedDataPointParams: newArray };
        default:
            return state
    }
}
