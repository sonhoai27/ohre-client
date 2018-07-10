import { combineReducers } from 'redux';
import reHome from "../modules/home/ReHome"
import reInit from "./init"
export default combineReducers({
    reHome,
    reInit
})