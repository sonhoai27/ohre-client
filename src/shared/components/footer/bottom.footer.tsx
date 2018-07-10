import * as React from 'react';
import {Link} from 'react-router-dom';

class BottomFooter extends React.Component{
    render(){
        return(
            <div className="footer">
                <div className="content-warpper one">
                    <div className="container">
                        <div className="row">
                            <ul className="list-custom">
                                <li>
                                    <a href="">Help</a>
                                </li>
                                <li>
                                    <a href="">Privacy</a>
                                </li>
                                <li>
                                    <a href="">About</a>
                                </li>
                                <li>
                                    <a href="">Contact</a>
                                </li>
                                <li>
                                    <Link to="./login">Login</Link>
                                </li>
                                <li>
                                    <a href="">API</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper" style={{marginTop: '64px'}}>
                    <div className="container">
                        <div className="row copyright">
                            <div className="col-sm-6">
                                <p>2018 © OHRE</p>
                            </div>
                            <div className="col-sm-6">
                                <ul className="list-custom list-social">
                                    <li>
                                        <a href="">
                                            <i className="la la-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className="la la-envelope-o"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className="la la-twitter"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BottomFooter