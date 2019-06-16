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
        case userConstants.PASSWORD_RESET_SUCCESS:
            return { passwordResetSent: true };
        case userConstants.USERNAME_REMINDER_SUCCESS:
            return { usernameReminderSent: true };
        case userConstants.NEW_PASSWORD_CONFIRMED:
            return { passwordReset: action.value};
        default:
            return state
    }
}

function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case userConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case userConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case userConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}