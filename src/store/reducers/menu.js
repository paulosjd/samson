import {
    SHOW_PROFILE_MENU, SHOW_INTERVENTIONS_MENU, SHOW_CSV_DOWNLOAD_MENU, SHOW_CSV_UPLOAD_MENU,
} from "../constants/profile";

const initialState = {
    showProfileMenu: false,
    showCsvDownloadMenu: false,
    showCsvUploadMenu: false,
    showInterventionsMenu: false,
};

export default function menu(state = initialState, action) {
    switch(action.type) {
        case SHOW_CSV_DOWNLOAD_MENU:
            return { ...initialState, showCsvDownloadMenu: action.value };
        case SHOW_CSV_UPLOAD_MENU:
            return { ...initialState, showCsvUploadMenu: action.value };
        case SHOW_PROFILE_MENU:
            return { ...initialState, showProfileMenu: action.value };
        case SHOW_INTERVENTIONS_MENU:
            return { ...initialState, showInterventionsMenu: action.value };
        default:
            return state
    }
}