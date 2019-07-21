import { SET_MENU_ITEM_INDEX } from '../constants/body'

const initialState = {
    selectedItemIndex: 0,
};

export default function profile(state = initialState, action) {

    switch(action.type) {
        case SET_MENU_ITEM_INDEX:
            return { ...state, selectedItemIndex: action.value };
        default:
            return state
    }
}
