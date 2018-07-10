import * as React from 'react';
import {connect} from 'react-redux';
import { reSearchProduct } from './ReHome';
import delay from '../../utils/delay';
import { NavLink } from 'react-router-dom';
interface Props {
    resListProducts:any,
    reSearchProduct:Function
}
interface State {
    isSearching: boolean,
    isShow: boolean,
    keySearch: any
}
class MainSearch extends React.Component<Props, State> {
    constructor(props:any){
        super(props)
        this.state = {
            isSearching: false,
            isShow: false,
            keySearch: ""
        }
    }

    eventSearch = (e:any)=> {
        const value = e.target.value
        this.setState({
            keySearch: value
        })
        if(!this.state.isShow && value !== ''){
            this.setState({
                isSearching: !this.state.isSearching,
                isShow: !this.state.isShow
            })
        } else if(e.keyCode === 13 && this.state.isShow && value !== ''){
            window.location.assign(`/search/${value}`)
        }else if(e.keyCode !== 13 && this.state.isShow && value !== ''){
            delay(()=> {
                this.props.reSearchProduct(value)
            }, 1000)
        }
    }
    closeResultSearch =(e:any)=> {
        if(e.target.value === ''){
            this.setState({
                isSearching: false,
                isShow: false
            })
        }
    }
    renderListProductSearch = ()=> {
       if(this.props.resListProducts.length !== 0){
        let li = this.props.resListProducts.slice(0, 3)
        .map((itemProduct:any, index:number)=> {
            const number  = Number(itemProduct.product_price)
            return(
                <li key={itemProduct.product_id}>
                    <NavLink to={"./product/detail/"+itemProduct.product_id+"-"+itemProduct.product_alias}>
                        <h5>{itemProduct.product_name}</h5>
                        <p>{number.toLocaleString('vi-VN')}đ</p>
                        <p className="info">{itemProduct.shop_name}</p>
                    </NavLink>
                </li>
            )
        })
        li = [...li,(
            <li key="item-0-0">
                <NavLink style={{borderBottom: 0}} to={`./search/${this.state.keySearch}`}>
                        <h5>Xem thêm</h5>
                </NavLink>
            </li>
        ) ]
        return li
       }else {
           return (
               <li>Không có.</li>
           )
       }
    }
    render() {
        return (
            <div className="content-wrapper main-search" style={{padding: 0}}>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <div className="fast-search">
                            <div className="content-search">
                                <input type="text" name="input-main-search"
                                       placeholder="What are you looking for?"
                                       className="form-control"
                                       onKeyUp={(e)=> this.eventSearch(e)}
                                       onChange={(e)=> this.closeResultSearch(e)}
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
                                            }}></i>
                            </div>
                            <div className={this.state.isSearching ? 'result active': 'result'}>
                             <ul>
                             {this.renderListProductSearch()}
                             </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = storeState => ({
    resListProducts:storeState.reHome.resListProducts
});
const mapDispatchToProps = {
    reSearchProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(MainSearch);