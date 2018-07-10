import * as React from 'react';
import NavTopMenu from '../../shared/components/header/nav.top.menu';
import { reSearchProduct } from './ReHome';
import {IMAGE_CDN} from "../../const/API"
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

interface Props {
    match?: any,
    resListProducts:any,
    reSearchProduct:Function
}
interface State {
    price:any
}
class SearchPage extends React.Component<Props, State> {
    constructor(props){
        super(props)
        this.state = {
            price: this.formatNumber('100000')
        }
    }
    priceHandle = (e)=> {
        this.setState({
            price: this.formatNumber(e.target.value)
        })
    }
    formatNumber = (number:any)=> {
        const numberLen = number.length
        let listNumber = ''
        let dem = 0
        for(let index = numberLen - 1; index >= 0; index--){
            if(dem < 2){
                listNumber = number[index] + listNumber;
                dem = dem + 1;
            }else {
                listNumber = '.'+number[index] + listNumber;
                dem = 0;
            }
        }
        if(listNumber.indexOf('.') === 0){
            listNumber = listNumber.slice(listNumber.indexOf('.')+1)
        }
        return listNumber
    }

    componentDidMount(){
        this.props.reSearchProduct(this.props.match.params.keySearch)
    }
    renderListProductSearch = ()=> {
        if(this.props.resListProducts.length !== 0){
         const li = this.props.resListProducts
         .map((itemProduct:any, index:number)=> {
             const number  = Number(itemProduct.product_price)
             return(
                 <div key={itemProduct.product_id} className="list-group-item list-group-item-action media">
                     <NavLink className="media-link" to={"./product/detail/"+itemProduct.product_id+"-"+itemProduct.product_alias}
                        style={{
                                display: 'inline-block',
                                width: '100%'
                            }}
                        >
                        <span className="media-left">
                                <img className="media-object img-fluid" src={IMAGE_CDN+itemProduct.product_avatar}
                                alt="Generic placeholder image" style={{width: "100px"}}/>
                        </span>
                        <span className="media-body">
                            <h3>{itemProduct.product_name}</h3>
                            <h5 className="success">{number.toLocaleString('vi-VN')}đ</h5>
                        </span>
                     </NavLink>
                 </div>
             )
         })
            return li
        }else {
            return (
                <h3>Không có.</h3>
            )
        }
     }
    render() {
        console.log(this.props.match.params.keySearch)
        console.log("AA: "+this.state.price)
        return (
            <>
                <NavTopMenu/>
                <div className="app-content content custom-search-page">
                    <div className="content-header row">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8">
                                    <div className="fast-search">
                                        <div className="content-search">
                                            <input type="text" name="input-main-search"
                                                   placeholder="Bạn muốn tìm gì?"
                                                   className="form-control"
                                                   style={
                                                       {
                                                           padding: 15,
                                                           borderRadius: '4px 0px 0px 4px',
                                                           border: 'unset'
                                                       }
                                                   }/>
                                            <i className="la la-search" style={{
                                                borderRadius: '0px 4px 4px 0px',
                                                background: 'var(--yellow)',
                                                padding: '15px',
                                                color: 'var(--white)'
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="row" style={{marginTop: 16}}>
                                        <div className="col-sm-12 list-sort">
                                            <select className="form-control" id="category" name="category">
                                                <option>Danh mục</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                                <option>Option 4</option>
                                                <option>Option 5</option>
                                            </select>
                                            <select className="form-control" id="brand" name="brand">
                                                <option>Hãng</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                                <option>Option 4</option>
                                                <option>Option 5</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-12" style={{marginTop: 16}}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                color: '#fff'
                                            }}>
                                                <span>Giá: </span>
                                                <span>tối ta {this.state.price+'đ'}</span>
                                            </div>
                                            <input type="range"
                                                   max={50000000} min={100000}
                                                   className="slider" style={{width: '100%'}} onChange={(e)=> this.priceHandle(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-2">
                                </div>
                                <div className="col-sm-8">
                                    <div className="media-list list-group">
                                        {this.renderListProductSearch()}
                                    </div>
                                </div>
                                <div className="col-sm-2">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = storeState => ({
    resListProducts:storeState.reHome.resListProducts
});
const mapDispatchToProps = {
    reSearchProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);