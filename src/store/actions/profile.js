import { FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, FETCH_SUMMARY_DATA_FAILURE } from '../constants/profile'

export const fetchProfileSummaryBegin = () => ({
    type: FETCH_SUMMARY_DATA_BEGIN
});

export const fetchProfileSummary = (user_id) => {
    console.log(user_id);
    // TODO include JWT in header
    let url = `http://127.0.0.1:8000/api/profile/${user_id}/summary`;
    return dispatch => {
        fetch(url)
            .then(response => response.json())
            .then(profileData => {
                dispatch({ type: FETCH_SUMMARY_DATA_SUCCESS, payload: { profileData } });
            })
            .catch(error => {
                // Dispatch specific "some resources failed" if needed...
                dispatch({type: FETCH_SUMMARY_DATA_FAILURE, payload: { error }});
                // Dispatch the generic "global errors" action, this is what makes its way into state.errors
                // dispatch({type: ADD_ERROR, error: err});
            });
    }
};