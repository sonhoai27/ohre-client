import * as React from 'react';
declare var $: any;
import NavTopMenu from '../../shared/components/header/nav.top.menu';
import { reSearchProduct, reGetProductByPage, reSortProductByPrice } from './ReHome';
import { IMAGE_CDN } from "../../const/API"
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import ClientPagination from '../../shared/components/pagination/ClientPagination';
import Image from '../../shared/components/Image';
import delay from './../../utils/delay';

interface Props {
    match?: any,
    resListProducts: any,
    reSearchProduct: Function,
    resTempProductsForPagination: any,
    reGetProductByPage: Function,
    currentPage: any,
    reSortProductByPrice: Function
}
interface State {
    price: any,
    isSearching: boolean,
    isShow: boolean,
    keySearch: any
}
class SearchPage extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            price: this.formatNumber('100000'),
            isSearching: false,
            isShow: false,
            keySearch: ""
        }
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
            window.location.assign(`/search/${value}`)
        } else if (e.keyCode !== 13 && this.state.isShow && value !== '') {
            delay(() => {
                window.history.pushState("", "", "/search/" + value);
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
    priceHandle = (e) => {
        const value = e.target.value
        this.setState({
            price: this.formatNumber(value)
        })
        delay(() => {
            $(".loading").addClass("active")
            $(".loading i").addClass("spinner")
            setTimeout(() => {
                $(".loading").removeClass("active")
                $(".loading i").removeClass("spinner")
            }, 1000)
            this.props.reSortProductByPrice(value, this.props.resListProducts)
        }, 500)
    }
    formatNumber = (number: any) => {
        const numberLen = number.length
        let listNumber = ''
        let dem = 0
        for (let index = numberLen - 1; index >= 0; index--) {
            if (dem < 2) {
                listNumber = number[index] + listNumber;
                dem = dem + 1;
            } else {
                listNumber = '.' + number[index] + listNumber;
                dem = 0;
            }
        }
        if (listNumber.indexOf('.') === 0) {
            listNumber = listNumber.slice(listNumber.indexOf('.') + 1)
        }
        return listNumber
    }

    componentDidMount() {
        this.props.reSearchProduct(this.props.match.params.keySearch)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.resListProducts !== this.props.resListProducts) {
            this.props.reGetProductByPage(this.props.currentPage, nextProps.resListProducts)
        }
    }
    renderListProductSearch = () => {
        if (this.props.resListProducts.length !== 0) {
            const li = this.props.resTempProductsForPagination
                .map((itemProduct: any, index: number) => {
                    const number = Number(itemProduct.product_price)
                    const shop = (isNaN(itemProduct.product_url_website) ? (
                        <div className="info">
                            <div className="shop">
                                <img src={IMAGE_CDN + itemProduct.shop_avatar} alt={itemProduct.shop_name} style={{
                                    width: '20%',
                                    display: 'block'
                                }} />
                                <p className="btn btn-success btn-sm" style={{
                                    border: 'none',
                                    borderRadius: '4px'
                                }}>
                                    <Link to={'/redirect/'+itemProduct.product_id}>Tới nơi bán</Link>
                                </p>
                            </div>
                        </div>
                    ) : (

                            <div style={{display: 'flex'}} className="shop">
                                <p style={{
                                    marginRight: 8,
                                    fontSize: 16,
                                    color: '#464855'
                                }}>Có {itemProduct.product_url_website} sản phẩm</p>
                                <p className="btn btn-success btn-sm" style={{
                                    border: 'none',
                                    borderRadius: '4px'
                                }}>
                                    <a href={`/products/group/${itemProduct.product_alias}`}
                                    target="_blank">So sánh</a>
                                </p>
                            </div>
                        ))
                    return (
                        <div key={itemProduct.product_id} className="col-sm-12 item" style={{ borderBottom: '1px solid #eee' }}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <NavLink to={`/products/` + (isNaN(itemProduct.product_url_website) ? 'detail' : 'group') + `/`
                                        + (isNaN(itemProduct.product_url_website) ? itemProduct.product_id + "-" : '')
                                        + itemProduct.product_alias}>
                                        <Image
                                            width={200}
                                            height={200}
                                            src={IMAGE_CDN + itemProduct.product_avatar} />
                                    </NavLink>
                                </div>
                                <div className="col-sm-8">
                                    <NavLink to={`/products/` + (isNaN(itemProduct.product_url_website) ? 'detail' : 'group') + `/`
                                        + (isNaN(itemProduct.product_url_website) ? itemProduct.product_id + "-" : '')
                                        + itemProduct.product_alias}>
                                        <h3 className="info">{itemProduct.product_name}</h3>
                                        <h4>{number.toLocaleString('vi-VN')}đ</h4>
                                    </NavLink>
                                    <div className="info">
                                        <div dangerouslySetInnerHTML={{ __html: itemProduct.product_promo }}
                                            style={{
                                                marginTop: 16,
                                                fontSize: 16,
                                                color: '#464855'
                                            }}
                                        />
                                        {shop}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            return li
        } else {
            return (
                <h3>Không có.</h3>
            )
        }
    }
    resetSort = () => {
        window.location.href = window.location.href
    }
    render() {
        return (
            <>
                <NavTopMenu isShowing={false} />
                <div className="app-content content custom-search-page">
                    <div className="content-header row">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-6">
                                    <div className="fast-search">
                                        <div className="content-search">
                                            <input type="text" name="input-main-search"
                                                placeholder={this.props.match.params.keySearch}
                                                className="form-control"
                                                onKeyUp={(e) => this.eventSearch(e)}
                                                onChange={(e) => this.closeResultSearch(e)}
                                                style={
                                                    {
                                                        padding: 15,
                                                        borderRadius: '4px 0px 0px 4px',
                                                        border: 'unset'
                                                    }
                                                } />
                                            <i className="la la-search" style={{
                                                borderRadius: '0px 4px 4px 0px',
                                                background: 'var(--yellow)',
                                                padding: '15px',
                                                color: 'var(--white)'
                                            }} />
                                        </div>
                                    </div>
                                    <div className="row" style={{ marginTop: 16 }}>
                                        {/* <div className="col-sm-12 list-sort">
                                            <select className="form-control" id="category" name="category">
                                                <option>Danh mục</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                                <option>Option 4</option>
                                                <option>Option 5</option>
                                            </select>
                                            <select className="form-control" id="brand" name="brand">
                                                <option>Hãng</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                                <option>Option 4</option>
                                                <option>Option 5</option>
                                            </select>
                                        </div> */}
                                        <div className="col-sm-12" style={{ marginTop: 16 }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                color: '#fff'
                                            }}>
                                                <span>Giá: </span>
                                                <span>tối ta {this.state.price + 'đ'}</span>
                                            </div>
                                            <input type="range"
                                                max={50000000} min={100000}
                                                className="slider" style={{ width: '100%' }} onChange={(e) => this.priceHandle(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3"></div>
                            </div>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="card disable-box-shadow">
                                        <div className="card-header"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <h5 className="card-title">Có <b>{this.props.resListProducts.length}</b> kết quả.</h5>
                                            <div>
                                                <div className="badge badge-pill badge-info hover"
                                                    onClick={() => this.resetSort()}
                                                    style={{
                                                        padding: '8px 16px',
                                                        fontSize: 14
                                                    }}
                                                >
                                                    Lọc theo giá <i className="ft ft-x white" style={{ marginLeft: 4 }}></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body row list-product-search">
                                            {this.renderListProductSearch()}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="text-bold-500">
                                                <span className="title-line-before">Có thể bạn quan tâm</span>
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <p>
                                                The optional Wi-Fi Access Point allows guests to enter no matter where you are. Control who has access and when.
                                                You can check if the door is locked from your phone, whether you’re home in bed or across the world.
                                                </p>
                                            <p>
                                                The optional Wi-Fi Access Point allows guests to enter no matter where you are. Control who has access and when.
                                                You can check if the door is locked from your phone, whether you’re home in bed or across the world.
                                                </p>
                                            <p>
                                                The optional Wi-Fi Access Point allows guests to enter no matter where you are. Control who has access and when.
                                                You can check if the door is locked from your phone, whether you’re home in bed or across the world.
                                                </p>
                                            <p>
                                                The optional Wi-Fi Access Point allows guests to enter no matter where you are. Control who has access and when.
                                                You can check if the door is locked from your phone, whether you’re home in bed or across the world.
                                                </p>
                                            <p>
                                                The optional Wi-Fi Access Point allows guests to enter no matter where you are. Control who has access and when.
                                                You can check if the door is locked from your phone, whether you’re home in bed or across the world.
                                                </p>
                                            <p>
                                                The optional Wi-Fi Access Point allows guests to enter no matter where you are. Control who has access and when.
                                                You can check if the door is locked from your phone, whether you’re home in bed or across the world.
                                                </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-8">
                                    <ClientPagination totalPage={Math.floor((this.props.resListProducts.length) / 20)} />
                                </div>
                                <div className="col-sm-4">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="loading">
                    <i className="la la-refresh"></i>
                </div>
            </>
        )
    }
}

const mapStateToProps = storeState => ({
    resListProducts: storeState.reHome.resListProducts,
    resTempProductsForPagination: storeState.reHome.resTempProductsForPagination,
    currentPage: storeState.reHome.currentPage
});
const mapDispatchToProps = {
    reSearchProduct,
    reGetProductByPage,
    reSortProductByPrice
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);