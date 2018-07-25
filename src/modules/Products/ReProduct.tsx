import axios from 'axios'
import {API} from '../../const/API'
import {REQUEST,SUCCESS,FAILURE} from "../../utils/action-type-util"

export const ACTION_TYPES = {
    API_LOGIN: 'ReProduct/API_LOGIN',
    API_ALL_CATEGORY: 'ReProduct/API_ALL_CATEGORY',
    API_PRODUCT_DETAIL: 'ReProduct/API_PRODUCT_DETAIL',
    API_SIMILAR_PRODUCTS: 'ReProduct/API_SIMILAR_PRODUCTS',
    API_ALL_PRODUCTS: 'ReProduct/API_ALL_PRODUCTS',
    API_DETAIL_GROUP: 'ReProduct/API_DETAIL_GROUP',
    API_GROUP_PRODUCTS: 'ReProduct/API_GROUP_PRODUCTS',
    TEMP_GROUP_PRODUCTS: 'ReProduct/TEMP_GROUP_PRODUCTS',
    SORT_PRICE_GROUP_PRODUCTS: 'ReProduct/SORT_PRICE_GROUP_PRODUCTS',
    SORT_PRICE_DETAIL_PRODUCTS: 'ReProduct/SORT_PRICE_DETAIL_PRODUCTS',
    CHANGE_START: 'ReProduct/CHANGE_START',
    API_CATEGORY_BRAND: 'ReProduct/API_CATEGORY_BRAND',
    PAGINATION_SIMILARPRODUCT: 'ReProduct/PAGINATION_SIMILARPRODUCT',
    API_RECOMMEND_BY_BRAND: 'ReProduct/RECOMMEND_BY_BRAND'
}

const initialState = {
    responseLogin: {},
    resAllCategory: [],
    resProductDetail: {},
    resListSimilarProduct: [],
    resAllProducts: [],
    start: -1,
    detailGroup: [],
    resListGroupProducts: [],
    listTempGrouProduct: [],
    resCategoryBrand: [],
    paginationSimilarProduct: [],
    resRecommendByBrand: []
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
        // recommend by brand
        case REQUEST(ACTION_TYPES.API_RECOMMEND_BY_BRAND): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_RECOMMEND_BY_BRAND): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_RECOMMEND_BY_BRAND): {
            return {
                ...state,
                resRecommendByBrand: action.payload.data
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

        // Detail Group
        case REQUEST(ACTION_TYPES.API_DETAIL_GROUP): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_DETAIL_GROUP): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_DETAIL_GROUP): {
            return {
                ...state,
                detailGroup: JSON.parse(action.payload.data)
            }
        }

        // Group Products
        case REQUEST(ACTION_TYPES.API_GROUP_PRODUCTS): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_GROUP_PRODUCTS): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_GROUP_PRODUCTS): {
            return {
                ...state,
                resListGroupProducts: JSON.parse(action.payload.data)
            }
        }

        case (ACTION_TYPES.TEMP_GROUP_PRODUCTS): {
            return {
                ...state,
                listTempGrouProduct: action.payload
            }
        }
        case (ACTION_TYPES.SORT_PRICE_GROUP_PRODUCTS): {
            return {
                ...state,
                resListGroupProducts: (action.payload).filter(element => element.product_price !== undefined)
            }
        }
        case (ACTION_TYPES.SORT_PRICE_DETAIL_PRODUCTS): {
            return {
                ...state,
                resListSimilarProduct: (action.payload).filter(element => element.product_price !== undefined)
            }
        }
        case (ACTION_TYPES.CHANGE_START): {
            return {
                ...state,
                start: action.payload
            }
        }

        case (ACTION_TYPES.PAGINATION_SIMILARPRODUCT): {
            return {
                ...state,
                paginationSimilarProduct: action.payload
            }
        }

        // Category brand
        case REQUEST(ACTION_TYPES.API_CATEGORY_BRAND): {
            return {
                ...state
            }
        }
        case FAILURE(ACTION_TYPES.API_CATEGORY_BRAND): {
            return {
                ...state
            }
        }
        case SUCCESS(ACTION_TYPES.API_CATEGORY_BRAND): {
            return {
                ...state,
                resCategoryBrand: action.payload.data
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
const API_DETAIL_GROUP = API+"product/group/detail/"
const API_GROUP_PRODUCTS = API+"product/group/product/"
const API_CATEGORY_BRAND = API+"menu/category-brand/"
const API_RECOMMEND_BY_BRAND = API+'collection/recommend/brand/'
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

export const reDetailGroup = (id) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_DETAIL_GROUP,
        payload: axios.get(API_DETAIL_GROUP+id)
    });
    return result;
};

export const reGroupProducts = (id) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_GROUP_PRODUCTS,
        payload: axios.get(API_GROUP_PRODUCTS+id)
    });
    return result;
};
export const reTempGroupProducts = (page, list) => async dispatch => {
    let tempListProduct:any = [...[], ...list]
    const result = await dispatch({
        type: ACTION_TYPES.TEMP_GROUP_PRODUCTS,
        payload: tempListProduct.splice(10*page,10)
    });
    return result;
};

export const reSortPriceGroupProducts = (type, list) => async dispatch => {
    // thap den cao
    if(type == 0){
        list.sort((a,b)=> {
            return a.product_price - b.product_price
        })
    }else {
        list.sort((a,b)=> b.product_price - a.product_price)
    }
    // cao den thap
    const result = await dispatch({
        type: ACTION_TYPES.SORT_PRICE_GROUP_PRODUCTS,
        payload: [...list, {}]
    });
    return result;
};
export const reSortPriceDetailProducts = (type, list) => async dispatch => {
    // thap den cao
    if(type == 0){
        list.sort((a,b)=> {
            return a.product_price - b.product_price
        })
    }else {
        list.sort((a,b)=> b.product_price - a.product_price)
    }
    // cao den thap
    const result = await dispatch({
        type: ACTION_TYPES.SORT_PRICE_DETAIL_PRODUCTS,
        payload: [...list, {}]
    });
    return result;
};
export const reChangeStart = (start) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CHANGE_START,
        payload: parseInt(start, 10)
    })
    return result
}

export const reCategoryBrand = (id) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_CATEGORY_BRAND,
        payload: axios.get(API_CATEGORY_BRAND+id)
    });
    return result;
};
export const rePaginationSimilarProduct = (currentPage, list) => async dispatch => {
    let tempList:any = [...[], ...list]
    const result = await dispatch({
        type: ACTION_TYPES.PAGINATION_SIMILARPRODUCT,
        payload: tempList.splice(0, parseInt(currentPage, 10)*8)
    });
    return result;
}

export const reRecommendByBrand = (idBrand) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.API_RECOMMEND_BY_BRAND,
        payload: axios.get(API_RECOMMEND_BY_BRAND+idBrand)
    });
    return result;
};