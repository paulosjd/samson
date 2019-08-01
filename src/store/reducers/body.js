import { SET_MENU_ITEM_INDEX, SET_FEAT_ITEM_INDEX, SET_EDIT_DATA_FLAG, SET_ADD_DATA_FLAG
} from '../constants/body'

const initialState = {
    selectedItemIndex: 0,
    selectedFeatIndex: 0,
    editData: false,
    addData: false,
};

export default function profile(state = initialState, action) {
    state = { ... state, editData: false, addData: false};
    switch(action.type) {
        case SET_MENU_ITEM_INDEX:
            return { ...state, selectedItemIndex: action.value };
        case SET_FEAT_ITEM_INDEX:
            return { ...state, selectedFeatIndex: action.value };
        case SET_EDIT_DATA_FLAG:
            return { ...state, editData: action.value };
        case SET_ADD_DATA_FLAG:
            return { ...state, addData: action.value };
        default:
            return state
    }
}
