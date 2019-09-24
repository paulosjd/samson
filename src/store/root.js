import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth"
import body from "./reducers/body"
import extras from "./reducers/profile_extras"
import menu from "./reducers/menu"
import profile from  "./reducers/profile"
import registration from  "./reducers/registration"
import { USER_LOGOUT } from "./constants/user"

const appReducer = combineReducers({
    auth,
    body,
    extras,
    menu,
    profile,
    registration
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined
    }
    return appReducer(state, action)
};

export const root = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
