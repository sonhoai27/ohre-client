import * as React from "react";
import { reGetProductByPage } from "../../../modules/home/ReHome";
import { connect } from "react-redux";
declare var $: any;
export interface Props {
    totalPage: number
}
export interface PropsRedux {
    resTempProductsForPagination: any,
    reGetProductByPage: Function,
    resListProducts: any,
    currentPage: any
}
class ClientPagination extends React.Component<Props & PropsRedux, {}> {
    constructor(props) {
        super(props)
    }
    addActiveClass = (index: number) => {
        return (index === this.props.currentPage ? 'active' : '')
    }
    renderPagination = () => {
        let pages: any = []
        for (let i = 0; i < this.props.totalPage + 1; i++) {
            pages = [...pages, (
                <li key={i + '-item'} onClick={() => this.getProductPage(i)} className={'page-item ' + this.addActiveClass(i)}><a className="page-link">{i + 1}</a></li>
            )]
        }
        return pages
    }
    getProductPage = async (page) => {
        await this.props.reGetProductByPage(page, this.props.resListProducts)
        $(".loading").addClass("active")
        $(".loading i").addClass("spinner")
        setTimeout(() => {
            $(".loading").removeClass("active")
            $(".loading i").removeClass("spinner")
            window.scrollTo(0, 0);
        }, 1000)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.resListProducts !== this.props.resListProducts) {
            this.props.reGetProductByPage(this.props.currentPage, nextProps.resListProducts)
        }
    }
    render() {
        return (
            <>
                <div className="text-center">
                    <nav aria-label="Page navigation">
                        <ul className="card pagination justify-content-center pagination-separate pagination-curved pagination-flat mb-1">
                            <div className="card-body" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {this.renderPagination()}
                            </div>
                        </ul>
                    </nav>
                </div>
                <div className="loading">
                    <i className="la la-refresh"></i>
                </div>
            </>
        )
    }
}

const mapStateToProps = (storeState, ownProps) => ({
    resTempProductsForPagination: storeState.reHome.resTempProductsForPagination,
    resListProducts: storeState.reHome.resListProducts,
    currentPage: storeState.reHome.currentPage,
    totalPage: ownProps.totalPage // ownProps of this component
});
const mapDispatchToProps = {
    reGetProductByPage
}
export default connect(mapStateToProps, mapDispatchToProps)(ClientPagination);