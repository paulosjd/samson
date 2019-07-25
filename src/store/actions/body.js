import { SET_MENU_ITEM_INDEX, SET_FEAT_ITEM_INDEX, SET_EDIT_DATA_FLAG } from '../constants/body'
import axios from "axios";

export const setMenuItemIndex = (value) => ({
    type: SET_MENU_ITEM_INDEX, value
});

export const setFeatItemIndex = (value) => ({
    type: SET_FEAT_ITEM_INDEX, value
});

export const setEditDataFlag = (value) => ({
    type: SET_EDIT_DATA_FLAG, value
});
