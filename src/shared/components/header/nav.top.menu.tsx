import * as React from 'react'
import { Link,NavLink } from 'react-router-dom';

interface Props {
    isShowing: boolean
}
class NavTopMenu extends React.Component<Props, {}> {
    render() {
        return (
            <nav className="custom-header header-navbar navbar-expand-sm navbar navbar-with-menu navbar-light fixed-top border-lighten-2">
                <div className="navbar-wrapper">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-sm-8 main">
                                <div className="row">
                                    <div className="col-3 item">
                                        <Link to="/" className="logo">
                                            <img src="../../../assets/images/ohre.png" width="15%" alt="branding logo" />
                                            <h3 className="brand-text white">oHRe</h3>
                                        </Link>
                                    </div>
                                    <div className="col-3 item">
                                        <NavLink className="nav-link white" activeClassName="active" exact to="/products">Tất cả sản phẩm</NavLink>
                                    </div>
                                    <div className="col-6 item" style={{display: (this.props.isShowing ? 'flex' :'none')}}>
                                        <div className="fast-search">
                                            <div className="content-search">
                                                <input type="text" name="input-main-search"
                                                    placeholder="Bạn muốn tìm gì"
                                                    className="form-control"
                                                    style={
                                                        {
                                                            padding: 15,
                                                            borderRadius: '4px',
                                                            border: 'unset'
                                                        }
                                                    } />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 about">
                                <a className="nav-link white" href="#">Về OHre</a>
                                <a className="nav-link white" href="#">Liên hệ</a>
                                <a className="nav-link white" href="#">Gợi ý sản phẩm</a>
                            </div>
                        </div>
                    </div>
                    {/* <div className="navbar-header expanded" style={{ display: 'block', zIndex: 100 }}>
                        <ul className="nav navbar-nav mr-auto">
                            <li className="nav-item mobile-menu d-md-none float-left">
                                <button className="nav-link menu-toggle hamburger hamburger--arrow js-hamburger is-active">
                                    <span className="hamburger-box"></span>
                                    <span className="hamburger-inner"></span>
                                </button>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="navbar-brand nav-link">
                                    <img src="../../../assets/images/ohre.png" width="15%" alt="branding logo" />
                                    <h3 className="brand-text white">oHRe</h3>
                                </Link>
                            </li>
                            <li className="nav-item d-md-none float-right"><a data-toggle="collapse" data-target="#navbar-mobile10"
                                className="nav-link open-navbar-container"><i
                                    className="la la-ellipsis-h pe-2x icon-rotate-right"></i></a></li>
                        </ul>
                    </div> */}
                    {/* <div className="navbar-container content">
                        <div id="navbar-mobile10" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav mr-auto">
                                <li className="nav-item"><NavLink className="nav-link white" activeClassName="active" exact to="/">Home</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link white" activeClassName="active" exact to="/products">Tất cả sản phẩm</NavLink></li>
                                <li className="nav-item nav-search"><a className="nav-link nav-link-search" href="#">
                                    <i className="ficon ft-search white"></i></a>
                                    <div className="search-input">
                                        <input className="input" type="text" placeholder="Explore Modern..." />
                                    </div>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav float-right">
                            </ul>
                        </div>
                    </div> */}
                </div>
            </nav>
        )
    }
}
export default NavTopMenu