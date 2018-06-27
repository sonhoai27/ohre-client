import * as React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from "./home/Home";
const Index = ()=> {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about-us"/>
                <Route path="/contact-us"/>
                <Route path="/share-product"/>
            </Switch>
        </Router>
    );
}

export default Index;
