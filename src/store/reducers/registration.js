import { userConstants } from '../constants/user';

export default function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { isSubmitting: true };
        case userConstants.REGISTER_SUCCESS:
            return { regData: action.value };
        case userConstants.CLEAR_EXT_FORM_ERRORS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return { errors: action.errors };
        default:
            return state
    }
}