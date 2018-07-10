import * as React from 'react';
import {Route, Switch} from 'react-router';
import ProductCategory from './ProductCategory';

const Router = ()=> {
    return (
        <Switch>
            <Route path="/" component={ProductCategory}/>
        </Switch>
    )
}

export default Router