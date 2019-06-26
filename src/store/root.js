import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth"
import extras from "./reducers/profile_extras"
import menu from "./reducers/menu"
import profile from  "./reducers/profile"
import registration from  "./reducers/registration"

const rootReducer = combineReducers({
    auth,
    extras,
    menu,
    profile,
    registration
});

export const root = createStore(
    rootReducer,
    applyMiddleware(thunk)
);