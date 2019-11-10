import { SET_MENU_ITEM_INDEX, SET_FEAT_ITEM_INDEX, SET_EDIT_DATA_FLAG, SET_ADD_DATA_FLAG, EDIT_DATA_FAILURE,
    CLEAR_EDIT_DATA_FAILURE, SET_SHOW_ADD_METRIC, SET_SHOW_ADD_QUALIFIER, SET_EDIT_TARGET_FLAG, SET_EDIT_TARGET2_FLAG,
    APPEND_EDITED_DP_PARAMS, RESET_SELECTED_ITEM_INDEX, RESET_CHART_SELECTION, SET_SHOW_ROLLING_MEANS,
    SET_SHOW_ADD_CUSTOM_METRIC, SET_METRIC_ADD_FORM_HAS_VALUE, SET_SHOW_MEAN, SET_SHOW_MONTHLY_DIFFS,
    SET_SHOW_ADD_LINKED_PARAM
} from '../constants/body'

const initialState = {
    username: action.user.username,
};

export default function profile(state = initialState, action) {
    switch(action.type) {
        case 'gjfjgjh':
            return { ...state, selectedItemIndex: 0, selectedFeatIndex: 0 };
        case 'ghghj':
            return { ...initialState };
        default:
            return state
    }
}
