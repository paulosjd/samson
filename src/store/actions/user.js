import axios from 'axios'
import { userConstants as constants } from '../../store/constants/user';
import { REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS, CLEAR_EXT_FORM_ERRORS } from "../constants/user";

export const loginSuccess = (user) => {
    return { type: constants.LOGIN_SUCCESS, user }
};

export const forgottenLogin = (field, email) => {
    const url = `http://127.0.0.1:8000/api/users/help/${field}`;
    return dispatch => {
        axios.post(url, JSON.stringify({email}), {headers: {"Content-Type": "application/json", }})
            .then(() => {dispatch({type: field === 'password' ? constants.PASSWORD_RESET_SUCCESS :
                    constants.USERNAME_REMINDER_SUCCESS})
            })
    }
};

export const passwordResetConfirm = (body) => {
    const url = 'http://127.0.0.1:8000/api/users/password-reset';
    return dispatch => {
        axios.post(url, JSON.stringify(body),{headers: {"Content-Type": "application/json", }})
            .then(() => dispatch({ type: constants.NEW_PASSWORD_CONFIRMED, value: 'Password has been reset'}))
            .catch(() => dispatch({ type: constants.NEW_PASSWORD_CONFIRMED, value: 'Reset link was invalid' }))
    }
};

export const regSubmitBegin = () => {
    return { type: REGISTER_REQUEST }
};

export const refreshRegistration = () => {
    return { type: CLEAR_EXT_FORM_ERRORS }
};

export const registrationSubmit = (data, loginFunc) => {
    const url = 'http://127.0.0.1:8000/api/users/registration';
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