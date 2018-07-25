import * as React from 'react';
import NavTopMenu from '../../shared/components/header/nav.top.menu';
import { connect } from 'react-redux';
import Ads from './../home/Ads';
import BottomFooter from '../../shared/components/footer/bottom.footer';
import { reDetailGroup, reGroupProducts, reTempGroupProducts, reSortPriceGroupProducts, reRecommendByBrand } from './ReProduct';
import { IMAGE_CDN } from '../../const/API';
import Image from './../../shared/components/Image';
import { Link } from 'react-router-dom';
import { Storage } from '../../utils/storage-util';
import { rePushBrand, rePushProduct } from '../../reducers/init';
import HotProducts from '../home/HotProducts';
declare var $: any;

interface Props {
    match?: any,
    detailGroup: any,
    reDetailGroup: Function,
    resListGroupProducts: any,
    reGroupProducts: Function,
    listTempGrouProduct: any,
    reTempGroupProducts: Function,
    reSortPriceGroupProducts: Function,
    rePushBrand:Function,
    rePushProduct:Function
    resRecommendByBrand: any,
    reRecommendByBrand: Function
}
interface State {
    currentPage: number,
    totalPage: number
}
class ProductGroup extends React.Component<Props, State>{
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0,
            totalPage: 0
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        const groupId = this.props.match.params.idGroup
        this.props.reDetailGroup(groupId)

        // jquery show more

