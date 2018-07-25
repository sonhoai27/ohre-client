import * as React from "react";
import { connect } from "react-redux";
import { reGetHistoryGroup, reGetHistoryProduct } from "../../../reducers/init";
import Image from './../Image';
import { IMAGE_CDN } from "../../../const/API";
interface Props {
    reGetHistoryProduct:Function,
    reGetHistoryGroup: Function,
    resListHistoryGroup:any,
    resListHistoryproduct: any,
    isReLoading?: boolean
}
class ModalHistory extends React.Component<Props, {}> {
    constructor(props){
        super(props)
    }
    getHistoryGroup = () => {
        this.props.reGetHistoryGroup()
    }
    renderListHistoryProduct = () => {
        if (this.props.resListHistoryproduct.length !== 0) {
            const li = this.props.resListHistoryproduct
                .map((itemProduct) => {
                    const number = Number(itemProduct.product_price)
                    return (
                        <div key={itemProduct.product_id} className="col-sm-2 item">
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
    renderListHistoryGroup = () => {
        if (this.props.resListHistoryGroup.length !== 0) {
            const li = this.props.resListHistoryGroup
                .map((itemProduct) => {
                    const number = Number(itemProduct.product_price)
                    return (
                        <div key={itemProduct.product_id} className="col-sm-2 item">
                            <div className="row">
                                <div className="col-sm-12">
                                    <a href={"/products/group/" +itemProduct.product_alias}>
                                        <Image
                                            width={150}
                                            height={150}
                                            src={IMAGE_CDN + itemProduct.product_avatar} />
                                    </a>
                                </div>
                                <div className="col-sm-12">
                                    <a href={"/products/group/" +itemProduct.product_alias}>
                                        <div className="text-center">
                                            <h5 className="info" style={{
                                                marginTop: 16
                                            }}>{itemProduct.product_name}</h5>
                                            <h5>{number.toLocaleString('vi-VN')}đ</h5>
                                        </div>
                                    </a>
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
        return (
            <div className="custom-modal modal text-left" id="my-history" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel1">
                <div className={"modal-dialog modal-xl"} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel1">Lịch sử xem</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <svg viewBox="0 0 8 8" fill="currentColor" width="8" height="8">
                                    <path d="M7.2 0L4 3.2.8 0 .1.7 3.3 4 0 7.3l.7.7L4 4.7 7.3 8l.7-.7L4.7 4 7.9.7z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row" style={{ padding: '0rem 1rem' }}>
                                <ul className="nav nav-tabs" style={{width: '100%'}}>
                                    <li className="nav-item">
                                        <a className="nav-link active"
                                        id="base-tab1" data-toggle="tab"
                                        aria-controls="tab1" href="#tab1" aria-expanded="true">Sản phẩm</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link"
                                        onClick={()=> this.getHistoryGroup()}
                                        id="base-tab2" data-toggle="tab"
                                        aria-controls="tab2" href="#tab2" aria-expanded="false">Nhóm</a>
                                    </li>
                                </ul>
                                <div className="tab-content px-1 pt-1">
                                    <div role="tabpanel" className="tab-pane active" id="tab1" aria-expanded="true" aria-labelledby="base-tab1">
                                       <div className="row">
                                       {this.renderListHistoryProduct()}
                                       </div>
                                    </div>
                                    <div className="tab-pane" id="tab2" aria-labelledby="base-tab2">
                                        <div className="row">
                                        {this.renderListHistoryGroup()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn grey btn-outline-secondary" data-dismiss="modal">Tắt</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (storeState, ownProps) => ({
    resListHistoryGroup: storeState.reInit.resListHistoryGroup,
    resListHistoryproduct: storeState.reInit.resListHistoryProduct,
    isReLoading: ownProps.isReLoading
});
const mapDispatchToProps = {
    reGetHistoryGroup,
    reGetHistoryProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalHistory);