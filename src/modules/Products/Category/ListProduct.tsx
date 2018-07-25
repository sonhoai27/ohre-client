import * as React from 'react';
declare var $: any;
import { IMAGE_CDN } from '../../../const/API';
import Image from "../../../shared/components/Image"
import { connect } from 'react-redux';
import { reAllProducts, reChangeStart } from '../ReProduct';
// import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import ContentPlaceholder from '../../../shared/components/ContentPlaceholder';
import Pagination from '../../../shared/components/Pagination';

interface Props {
    match: any,
    reAllProducts: Function,
    resAllProducts: any,
    start: any,
    reChangeStart: Function
}
class ListProduct extends React.Component<Props, {}> {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let objSendAPI: any = {
            start: (this.props.start === -1 ? this.props.start : - 1),
            current_page: this.calcPage(1)
        }
        objSendAPI = { ...objSendAPI, ...this.makeFilter() }
        this.props.reAllProducts(objSendAPI)
        console.log(this.props.match)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.resAllProducts !== this.props.resAllProducts) {
            this.props.reChangeStart(nextProps.resAllProducts.start)
        }
    }
    calcPage = (number) => {
        if (this.props.start == -1) {
            return (number - 1) * 40
        } else {
            const cal = ((number - 1) * 40 + parseInt(this.props.start, 10) - 40)
            if (cal >= this.props.start) {
                return cal
            } else if (cal <= this.props.start) {
                this.props.reChangeStart(-1)
                return (number - 1) * 40
            }
        }
        return
    }
    getMoreProduct = (page: number) => {
        $(".loading").addClass("active")
        $(".loading i").addClass("spinner")
        setTimeout(async () => {
            const currentPage = await this.calcPage(page)
            let objSendAPI: any = {
                start: this.props.start,
                current_page: currentPage
            }
            objSendAPI = { ...objSendAPI, ...this.makeFilter() }
            this.props.reAllProducts(objSendAPI)
        }, 500)
        setTimeout(() => {
            $(".loading").removeClass("active")
            $(".loading i").removeClass("spinner")
            window.scrollTo(0, 0)
            window.history.pushState("", "", `${this.props.match.url}?page=` + page);
        }, 1000)
    }
    makeCurrentPage = () => {
        const page = (window.location.href).split("page=")[1]
        if (page != undefined || page != null) {
            return page
        } else {
            return '1'
        }
    }
    makeFilter = () => {
        const cate = this.props.match.params.idCategory
        const brand = this.props.match.params.idBrand
        if (cate && brand) {
            return ({
                category: parseInt((cate.split("-"))[0], 10),
                brand: parseInt((brand.split("-"))[0], 10)
            })
        } else if (cate) {
            return ({
                category: parseInt((cate.split("-"))[0], 10)
            })
        } else if (brand) {
            return ({
                brand: parseInt((brand.split("-"))[0], 10)
            })
        }
        return
    }
    renderListProduct = () => {
        const products = (this.props.resAllProducts.products ? this.props.resAllProducts.products : [])
        if (products.length > 0) {
            const listProducts = products
                .map((itemProduct) => {
                    const number = Number(itemProduct.product_price)
                    const shop = (isNaN(itemProduct.product_url_website) ? (
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
                                    <Link to={'/redirect/'+itemProduct.product_id}>Tới nơi bán</Link>
                                </p>
                            </div>
                        </div>
                    ) : (<p className="text-center">Có {itemProduct.product_url_website} sản phẩm</p>))
                    return (
                        <div key={itemProduct.product_id} className="col-sm-4 item"
                            style={{
                                marginBottom: (isNaN(itemProduct.product_url_website) ? 64 : 32)
                            }}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Link to={`/products/` + (isNaN(itemProduct.product_url_website) ? 'detail' : 'group') + `/`
                                        + (isNaN(itemProduct.product_url_website) ? itemProduct.product_id + "-" : '')
                                        + itemProduct.product_alias}>
                                        <Image
                                            width={250}
                                            height={250}
                                            src={IMAGE_CDN + itemProduct.product_avatar} />
                                    </Link>
                                </div>
                                <div className="col-sm-12">
                                    <Link to={`/products/` + (isNaN(itemProduct.product_url_website) ? 'detail' : 'group') + `/`
                                        + (isNaN(itemProduct.product_url_website) ? itemProduct.product_id + "-" : '')
                                        + itemProduct.product_alias}>
                                        <div className="text-center">
                                            <h4 className="info" style={{
                                                marginTop: 16
                                            }}>{itemProduct.product_name}</h4>
                                            <h5>{number.toLocaleString('vi-VN')}đ</h5>
                                        </div>
                                    </Link>
                                    {shop}
                                </div>
                            </div>
                        </div>
                    )
                })
            return listProducts
        } else {
            return <ContentPlaceholder />
        }

    }
    renderButtonFilter = () => {
        const temp = this.props.match.params.idBrand
        if(temp){
            const brand = (((temp.split("-")).slice(1)).join(" ")).toUpperCase( )
            return (
                <div className="col-12" style={{
                    textAlign: 'right',
                    marginBottom: '32px'
                }}>
                    <div className="badge badge-pill badge-info hover"
                    onClick={()=> {
                        window.location.href = "/products"
                    }}
                    style={{
                        padding: '8px 16px',
                        fontSize: '14px'
                    }}
                    >
                        {brand} <i className="ft ft-x white"
                        style={{
                            marginLeft: '4px'
                        }}></i>
                    </div>
                </div>
            )
        }
        return
    }
    render() {
        return (
            <div className="card disable-box-shadow product-detail" style={{ background: 'white' }}>
                <div className="card-body row">
                    {this.renderButtonFilter()}
                    {
                        (this.props.resAllProducts.products ? this.renderListProduct() : <ContentPlaceholder />)
                    }
                </div>
                <div className="pg">
                    <Pagination
                        initialPage={parseInt(this.makeCurrentPage(), 10)}
                        pageSize={40}
                        totalItems={this.props.resAllProducts.numRows}
                        onChangePage={(e) => this.getMoreProduct(e.currentPage)} />
                </div>
                <div className="loading">
                    <i className="la la-refresh"></i>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (storeState, ownProps) => ({
    resAllProducts: storeState.reProduct.resAllProducts,
    start: storeState.reProduct.start,
    match: ownProps.match
});
const mapDispatchToProps = {
    reAllProducts,
    reChangeStart
}
export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);