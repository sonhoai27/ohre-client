import * as React from 'react'

class NavTopMenu extends React.Component{
    render(){
        return (
            <nav className="header-navbar navbar-expand-sm navbar navbar-with-menu navbar-light navbar-shadow border-grey border-lighten-2">
                <div className="navbar-wrapper">
                    <div className="navbar-header expanded">
                        <ul className="nav navbar-nav mr-auto">
                            <li className="nav-item mobile-menu d-md-none float-left">
                                <button className="nav-link menu-toggle hamburger hamburger--arrow js-hamburger is-active">
                                    <span className="hamburger-box"></span>
                                    <span className="hamburger-inner"></span>
                                </button>
                            </li>
                            <li className="nav-item">
                                <a href="index.html" className="navbar-brand nav-link">
                                    <img src="../../../assets/images/ohre.png" width="15%" alt="branding logo"/>
                                    <h3 className="brand-text">So giá nhanh</h3>
                                </a>
                            </li>
                            <li className="nav-item d-md-none float-right"><a data-toggle="collapse" data-target="#navbar-mobile10"
                                                                              className="nav-link open-navbar-container"><i
                                className="la la-ellipsis-h pe-2x icon-rotate-right"></i></a></li>
                        </ul>
                    </div>
                    <div className="navbar-container content">
                        <div id="navbar-mobile10" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav mr-auto">
                                <li className="nav-item"><a className="nav-link active" href="#">Trang chủ</a></li>
                            </ul>
                            <ul className="nav navbar-nav float-right">
                                <li className="nav-item"><a className="nav-link" href="#">Về oHRe</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Liên hệ</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Đóng góp</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
export default NavTopMenu