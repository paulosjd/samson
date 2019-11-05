import {
    SHOW_PROFILE_MENU, SHOW_INTERVENTIONS_MENU, SHOW_CSV_DOWNLOAD_MENU, SHOW_CSV_UPLOAD_MENU, SHOW_LINKED_PARAMS_MENU,
    SHOW_PROFILE_SHARES_MENU, PROFILE_SEARCH_RESULTS
} from "../constants/profile";

const initialState = {
    showProfileMenu: false,
    showCsvDownloadMenu: false,
    showCsvUploadMenu: false,
    showColorSchemeMenu: false,
    showLinkedParamsMenu: false,
    showProfileSharesMenu: false,
    profileSearchMatches: []
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
            return { ...initialState, showColorSchemeMenu: action.value };
        case SHOW_LINKED_PARAMS_MENU:
            return { ...initialState, showLinkedParamsMenu: action.value };
        case SHOW_PROFILE_SHARES_MENU:
            return { ...initialState, showProfileSharesMenu: action.value };
        case PROFILE_SEARCH_RESULTS:
            console.log(action.payload)
            return { ...initialState, profileSearchMatches: action.payload };
        default:
            return state
    }
}