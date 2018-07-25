import * as React from 'react'
declare var $: any;
import { Link, NavLink, withRouter } from 'react-router-dom';
import { ASSETS, BASEURL } from './../../../const/API';
import { connect } from 'react-redux';
import { reSearchProduct } from '../../../modules/home/ReHome';
import delay from '../../../utils/delay';
interface Props {
    isTrans?: boolean,
    isShowing: boolean,
    resListProducts: any,
    reSearchProduct: Function
}
interface State {
    isSearching: boolean,
    isShow: boolean,
    keySearch: any
}
class NavTopMenu extends React.Component<Props, State> {
    static defaultProps = {
        isTrans: false
    }
    constructor(props) {
        super(props)
        this.state = {
            isSearching: false,
            isShow: false,
            keySearch: ""
        }
    }
    componentDidMount(){
        $(window).scroll(() =>{
            const scroll = $(window).scrollTop();
            if (scroll >= 100) {
                if(this.props.isTrans === true){
                    $(".custom-header").removeClass('trans')
                }
            } else {
                if(this.props.isTrans === true){
                    $(".custom-header").addClass('trans')
                }
            }
        });
    }
    eventSearch = (e: any) => {
        const value = e.target.value
        this.setState({
            keySearch: value
        })
        if (!this.state.isShow && value !== '') {
            this.setState({
                isSearching: !this.state.isSearching,
                isShow: !this.state.isShow
            })
        } else if (e.keyCode === 13 && this.state.isShow && value !== '') {
            window.location.assign(`${BASEURL}search/${value}`)
        } else if (e.keyCode !== 13 && this.state.isShow && value !== '') {
            delay(() => {
                this.props.reSearchProduct(value)
            }, 1000)
        }
    }
    closeResultSearch = (e: any) => {
        if (e.target.value === '') {
            this.setState({
                isSearching: false,
                isShow: false
            })
        }
    }
    showListCategory = () => {
        $("#about-us").modal('show')
    }
    renderListProductSearch = () => {
        if (this.props.resListProducts.length !== 0) {
            let li = this.props.resListProducts.slice(0, 6)
                .map((itemProduct: any, index: number) => {
                    const number = Number(itemProduct.product_price)
                    return (
                        <li key={itemProduct.product_id}>
                            <NavLink to={`/products/` + (isNaN(itemProduct.product_url_website) ? 'detail' : 'group') + `/`
                                + (isNaN(itemProduct.product_url_website) ? itemProduct.product_id + "-" : '')
                                + itemProduct.product_alias}>
                                <h5>{itemProduct.product_name}</h5>
                                <p>{number.toLocaleString('vi-VN')}đ</p>
                                <p className="info">{itemProduct.shop_name}</p>
                            </NavLink>
                        </li>
                    )
                })
            li = [...li, (
                <li key="item-0-0">
                    <NavLink style={{ borderBottom: 0 }} to={`/search/${this.state.keySearch}`}>
                        <h5>Xem thêm</h5>
                    </NavLink>
                </li>
            )]
            return li
        } else {
            return (
                <li>Không có.</li>
            )
        }
    }
    render() {
        return (
            <nav className={`custom-header ${this.props.isTrans ? ` trans ` : ``}
            header-navbar navbar-expand-sm navbar navbar-with-menu navbar-light fixed-top border-lighten-2`}>
                <div className="navbar-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 main">
                                <div className="row">
                                    <div className="col-3 item">
                                        <Link to="/" className="logo">
                                            <img src={`${ASSETS}images/ohre.png`} width="30%" alt="branding logo" />
                                            <h3 className="brand-text white">oHRe</h3>
                                        </Link>
                                    </div>
                                    <div className="col-3 item">
                                        <a className="nav-link white" href="/products">Tất cả sản phẩm</a>
                                    </div>
                                    <div className="col-6 item" style={{ display: (this.props.isShowing ? 'flex' : 'none') }}>
                                        <div className="fast-search">
                                            <div className="content-search">
                                                <input type="text" name="input-main-search"
                                                    onKeyUp={(e) => this.eventSearch(e)}
                                                    onChange={(e) => this.closeResultSearch(e)}
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
                                            <div className={this.state.isSearching ? 'result active' : 'result'}>
                                                <ul>
                                                    {this.renderListProductSearch()}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 about">
                                <a className="nav-link white" onClick={()=>this.showListCategory()}>Về OHre</a>
                                <a className="nav-link white" href="#">Liên hệ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
const mapStateToProps = (storeState, ownProps) => ({
    isShowing: ownProps.isShowing,
    resListProducts: storeState.reHome.resListProducts,
    isTrans: ownProps.isTrans
});
const mapDispatchToProps = {
    reSearchProduct
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavTopMenu));