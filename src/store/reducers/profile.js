import { FETCH_PROFILE_DATA_BEGIN, FETCH_PROFILE_DATA_SUCCESS, FETCH_PROFILE_DATA_FAILURE} from "../actions/profile";

const initialState = {
    summaryItems: [],
    metricItems: [],
    loading: false,
    error: null
}

export default function profileReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PROFILE_DATA_BEGIN:
            return { ...state, loading: true, error: null};
        case FETCH_PROFILE_DATA_SUCCESS:
            return { ...state, loading: false, summaryItems: [
                {body_weight: '65.5 kg', date: '19th Jan 2019'}, {blood_pressure: '65.5 kg', date: '19th Jan 2019'}]
            }
        case FETCH_PROFILE_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload.error}
        default:
            return state
    }
}