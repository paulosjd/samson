import { SET_MENU_ITEM_INDEX } from '../constants/body'
import axios from "axios";

export const setMenuItemIndex = (value) => ({
    type: SET_MENU_ITEM_INDEX, value
});

