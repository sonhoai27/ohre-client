import * as React from 'react';
import { connect } from 'react-redux';
import { reProductDetail } from '../../modules/Products/ReProduct';
import { rePushProductShop } from '../../reducers/init';
import { Storage } from '../../utils/storage-util';
declare var $:any;
interface Props {
    match?: any,
    resProductDetail:any,
    reProductDetail:Function,
    rePushProductShop:Function
}
class ConnectShop extends React.Component<Props, {}> {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.reProductDetail(this.props.match.params.idProduct)
        this.props.rePushProductShop({
            idUser: Storage.local.get("access_token"),
            idProduct: this.props.match.params.idProduct
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.resProductDetail != this.props.resProductDetail){
            this.showProgress()
        }
    }
    gotoShop = () => {
        window.location.href = this.props.resProductDetail.product_url_website
    }
    showProgress = () => {
        let counter = 0;
        let c = 0;
        let i = setInterval(() => {
            $(".loading-redirect-page .counter h1").html(c + "%")
            $(".loading-redirect-page .counter hr").css("width", c + "%")
            counter++;
            c++
            if (counter == 101) {
                clearInterval(i)
               // this.gotoShop()
            }
        }, 20);
    }
    render() {
        return (
            <>
                <div className="app-content content" style={{ marginTop: 0 }}>
                    <div className="content-wrapper">
                        <div className="content-header row">
                        </div>
                        <div className="content-body">
                            <section className="flexbox-container">
                                <div className="col-12 d-flex align-items-center justify-content-center">
                                    <div className="col-md-4 col-10 box-shadow-2 p-0">
                                        <div className="card border-grey border-lighten-3 m-0">
                                            <div className="card-header border-0">
                                                <div className="card-title text-center">
                                                    <img src="http://localhost:8080/ohre/public/images/cdn/ohre.png" width={'20%'} alt="branding logo" />
                                                </div>
                                                <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                                                    <span>Bạn đang chuyển đến</span>
                                                </h6>
                                            </div>
                                            <div className="card-content">
                                                <div className="card-body pt-0">
                                                    <h3 className="card-subtitle text-center">
                                                        <span>{this.props.resProductDetail.shop_name}</span>
                                                    </h3>
                                                    <p className="text-center margin-top-16">{this.props.resProductDetail.product_name}</p>
                                                    <div className="loading-redirect-page text-center">
                                                        <div className="counter">
                                                            <h1>0%</h1>
                                                            <hr />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (storeState, ownState) => ({
    match: ownState.match,
    resProductDetail:storeState.reProduct.resProductDetail
});
const mapDispatchToProps = {
    reProductDetail,
    rePushProductShop
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectShop);