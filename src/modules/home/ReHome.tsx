import axios from 'axios'
import {API} from '../../const/API'
import {REQUEST,SUCCESS,FAILURE} from "../../utils/action-type-util"

export const ACTION_TYPES = {
    API_LOGIN: 'ReHome/API_LOGIN',
    API_ALL_CATEGORY: 'ReHome/API_ALL_CATEGORY',
    API_SEARCH_PRODUCT: 'ReHome/API_SEARCH_PRODUCT'
}

const initialState = {
    responseLogin: {},
    resAllCategory: [],
    resListProducts: []
}

export default (state = initialState, action) => {
    switch (action.type){
        case REQUEST(ACTION_TYPES.API_LOGIN): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_LOGIN): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_LOGIN): {
            return {
                ...state,
                responseLogin: action.payload.data
            }
        }
        // All Category
        case REQUEST(ACTION_TYPES.API_ALL_CATEGORY): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_ALL_CATEGORY): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_ALL_CATEGORY): {
            return {
                ...state,
                resAllCategory: JSON.parse(action.payload.data)
            }
        }
        // list search
        case REQUEST(ACTION_TYPES.API_SEARCH_PRODUCT): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_SEARCH_PRODUCT): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_SEARCH_PRODUCT): {
            return {
                ...state,
                resListProducts: action.payload.data
            }
        }
        default:
            return state;
    }
}

const API_LOGIN = API+"auth/login/"
const API_ALL_CATEGORY = API+"menu/child/"
const API_SEARCH_PRODUCT = API+"product/search/algorithm/"

export const reLogin = (formLogin) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_LOGIN,
        payload: axios.post(API_LOGIN, {
            password: formLogin.password,
            email: formLogin.email,
            ip: '192.168.0.153',
            location: 'Ho Chi Minh City, Vietnam',
            geolocation: '21.0333-105.85',
            browser: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        })
    });
    return result;
};

export const reAllCategory = () => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_ALL_CATEGORY,
        payload: axios.get(API_ALL_CATEGORY)
    });
    return result;
};

export const reSearchProduct = (keySearch) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_SEARCH_PRODUCT,
        payload: axios.get(API_SEARCH_PRODUCT+keySearch)
    });
    return result;
}