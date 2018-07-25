import axios from 'axios'
import {API} from '../const/API'
import {REQUEST, SUCCESS, FAILURE} from '../utils/action-type-util'
import { Storage } from './../utils/storage-util';
export const ACTION_TYPES = {
    API_LOGIN_WITH_GUEST: 'ReInit/API_LOGIN_WITH_GUEST',
    API_CHECK_TOKEN: 'ReInit/API_CHECK_TOKEN',
    API_GET_LOCATION: 'ReInit/API_GET_LOCATION',
    API_PUSH_ID_PRODUCT: 'ReInit/API_PUSH_ID_PRODUCT',
    API_PUSH_ID_BRAND: 'ReInit/API_PUSH_ID_BRAND',
    API_PUSH_ID_PRODUCT_SHOP: 'ReInit/API_PUSH_ID_PRODUCT_SHOP',
    API_HISTORY_PRODUCT: 'ReInit/API_HISTORY_PRODUCT',
    API_HISTORY_GROUP: 'ReInit/API_HISTORY_GROUP'
}

const initialState = {
    responseLogin: false,
    responseLocation: {},
    resListHistoryProduct: [],
    resListHistoryGroup: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.API_LOGIN_WITH_GUEST): {
            return {
                ...state,
                responseLogin: false
            }
        }
        case FAILURE(ACTION_TYPES.API_LOGIN_WITH_GUEST): {
            return {
                ...state,
                responseLogin: false
            }
        }
        case SUCCESS(ACTION_TYPES.API_LOGIN_WITH_GUEST): {
            return {
                ...state,
                responseLogin: true
            }
        }

        // check token
        case REQUEST(ACTION_TYPES.API_CHECK_TOKEN): {
            return {
                ...state,
                responseLogin: false
            }
        }
        case FAILURE(ACTION_TYPES.API_CHECK_TOKEN): {
            return {
                ...state,
                responseLogin: false
            }
        }
        case SUCCESS(ACTION_TYPES.API_CHECK_TOKEN): {
            return {
                ...state,
                responseLogin: true
            }
        }

        // get location
        case REQUEST(ACTION_TYPES.API_GET_LOCATION): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_GET_LOCATION): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GET_LOCATION): {
            return {
                ...state,
                responseLocation: action.payload.data
            }
        }

        // push id product, group
        case REQUEST(ACTION_TYPES.API_PUSH_ID_PRODUCT): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_PUSH_ID_PRODUCT): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_PUSH_ID_PRODUCT): {
            return {
                ...state
            }
        }

        // push id product shop
        case REQUEST(ACTION_TYPES.API_PUSH_ID_PRODUCT_SHOP): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_PUSH_ID_PRODUCT_SHOP): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_PUSH_ID_PRODUCT_SHOP): {
            return {
                ...state
            }
        }

        // push id brand
        case REQUEST(ACTION_TYPES.API_PUSH_ID_BRAND): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_PUSH_ID_BRAND): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_PUSH_ID_BRAND): {
            return {
                ...state
            }
        }

        // history product
        case REQUEST(ACTION_TYPES.API_HISTORY_PRODUCT): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_HISTORY_PRODUCT): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_HISTORY_PRODUCT): {
            return {
                ...state,
                resListHistoryProduct: action.payload.data
            }
        }

        // history group
        case REQUEST(ACTION_TYPES.API_HISTORY_GROUP): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_HISTORY_GROUP): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_HISTORY_GROUP): {
            return {
                ...state,
                resListHistoryGroup: action.payload.data
            }
        }
        default:
            return state;
    }
}

const API_LOGIN_WITH_GUEST = API + 'auth/register-guest-account/'
const GET_LOCATION = 'http://api.ipstack.com/';
const API_CHECK_TOKEN = API + 'auth/check-token/'
const API_PUSH_ID_BRAND = API+'collection/brand'
const API_PUSH_ID_PRODUCT = API+'collection/product'
const API_PUSH_ID_PRODUCT_SHOP = API+'collection/shop'
const API_HISTORY_GROUP = API+'collection/history/group/'
const API_HISTORY_PRODUCT = API+'collection/history/product/'

export const reLoginGuest = (formLogin) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_LOGIN_WITH_GUEST,
        payload: axios.post(API_LOGIN_WITH_GUEST, {
            ...formLogin
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    });
    if(result.value){
        Storage.local.set('access_token', result.value.data.access_token)
    }
    return result;
};

export const reGetLocation = (ip) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_GET_LOCATION,
        payload: axios.get(GET_LOCATION+ip+'?access_key=5912511bf081d0263bc7fb60d9c0f738')
    });
    return result;
};
export const reGetHistoryGroup = () => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_HISTORY_GROUP,
        payload: axios.post(API_HISTORY_GROUP, {
            idUser: Storage.local.get('access_token')
        })
    });
    return result;
};
export const reGetHistoryProduct = () => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_HISTORY_PRODUCT,
        payload: axios.post(API_HISTORY_PRODUCT,{
            idUser: Storage.local.get('access_token')
        })
    });
    return result;
};
export const reCheckToken = (token) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_CHECK_TOKEN,
        payload: axios.post(API_CHECK_TOKEN, {},{
                headers: {
                    'access_token': token
                }
            })
    })
    return result
}
export const rePushBrand = (form) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_PUSH_ID_BRAND,
        payload: axios.post(API_PUSH_ID_BRAND, form)
    })
    return result
}
export const rePushProduct = (form) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_PUSH_ID_PRODUCT,
        payload: axios.post(API_PUSH_ID_PRODUCT, form)
    })
    return result
}
export const rePushProductShop = (form) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_PUSH_ID_PRODUCT_SHOP,
        payload: axios.post(API_PUSH_ID_PRODUCT_SHOP, form)
    })
    return result
}