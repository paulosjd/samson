import { userConstants } from '../constants/user';



export default function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { isSubmitting: true };
        case userConstants.REGISTER_SUCCESS:
            console.log(action.value)
            return {};
        case userConstants.REGISTER_FAILURE:
            console.log(action.errors)
            return {};
        default:
            return state
    }
}