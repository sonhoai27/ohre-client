import {Redirect, Route} from 'react-router-dom';
import * as React from 'react';

const fakeAuth = true
const PrivateRouter = ({ component: Component, ...rest })=> {
    return (
        <Route {...rest} render={(props) => (
            fakeAuth
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}
export default PrivateRouter