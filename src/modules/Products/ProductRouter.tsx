import * as React from 'react';
import {Route} from 'react-router-dom';
import ProductCategory from './ProductCategory';
import ProductDetail from './ProductDetail';

const ProductRouter = ({match} : { match: any}) => {
    console.log(match)
    return (
        <div>
            <Route exact path={`${match.url}`} component={ProductCategory}/>
            <Route path={`${match.url}/detail`} component={ProductDetail}/>
        </div>
    )
}
export default ProductRouter