        $(".show-more").click(() => {
            if ($(".content-ch").hasClass("show-more-height")) {
                $(".show-more").text("Ít hơn");
            } else {
                $(".show-more").text("Nhiều hơn");
            }
            $(".content-ch").toggleClass("show-more-height", 1000, "easeOutSine" );
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.detailGroup != this.props.detailGroup) {
            this.props.reGroupProducts(nextProps.detailGroup.group_product_id)
            this.props.rePushBrand({
                idUser: Storage.local.get("access_token"),
                idBrand: nextProps.detailGroup.brand_id
            })
            this.props.rePushProduct({
                idUser: Storage.local.get("access_token"),
                idProduct: nextProps.detailGroup.group_product_id,
                product: 1
            })
            this.props.reRecommendByBrand(nextProps.detailGroup.brand_id)
        }
        if (nextProps.resListGroupProducts != this.props.resListGroupProducts) {
            this.setState({
                totalPage: Math.ceil(nextProps.resListGroupProducts.length / 10)
            })
            this.props.reTempGroupProducts(this.state.currentPage, nextProps.resListGroupProducts)
            console.log(nextProps.resListGroupProducts)
        }
    }
    loadMoreListGroupProduct = async () => {
        if (this.state.currentPage < this.state.totalPage - 1) {
            await this.setState({
                currentPage: (this.state.currentPage + 1)
            })
        } else {
            await this.setState({
                currentPage: 0
            })
        }
        window.scrollTo(0, 400)
        this.props.reTempGroupProducts(this.state.currentPage, this.props.resListGroupProducts)
    }
    sortPrice = (e) => {
        const type = e.target.value
        this.props.reSortPriceGroupProducts(type, this.props.resListGroupProducts)
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
    renderGroupProducts = () => {
        if (this.props.resListGroupProducts.length !== 0) {
            const li = this.props.listTempGrouProduct
                .map((itemProduct: any, index: number) => {
                    const number = Number(itemProduct.product_price)
                    return (
                        <div key={itemProduct.product_id} className="col-sm-12 item">
                            <div className="row">
                                <div className="col-2">
                                    <Link to={"/products/detail/" + itemProduct.product_id + "-" + itemProduct.product_alias}>
                                        <Image
                                            width={80}
                                            height={80}
                                            src={IMAGE_CDN + itemProduct.product_avatar} />
                                    </Link>
                                </div>
                                <div className="col-10">
                                    <Link to={"/products/detail/" + itemProduct.product_id + "-" + itemProduct.product_alias}>
                                        <h3 className="info">{itemProduct.product_name}</h3>
                                        <h4>{number.toLocaleString('vi-VN')}đ</h4>
                                    </Link>
                                    <div className="info">
                                        <div dangerouslySetInnerHTML={{ __html: itemProduct.product_promo }}
                                            style={{
                                                marginTop: 16,
                                                fontSize: 16,
                                                color: '#464855'
                                            }}
                                        />
                                        <div className="shop margin-top-16">
                                            <img src={IMAGE_CDN + itemProduct.shop_avatar} alt={itemProduct.shop_name} style={{
                                                width: '10%',
                                                display: 'block'
                                            }} />
                                            <p className="btn btn-success btn-sm" style={{
                                                border: 'none',
                                                borderRadius: '4px'
                                            }}>
                                                <a href={itemProduct.product_url_website} target="_blank">Tới nơi bán</a>
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
    render() {
        const price = Number(this.props.detailGroup.product_price)
        return (
            <>
                <NavTopMenu isShowing={true} />
                <div className="app-content content custom-search-page">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="card disable-box-shadow">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <img
                                                    width="90%"
                                                    className="img-fluid"
                                                    src={IMAGE_CDN + this.props.detailGroup.product_avatar} />
                                            </div>
                                            <div className="col-sm-8">
                                                <h1 className="text-bold-800">{this.props.detailGroup.group_product_name}</h1>
                                                <h6 className="text-bold-600">Thương hiệu: <Link to={"/brands/" + this.props.detailGroup.brand_alias}>
                                                    {this.props.detailGroup.brand_name}</Link>
                                                </h6>
                                                <div className="product-price">
                                                    <h2 className="text-bold-200">
                                                        {price.toLocaleString('vi-VN')}đ
                                                </h2>
                                                </div>
                                                <div className="shop" style={{ marginTop: 32 }}>
                                                    <img src={IMAGE_CDN + this.props.detailGroup.shop_avatar} style={{
                                                        width: '20%'
                                                    }} />
                                                    <p className="btn btn-success" style={{
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        marginBottom: 0,
                                                        marginLeft: 8
                                                    }}>
                                                        <a
                                                            href={this.props.detailGroup.product_url_website}
                                                            style={{
                                                                color: '#fff'
                                                            }}
                                                            target="_blank">
                                                            Tới nơi bán
                                                        </a>
                                                    </p>
                                                </div>
                                                <div className="cauhinh margin-top-32">
                                                    <div className="content-ch show-more-height" dangerouslySetInnerHTML={{ __html: this.props.detailGroup.product_cauhinh }}>
                                                    </div>
                                                    <div className="btn-show-more">
                                                        <p className="show-more">Nhiều hơn</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12  margin-top-64">
                                                <div className="title" style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    margin: '-22px',
                                                    padding: '16px 64px',
                                                    background: '#f9f9fa'
                                                }}>
                                                    <h3 className="text-bold-500" style={{ flex: 10 }}>
                                                        <span className="title-line-before">So sánh giá</span>
                                                    </h3>
                                                    <select className="form-control"
                                                        id="brand" name="brand" style={{ flex: 2 }}
                                                        onChange={(e) => this.sortPrice(e)}
                                                    >
                                                        <option>Giá theo</option>
                                                        <option value="0">Thấp đến cao</option>
                                                        <option value="1">Cao đến thấp</option>
                                                    </select>
                                                </div>
                                                <div className="row list-product-search margin-top-32">
                                                    {this.renderGroupProducts()}

                                                    <div className="col-12 load-more margin-top-32">
                                                        <button className="btn btn-info btn-sm" style={{
                                                            margin: 'auto',
                                                            display: 'block'
                                                        }}
                                                            onClick={() => this.loadMoreListGroupProduct()}>
                                                            {this.state.currentPage === (this.state.totalPage - 1) ? 'Trang đầu' : 'Xem thêm'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 recommend recomender-system mix margin-top-64">
                                                <div className="title" style={{
                                                    margin: '-22px',
                                                    padding: '16px 64px',
                                                    background: '#f9f9fa'
                                                }}>
                                                    <h3 className="text-bold-500">
                                                        <span className="title-line-before">Có thể bạn quan tâm</span>
                                                    </h3>
                                                </div>
                                                <div className="row margin-top-64">
                                                <HotProducts/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card disable-box-shadow">
                                    <div className="card-body">
                                        <div className="ads" style={{
                                            margin: '-18px'
                                        }}>
                                            <img
                                                className="img img-fluid"
                                                src="https://images-na.ssl-images-amazon.com/images/I/5169XnIsYsL.jpg" />
                                        </div>
                                        <div className="recomender-system brand margin-top-64">
                                            <h3 className="text-bold-500  margin-bottom-32">
                                                <span className="title-line-before">Sản phẩm cùng hãng</span>
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

const mapStateToProps = storeState => ({
    detailGroup: storeState.reProduct.detailGroup,
    resListGroupProducts: storeState.reProduct.resListGroupProducts,
    listTempGrouProduct: storeState.reProduct.listTempGrouProduct,
    resRecommendByBrand: storeState.reProduct.resRecommendByBrand
});
const mapDispatchToProps = {
    reDetailGroup,
    reGroupProducts,
    reTempGroupProducts,
    reSortPriceGroupProducts,
    rePushProduct,
    rePushBrand,
    reRecommendByBrand
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductGroup);