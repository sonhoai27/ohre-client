import * as React from 'react';
import NavTopMenu from '../../shared/components/header/nav.top.menu';
import { connect } from 'react-redux';
import { reProductDetail, reSimilarProducts } from './ReProduct';
import { IMAGE_CDN } from '../../const/API';
import { Link} from 'react-router-dom';
import Ads from './../home/Ads';
import Image from "../../shared/components/Image"
import BottomFooter from '../../shared/components/footer/bottom.footer';

interface Props {
    match?: any,
    resProductDetail: any,
    resListSimilarProduct: any,
    reProductDetail: Function,
    reSimilarProducts: Function
}
class ProductDetail extends React.Component<Props, {}>{
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const productId = (this.props.match.params.idProduct).split("-")[0]
        this.props.reProductDetail(productId)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.resProductDetail !== this.props.resProductDetail) {
            this.props.reSimilarProducts(nextProps.resProductDetail.product_name,nextProps.resProductDetail.product_id)
        }
    }
    renderSimilarProducts = () => {
        if (this.props.resListSimilarProduct.length !== 0) {
            const li = this.props.resListSimilarProduct
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
                                        <div className="shop" style={{ marginTop: 32,textAlign: 'center'}}>
                                            <img src={IMAGE_CDN + itemProduct.shop_avatar} alt={itemProduct.shop_name} style={{
                                                width: '32%',
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
        const price = Number(this.props.resProductDetail.product_price)
        return (
            <>
                <NavTopMenu isShowing={true}/>
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
                                                        <a href={this.props.resProductDetail.product_url_website} target="_blank">Tới nơi bán</a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 margin-top-64">
                                                <div className="cauhinh">
                                                    <h3 className="content-header-title mb-0 d-inline-block">
                                                        Cấu hình
                                                </h3>
                                                    <div dangerouslySetInnerHTML={{ __html: this.props.resProductDetail.product_cauhinh }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row margin-top-64">
                                            <div className="col-12">
                                                <h2 className="text-bold-400">Sản phẩm liên quan</h2>
                                                <div className="row">
                                                    {this.renderSimilarProducts()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card disable-box-shadow">
                                    <div className="card-body">

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
    resProductDetail: storeState.reProduct.resProductDetail,
    resListSimilarProduct: storeState.reProduct.resListSimilarProduct
});
const mapDispatchToProps = {
    reProductDetail,
    reSimilarProducts
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);