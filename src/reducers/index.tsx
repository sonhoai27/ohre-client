import { combineReducers } from 'redux';
import reHome from "../modules/home/ReHome"
import reInit from "./init"
import reProduct from "../modules/Products/ReProduct"
export default combineReducers({
    reHome,
    reInit,
    reProduct
})