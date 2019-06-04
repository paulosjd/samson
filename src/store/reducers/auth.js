import { userConstants } from '../constants/user';

export default function authentication(state = {}, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                username: action.user.username,
                user_id: action.user.user_id
            };
        default:
            return state
    }
}