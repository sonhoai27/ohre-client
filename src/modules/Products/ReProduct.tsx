import axios from 'axios'
import {API} from '../../const/API'
import {REQUEST,SUCCESS,FAILURE} from "../../utils/action-type-util"

export const ACTION_TYPES = {
    API_LOGIN: 'ReProduct/API_LOGIN',
    API_ALL_CATEGORY: 'ReProduct/API_ALL_CATEGORY',
    API_PRODUCT_DETAIL: 'ReProduct/API_PRODUCT_DETAIL',
    API_SIMILAR_PRODUCTS: 'ReProduct/API_SIMILAR_PRODUCTS',
    API_ALL_PRODUCTS: 'ReProduct/API_ALL_PRODUCTS'
}

const initialState = {
    responseLogin: {},
    resAllCategory: [],
    resProductDetail: {},
    resListSimilarProduct: [],
    resAllProducts: [],
    start: -1,
    count: 0
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
        // Product Detail
        case REQUEST(ACTION_TYPES.API_PRODUCT_DETAIL): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_PRODUCT_DETAIL): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_PRODUCT_DETAIL): {
            return {
                ...state,
                resProductDetail: action.payload.data
            }
        }

        // Similar Products
        case REQUEST(ACTION_TYPES.API_SIMILAR_PRODUCTS): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_SIMILAR_PRODUCTS): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_SIMILAR_PRODUCTS): {
            return {
                ...state,
                resListSimilarProduct: action.payload.data
            }
        }

        // All Products
        case REQUEST(ACTION_TYPES.API_ALL_PRODUCTS): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_ALL_PRODUCTS): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_ALL_PRODUCTS): {
            return {
                ...state,
                resAllProducts: action.payload.data
            }
        }
        default:
            return state;
    }
}

const API_LOGIN = API+"auth/login/"
const API_ALL_CATEGORY = API+"menu/child/"
const API_PRODUCT_DETAIL = API+"product/"
const API_SIMILAR_PRODUCTS = API+"product/similar-product/"
const API_ALL_PRODUCTS = API+"product/all/client/"

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
        }, {
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

export const reProductDetail = (productId) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_PRODUCT_DETAIL,
        payload: axios.get(API_PRODUCT_DETAIL+productId)
    });
    return result;
};

export const reSimilarProducts = (name, productId) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_SIMILAR_PRODUCTS,
        payload: axios.post(API_SIMILAR_PRODUCTS, {
            nameProduct: name,
            idProduct: productId
        })
    });
    return result;
};

export const reAllProducts = (config) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_ALL_PRODUCTS,
        payload: axios.post(API_ALL_PRODUCTS, config)
    });
    return result;
};
