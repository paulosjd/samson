import axios from 'axios'
import { userConstants } from '../../store/constants/user';
import { REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS, CLEAR_EXT_FORM_ERRORS } from "../constants/user";

export const loginSuccess = (user) => {
    return { type: userConstants.LOGIN_SUCCESS, user }
};

export const regSubmitBegin = () => {
    return { type: REGISTER_REQUEST }
};

export const refreshRegistration = () => {
    return { type: CLEAR_EXT_FORM_ERRORS }
};

export const registrationSubmit = (data, loginFunc) => {
    let url = 'http://127.0.0.1:8000/api/users/registration';
    return dispatch => {
        axios.post(url, JSON.stringify(data), {headers: {"Content-Type": "application/json", }})
            .then(value => {
                dispatch({ type: REGISTER_SUCCESS, value });
                loginFunc()
            })
            .catch(errors => {
                if (errors.response.status === 400) {
                    dispatch({ type: REGISTER_FAILURE, errors: errors.response.data.errors });
                } else {
                    dispatch({ type: REGISTER_FAILURE, errors: {miscError: true} })
                }
            });
    }
};