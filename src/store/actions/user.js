import axios from 'axios'
import { userConstants } from '../../store/constants/user';
import { REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS } from "../constants/user";

export const loginSuccess = (user) => {
    return { type: userConstants.LOGIN_SUCCESS, user }
};

export const registrationSubmitBegin = () => {
    return { type: REGISTER_REQUEST };
};

export const registrationSubmit = (data) => {
    let url = 'http://127.0.0.1:8000/api/users/registration';
    return dispatch => {
        axios.post(url, JSON.stringify(data), {headers: {"Content-Type": "application/json", }})
            .then(response => response.json())
            .then(value => {
                console.log(value)
                dispatch({ type: REGISTER_SUCCESS, value });
                // redirect to main app
            })
            .catch(errors => {
                console.log(errors)
                // Dispatch specific "some resources failed" if needed...
                dispatch({ type: REGISTER_FAILURE, errors });
                // Dispatch the generic "global errors" action, this is what makes its way into state.errors
                // dispatch({type: ADD_ERROR, error: err});
            });
    }
};



// function login(username, password) {
//     return dispatch => {
//         dispatch(request({ username }));
//
//         userService.login(username, password)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     history.push('/');
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
//
//     function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
//     function success(user) { return { type: userConstants.LOGIN_SUCCESS, user  } }
//     function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
// }
//
//
//
// function logout() {
//     userService.logout();
//     return { type: userConstants.LOGOUT };
// }
//
// function register(user) {
//     return dispatch => {
//         dispatch(request(user));
//
//         userService.register(user)
//             .then(
//                 user => {
//                     dispatch(success());
//                     // history.push('/login');
//                     dispatch(alertActions.success('Registration successful'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
//
//     function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }
//
// function getAll() {
//     return dispatch => {
//         dispatch(request());
//
//         userService.getAll()
//             .then(
//                 users => dispatch(success(users)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };
//
//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }
//
// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));
//
//         userService.delete(id)
//             .then(
//                 user => dispatch(success(id)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };
//
//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }