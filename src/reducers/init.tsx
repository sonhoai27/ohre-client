import axios from 'axios'
import {API} from '../const/API'
import {REQUEST, SUCCESS, FAILURE} from '../utils/action-type-util'
import { Storage } from './../utils/storage-util';
export const ACTION_TYPES = {
    API_LOGIN_WITH_GUEST: 'ReInit/API_LOGIN_WITH_GUEST',
    API_CHECK_TOKEN: 'ReInit/API_CHECK_TOKEN',
    API_GET_LOCATION: 'ReInit/API_GET_LOCATION'
}

const initialState = {
    responseLogin: false,
    responseLocation: {}
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
        default:
            return state;
    }
}

const API_LOGIN_WITH_GUEST = API + 'auth/register-guest-account/'
const GET_LOCATION = 'http://api.ipstack.com/';
const API_CHECK_TOKEN = API + 'auth//check-token/'

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