import * as React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_CDN } from '../../../const/API';
import Image from "../../../shared/components/Image"
import { connect } from 'react-redux';
import { reAllProducts } from '../ReProduct';
import ReactPaginate from 'react-paginate';

interface Props {
    reAllProducts: Function,
    resAllProducts: any
}
class ListProduct extends React.Component<Props, {}> {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.reAllProducts({
            current_page: this.calcPage(1),
            start: -1
        })
    }
    calcPage = (number) => {
        return (number - 1) * 10
    }
    renderListProduct = () => {
        const products = (this.props.resAllProducts.products ? this.props.resAllProducts.products : [])
        console.log(products)
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
                                <a href={itemProduct.product_url_website} target="_blank">Tới nơi bán</a>
                            </p>
                        </div>
                    </div>
                ) : (<p className="text-center">Có {itemProduct.product_url_website} sản phẩm</p>))
                return (
                    <div key={itemProduct.product_id} className="col-sm-4 item"
                    style={{marginBottom: (isNaN(itemProduct.product_url_website) ? 64 : 32)}}>
                        <div className="row">
                            <div className="col-sm-12">
                                <Link to={`/products/`+(isNaN(itemProduct.product_url_website) ? 'detail' : 'group')+`/`
                                + itemProduct.product_id + "-" + itemProduct.product_alias}>
                                    <Image
                                        width={250}
                                        height={250}
                                        src={IMAGE_CDN + itemProduct.product_avatar} />
                                </Link>
                            </div>
                            <div className="col-sm-12">
                                <Link to={`/products/`+(isNaN(itemProduct.product_url_website) ? 'detail' : 'group')+`/`
                                + itemProduct.product_id + "-" + itemProduct.product_alias}>
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
    }
    render() {
        return (
            <div className="card disable-box-shadow product-detail" style={{ background: 'white' }}>
                <div className="card-body row">
                    {this.renderListProduct()}
                </div>
                <div className="pg">
                <ReactPaginate
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    activeClassName={"active"}
                    subContainerClassName={"page-item"}
                    containerClassName={"card pagination justify-content-center pagination-separate pagination-curved pagination-flat mb-1"}
                    pageCount={this.props.resAllProducts.numRows ? Math.ceil(this.props.resAllProducts.numRows/10) : 0}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    resAllProducts: storeState.reProduct.resAllProducts
});
const mapDispatchToProps = {
    reAllProducts
}
export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);