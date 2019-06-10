import  { combineReducers } from "redux"
import auth from "./auth"
import profile from  "./profile"
import registration from  "./registration"


export default combineReducers({
    auth,
    profile,
    registration
});