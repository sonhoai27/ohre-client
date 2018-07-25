import * as React from 'react';
import NavTopMenu from '../../shared/components/header/nav.top.menu';
import { connect } from 'react-redux';
import { reProductDetail, reSimilarProducts, reSortPriceDetailProducts, rePaginationSimilarProduct, reRecommendByBrand } from './ReProduct';
import { IMAGE_CDN } from '../../const/API';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import Ads from './../home/Ads';
import Image from "../../shared/components/Image"
import BottomFooter from '../../shared/components/footer/bottom.footer';
import { Storage } from '../../utils/storage-util';
import { rePushProduct, rePushBrand } from './../../reducers/init';
declare var $: any;

interface Props {
    match?: any,
    resProductDetail: any,
    resListSimilarProduct: any,
    reProductDetail: Function,
    reSimilarProducts: Function,
    rePushBrand: Function,
    rePushProduct: Function,
    reSortPriceDetailProducts: Function,
    rePaginationSimilarProduct: Function,
    paginationSimilarProduct: any,
    resRecommendByBrand: any,
    reRecommendByBrand: Function
}
interface State {
    currentPageProductName: number
}
class ProductDetail extends React.Component<Props, State>{
    constructor(props) {
        super(props)
        this.state = {
            currentPageProductName: 1
        }
    }
    componentDidMount() {
        const productId = (this.props.match.params.idProduct).split("-")[0]
        this.props.reProductDetail(productId)

        $(".show-more").click(() => {
            if ($(".content-ch").hasClass("show-more-height")) {
                $(".show-more").text("Ít hơn");
            } else {
                $(".show-more").text("Nhiều hơn");
            }
            $(".content-ch").toggleClass("show-more-height", 1000, "easeOutSine");
            window.scrollTo(0, 0)
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.resProductDetail !== this.props.resProductDetail) {
            this.props.reSimilarProducts(nextProps.resProductDetail.product_name, nextProps.resProductDetail.product_id)
            this.props.rePushBrand({
                idUser: Storage.local.get("access_token"),
                idBrand: nextProps.resProductDetail.brand_id
            })
            this.props.rePushProduct({
                idUser: Storage.local.get("access_token"),
                idProduct: nextProps.resProductDetail.product_id,
                product: 0
            })
            this.props.reRecommendByBrand(nextProps.resProductDetail.product_id_brand)
        }
        if (nextProps.resListSimilarProduct != this.props.resListSimilarProduct) {
            this.props.rePaginationSimilarProduct(this.state.currentPageProductName, nextProps.resListSimilarProduct)
            this.setState({
                currentPageProductName: this.state.currentPageProductName + 1
            })
        }
    }
    sortSimilarProduct = (e: any) => {
        const type = e.target.value
        console.log(type)
        this.props.reSortPriceDetailProducts(type, this.props.resListSimilarProduct)
    }
    renderSimilarProducts = () => {
        if (this.props.resListSimilarProduct.length !== 0) {
            const li = this.props.paginationSimilarProduct
                .map((itemProduct: any, index: number) => {
                    const number = Number(itemProduct.product_price)
                    return (
                        <div key={itemProduct.product_id} className="col-sm-3 item">
                            <div className="row">
                                <div className="col-sm-12">
                                    <a href={"/products/detail/" + itemProduct.product_id + "-" + itemProduct.product_alias}>
                                        <Image
                                            width={150}
                                            height={150}
                                            src={IMAGE_CDN + itemProduct.product_avatar} />
                                    </a>
                                </div>
                                <div className="col-sm-12">
                                    <a href={"/products/detail/" + itemProduct.product_id + "-" + itemProduct.product_alias}>
                                        <div className="text-center">
                                            <h5 className="info" style={{
                                                marginTop: 16
                                            }}>{itemProduct.product_name}</h5>
                                            <h5>{number.toLocaleString('vi-VN')}đ</h5>
                                        </div>
                                    </a>
                                    <div className="info">
                                        <div className="shop" style={{ marginTop: 32, textAlign: 'center' }}>
                                            <img src={IMAGE_CDN + itemProduct.shop_avatar} alt={itemProduct.shop_name} style={{
                                                width: '32%',
                                                display: 'block'
                                            }} />
                                            <p className="btn btn-success btn-sm" style={{
                                                border: 'none',
                                                borderRadius: '4px'
                                            }}>
                                                <Link to={'/redirect/' + itemProduct.product_id}>Tới nơi bán</Link>
                                            </p>
                                        </div>
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
    renderListRecommendByBrand = () => {
        const list = this.props.resRecommendByBrand.map((element, index) => {
            const number = Number(element.product_price)
            return (
                <div className="margin-bottom-16" key={index}>
                    <a href={`/products/` + (isNaN(element.product_url_website) ? 'detail' : 'group') + `/`
                        + (isNaN(element.product_url_website) ? element.product_id + "-" : '')
                        + element.product_alias}
                        style={{color: '#333'}}
                        title={element.product_name}>
                        <div className="row">
                            <div className="col-sm-3">
                                <Image
                                    width={40}
                                    height={40}
                                    src={IMAGE_CDN + element.product_avatar}
                                />
                            </div>
                            <div className="col-sm-9">
                                <p className="onlyRow" style={{ marginBottom: '2px' }}>{element.product_name}</p>
                                <span style={{ fontSize: 12 }}>{number.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>
                    </a>
                </div>
            )
        })
        return list
    }
    showMoreProduct = async () => {
        await this.props.rePaginationSimilarProduct(this.state.currentPageProductName, this.props.resListSimilarProduct)
        this.setState({
            currentPageProductName: this.state.currentPageProductName + 1
        })
    }
    render() {
        const price = Number(this.props.resProductDetail.product_price)
        return (
            <>
                <NavTopMenu isShowing={true} />
                <div className="app-content content product-detail">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="card disable-box-shadow">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <img className="img-fluid" src={IMAGE_CDN + this.props.resProductDetail.product_avatar} />
                                            </div>
                                            <div className="col-sm-6">
                                                <h1 className="text-bold-800">{this.props.resProductDetail.product_name}</h1>
                                                <h6 className="text-bold-600">Thương hiệu: <Link to={"/brands/" + this.props.resProductDetail.brand_alias}>
                                                    {this.props.resProductDetail.brand_name}</Link>
                                                </h6>
                                                <div className="product-price">
                                                    <h2 className="text-bold-200">
                                                        {price.toLocaleString('vi-VN')}đ
                                                </h2>
                                                    <div dangerouslySetInnerHTML={{ __html: this.props.resProductDetail.product_promo }}>
                                                    </div>
                                                </div>
                                                <div className="shop" style={{ marginTop: 32 }}>
                                                    <img src={IMAGE_CDN + this.props.resProductDetail.shop_avatar}
                                                        alt={this.props.resProductDetail.shop_name} style={{
                                                            width: '20%',
                                                            display: 'block'
                                                        }} />
                                                    <p className="btn btn-success" style={{
                                                        border: 'none',
                                                        borderRadius: '4px'
                                                    }}>
                                                        <Link to={'/redirect/' + this.props.resProductDetail.product_id}>Tới nơi bán</Link>
                                                    </p>
                                                </div>
                                                <div className="cauhinh margin-top-32">
                                                    <div className="content-ch show-more-height" dangerouslySetInnerHTML={{ __html: this.props.resProductDetail.product_cauhinh }}>
                                                    </div>
                                                    <div className="btn-show-more">
                                                        <p className="show-more">Nhiều hơn</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-sm-12 margin-top-64">
                                                <div className="cauhinh">
                                                    <h3 className="content-header-title mb-0 d-inline-block">
                                                        Cấu hình
                                                </h3>
                                                    <div dangerouslySetInnerHTML={{ __html: this.props.resProductDetail.product_cauhinh }}>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="row margin-top-64">
                                            <div className="col-12">
                                                <div className="col-sm-12" style={{ marginBottom: 0 }}>
                                                    <div className="title" style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        margin: '-22px',
                                                        padding: '16px 32px',
                                                        background: '#f9f9fa'
                                                    }}>
                                                        <h3 className="text-bold-500" style={{ flex: 10 }}>
                                                            <span className="title-line-before">Sản phẩm cùng tên</span>
                                                        </h3>
                                                        <select className="form-control"
                                                            onChange={(e) => this.sortSimilarProduct(e)}
                                                            id="brand" name="brand" style={{ flex: 2 }}
                                                        >
                                                            <option>Giá theo</option>
                                                            <option value="0">Thấp đến cao</option>
                                                            <option value="1">Cao đến thấp</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="margin-top-64" style={{
                                                    display: 'block',
                                                    width: '100%'
                                                }}>
                                                    <div className="row">
                                                        {this.renderSimilarProducts()}
                                                    </div>
                                                    {this.state.currentPageProductName !== Math.ceil(this.props.resListSimilarProduct.length / 8) + 1 ? (
                                                        <div className="col-12 load-more margin-top-32">
                                                            <button className="btn btn-info btn-sm"
                                                                onClick={() => this.showMoreProduct()}
                                                                style={{
                                                                    margin: 'auto',
                                                                    display: 'block'
                                                                }}>Xem thêm
                                        </button>
                                                        </div>
                                                    ) : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card disable-box-shadow">
                                    <div className="card-body">
                                        <div className="col-sm-12 home-category-title" style={{ marginBottom: 0 }}>
                                            <h3 className="content-header-title margin-bottom-32 d-inline-block">
                                                <span>Sản phẩm cùng hãng</span>
                                            </h3>
                                            {this.renderListRecommendByBrand()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Ads />
                <BottomFooter />
            </>
        )
    }
}

const mapStateToProps = (storeState, ownProps) => ({
    resProductDetail: storeState.reProduct.resProductDetail,
    resListSimilarProduct: storeState.reProduct.resListSimilarProduct,
    paginationSimilarProduct: storeState.reProduct.paginationSimilarProduct,
    resRecommendByBrand: storeState.reProduct.resRecommendByBrand
});
const mapDispatchToProps = {
    reProductDetail,
    reSimilarProducts,
    rePushProduct,
    rePushBrand,
    reSortPriceDetailProducts,
    rePaginationSimilarProduct,
    reRecommendByBrand
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));