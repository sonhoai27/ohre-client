import * as React from 'react';
import { connect } from 'react-redux';
import { reAllCategory } from '../../Products/ReProduct';
import { reCategoryBrand } from './../ReProduct';

interface Props {
    match?: any,
    resAllCategory: any,
    resCategoryBrand: any,
    reAllCategory: Function,
    reCategoryBrand: Function
}
class SideLeftMenu extends React.Component<Props, {}>{
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.reAllCategory()
        if (this.getIdCategory() != 0) {
            this.props.reCategoryBrand(this.getIdCategory())
        }
    }
    componentWillReceiveProps(nextProps) {
    }
    renderListCategory = () => {
        const categories = this.props.resAllCategory
            .map(element => {
                return (
                    <li key={element.category_id} className="list-group-item">
                        <h6 className={`text-bold-${this.addActiveCate(element.category_id, this.getIdCategory())}`}>
                            <a href={"/products/category/all/" + element.category_id + "-" + element.category_alias}>
                                {element.category_name}
                            </a>
                        </h6>
                    </li>
                )
            })

        return categories
    }
    renderListBrand = () => {
        const brands = (this.props.resCategoryBrand.brand ? this.props.resCategoryBrand.brand : [])
            .map(element => {
                return (
                    <li key={element.brand_id} className="list-group-item">
                        <h6 className={`text-bold-${this.addActiveCate(element.brand_id, this.getIdBrand())}`}>
                            <a href={"/products/category/brand/" + this.getIdCategory() + "/" + element.brand_id + "-" + element.brand_alias}>
                                {element.brand_name}
                            </a>
                        </h6>
                    </li>
                )
            })

        return brands
    }
    getIdCategory = () => {
        const cate = this.props.match.params.idCategory
        if (cate) {
            return parseInt((cate.split("-"))[0], 10)
        } else {
            return 0
        }
    }
    getIdBrand = () => {
        const cate = this.props.match.params.idBrand
        if (cate) {
            return parseInt((cate.split("-"))[0], 10)
        } else {
            return 0
        }
    }
    addActiveCate = (idCate, currentId) => {
        if (idCate == currentId) {
            return 600
        }
        return 400
    }
    render() {
        return (
            <div className="card disable-box-shadow">
                <div className="card-header">
                    <h3 className="card-title custom">Danh mục</h3>
                </div>
                <div className="card-content">
                    <div id="side-left-category" className="media-list position-relative ps-container ps-theme-default">
                        <h5 className="title-list">Danh mục</h5>
                        <ul className="list-group" id="custom-scroll-bar" style={{
                            height: '300px',
                            overflowY: 'scroll'
                        }}>
                            {/* <li className="list-group-item">
                                <input id='two1' type='checkbox' className="checkbox"/>
                                <label htmlFor='two1'>
                                    <span></span>
                                    <h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>
                                </label>
                                <h6 className="text-bold-400" style={{margin: 0}}>Cras justo odio</h6>
                            </li> */}
                            {this.renderListCategory()}
                        </ul>
                    </div>
                    {this.getIdCategory() != 0 ? (
                        <div id="side-left-category" className="media-list position-relative ps-container ps-theme-default">
                            <h5 className="title-list">Hãng của "{this.props.resCategoryBrand.nameCate}"</h5>
                            <ul className="list-group" id="custom-scroll-bar" style={{
                                height: '300px',
                                overflowY: 'scroll'
                            }}>
                                {this.renderListBrand()}
                            </ul>
                        </div>
                    ) : ''}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (storeState, ownProps) => ({
    resAllCategory: storeState.reProduct.resAllCategory,
    match: ownProps.match,
    resCategoryBrand: storeState.reProduct.resCategoryBrand
});
const mapDispatchToProps = {
    reAllCategory,
    reCategoryBrand
}
export default connect(mapStateToProps, mapDispatchToProps)(SideLeftMenu);
