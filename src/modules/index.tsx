import * as React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from "./home/Home";
import PrivateRouter from '../configs/PrivateRouter';
import Profile from './profile/Profile';
import Login from './login/Login';
import ProductRouter from './Products/ProductRouter';
import SearchPage from './home/SearchPage';
import {connect} from 'react-redux';
import {reGetLocation, reLoginGuest} from '../reducers/init';
import {Storage} from '../utils/storage-util';
import axios from 'axios'
import { API } from '../const/API';
interface Props {
    reGetLocation:Function,
    reLoginGuest: Function,
    responseLocation: any
}

class Index extends React.Component <Props, {}>{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        axios.get(API+'auth/get-ip')
        .then(result => {
           this.props.reGetLocation(result.data.ip)
        })
        .catch(err=> {
            console.log(err)
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.responseLocation !== this.props.responseLocation){
            this.checkLoginGuest(nextProps.responseLocation);
        }
    }
    // ap dung cho ca GUEST la dang nhap bang email
    private checkLoginGuest = (location)=> {
        if(Storage.local.get('access_token') === undefined){
           this.props.reLoginGuest({
                user_IP: location.ip,
                user_browser_info: navigator.userAgent,
                user_location: location.region_name +', '+location.country_name,
                user_geolocation: location.latitude +'-'+location.longitude
           })
        }
    }
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about-us"/>
                    <Route path="/products" component={ProductRouter}/>
                    <Route path="/contact-us"/>
                    <Route path="/search/:keySearch" component={SearchPage}/>
                    <Route path="/share-product"/>
                    <Route path="/login" component={Login}/>
                    <PrivateRouter path="/my-profile" component={Profile}/>
                </Switch>
            </Router>
        );
    }
}
const mapStateToProps = storeState => ({
    responseLocation: storeState.reInit.responseLocation
});
const mapDispatchToProps = {
    reLoginGuest,
    reGetLocation
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
