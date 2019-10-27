import { userConstants } from '../constants/user';

export default function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { isSubmitting: true };
        case userConstants.REGISTER_SUCCESS:
            return { regData: action.value };
        case userConstants.CLEAR_EXT_FORM_ERRORS:
            return { ...state };
        case userConstants.REGISTER_FAILURE:
            return { errors: action.errors };
        case userConstants.PASSWORD_RESET_SUCCESS:
            return { passwordResetSent: true };
        case userConstants.USERNAME_REMINDER_SUCCESS:
            return { usernameReminderSent: true };
        case userConstants.NEW_PASSWORD_CONFIRMED:
            return { passwordReset: action.value};
        case userConstants.SET_SHOW_REG_FORM:
            return { showRegistrationForm: action.value };
        default:
            return state
    }
}
