import axios from 'axios'
import {API} from '../../const/API'
import {REQUEST,SUCCESS,FAILURE} from "../../utils/action-type-util"
import {Storage} from "../../utils/storage-util"
export const ACTION_TYPES = {
    API_LOGIN: 'ReHome/API_LOGIN',
    API_ALL_CATEGORY: 'ReHome/API_ALL_CATEGORY',
    API_SEARCH_PRODUCT: 'ReHome/API_SEARCH_PRODUCT',
    PAGINATION_PAGE: 'ReHome/PAGINATION_PAGE',
    CURRENT_PAGE: 'ReHome/CURRENT_PAGE',
    SORT_PRODUCT_BY_PRICE: 'ReHome/SORT_PRODUCT_BY_PRICE',
    API_RECOMMEND: 'ReHome/API_RECOMMEND',
    PAGINATION_RECOMMEND: 'ReHome/PAGINATION_RECOMMEND'
}

const initialState = {
    responseLogin: {},
    resAllCategory: [],
    resListProducts: [],
    resTempProductsForPagination: [],
    currentPage: 0,
    resRecommed: [],
    listTempRecommed: []
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

        // recommend
        case REQUEST(ACTION_TYPES.API_RECOMMEND): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_RECOMMEND): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_RECOMMEND): {
            return {
                ...state,
                resRecommed: action.payload.data
            }
        }

        case ACTION_TYPES.PAGINATION_PAGE: {
            return {
                ...state,
                resTempProductsForPagination: action.payload
            }
        }
        case ACTION_TYPES.CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload
            }
        }
        case ACTION_TYPES.SORT_PRODUCT_BY_PRICE: {
            return {
                ...state,
                resTempProductsForPagination: action.payload
            }
        }

        case ACTION_TYPES.PAGINATION_RECOMMEND: {
            return {
                ...state,
                listTempRecommed: action.payload
            }
        }
        default:
            return state;
    }
}

const API_LOGIN = API+"auth/login/"
const API_ALL_CATEGORY = API+"menu/child/"
const API_SEARCH_PRODUCT = API+"product/search/algorithm/"
const API_RECOMMEND = API+'collection/recommend/all/'
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

export const reRecommed = () => async dispatch => {
    const date = new Date()
    const result = await dispatch({
        type: ACTION_TYPES.API_RECOMMEND,
        payload: axios.post(API_RECOMMEND, {
            idUser: (Storage.local.get("access_token") ? Storage.local.get("access_token") : null),
            month: (date.getMonth() + 1),
            year: date.getFullYear()
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

export const reGetProductByPage = (page, list) => async dispatch => {
    await dispatch({
        type: ACTION_TYPES.CURRENT_PAGE,
        payload: page
    })
    let tempListProduct:any = [...[], ...list]
    tempListProduct = tempListProduct.splice(20*page,20)
    const result = await dispatch({
        type: ACTION_TYPES.PAGINATION_PAGE,
        payload: tempListProduct
    });
    return result;
}

export const reSortProductByPrice = (price, list) => async dispatch => {
    let tempListProduct:any = [...[], ...list]
    const result = await dispatch({
        type: ACTION_TYPES.SORT_PRODUCT_BY_PRICE,
        payload: tempListProduct.filter((e,i)=> {
            return (
                parseInt(e.product_price,10) <= price
            )
        })
    });
    return result;
}

export const rePaginationRecommend = (currentPage, list) => async dispatch => {
    let tempList:any = [...[], ...list]
    const result = await dispatch({
        type: ACTION_TYPES.PAGINATION_RECOMMEND,
        payload: tempList.splice(0, parseInt(currentPage, 10)*8)
    });
    return result;
}