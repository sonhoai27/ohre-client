import * as React from 'react';
import Image from './../../shared/components/Image';
import { reRecommed, rePaginationRecommend } from './ReHome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGE_CDN } from '../../const/API';

interface Props {
    reRecommed: Function,
    resRecommed: any,
    rePaginationRecommend: Function,
    listTempRecommed: any
}
interface State {
    currentPage: number
}
class HotProducts extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1
        }
    }
    componentDidMount() {
        this.props.reRecommed()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.resRecommed != this.props.resRecommed) {
            this.props.rePaginationRecommend(this.state.currentPage, nextProps.resRecommed)
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    }
    showMoreProduct = async () => {
        await this.props.rePaginationRecommend(this.state.currentPage, this.props.resRecommed)
        this.setState({
            currentPage: this.state.currentPage + 1
        })
    }
    renderListRecommendProduct = () => {
        const list = this.props.listTempRecommed.map((element, index) => {
            const number = Number(element.product_price)
            return (
                <div className="col-sm-3 item" key={element.product_id + element.product_price + index}>
                    <Link to={`/products/` + (isNaN(element.product_url_website) ? 'detail' : 'group') + `/`
                        + (isNaN(element.product_url_website) ? element.product_id + "-" : '')
                        + element.product_alias} title={element.product_name}>
                        <div className="row">
                            <div className="col-12 image">
                                <Image
                                    width={190}
                                    height={190}
                                    src={IMAGE_CDN + element.product_avatar} />
                            </div>
                            <div className="col-12 info">
                                <h5>{element.product_name}</h5>
                                <h5>{number.toLocaleString('vi-VN')}đ</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })

        return list
    }
    render() {
        return (
            <>
                {this.renderListRecommendProduct()}
                {this.state.currentPage !== Math.ceil(this.props.resRecommed.length / 8) + 1 ? (
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
            </>
        )
    }
}

const mapStateToProps = (storeState, ownProps) => ({
    resRecommed: storeState.reHome.resRecommed,
    listTempRecommed: storeState.reHome.listTempRecommed
});
const mapDispatchToProps = {
    reRecommed,
    rePaginationRecommend
}
export default connect(mapStateToProps, mapDispatchToProps)(HotProducts);