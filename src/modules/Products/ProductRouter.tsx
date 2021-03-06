import * as React from 'react';
import {Route} from 'react-router-dom';
import ProductCategory from './ProductCategory';
import ProductDetail from './ProductDetail';
import ProductGroup from './ProductGroup';

const ProductRouter = ({match} : { match: any}) => {
    return (
        <div>
            <Route exact path={`${match.url}`} component={ProductCategory}/>
            <Route path={`${match.url}/detail/:idProduct`} component={ProductDetail}/>
            <Route path={`${match.url}/category/all/:idCategory`} component={ProductCategory}/>
            <Route path={`${match.url}/category/brand/:idCategory/:idBrand`} component={ProductCategory}/>
            <Route path={`${match.url}/group/:idGroup`} component={ProductGroup}/>
        </div>
    )
}
export default ProductRouter