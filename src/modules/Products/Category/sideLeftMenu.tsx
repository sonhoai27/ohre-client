import * as React from 'react';
import {connect} from 'react-redux';
import ContentPlaceholder from '../../../shared/components/ContentPlaceholder';
import { reAllCategory } from '../../Products/ReProduct';

interface Props {
    resAllCategory:any,
    reAllCategory:Function
}
class SideLeftMenu extends React.Component<Props, {}>{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.reAllCategory()
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.resAllCategory)
    }
    renderListCategory = ()=> {
        const categories = this.props.resAllCategory
        .map(element => {
            return (
                <li key={element.category_id} className="list-group-item">
                    <h6 className="text-bold-400"><a href={"/products/brand/"+element.category_alias}>{element.category_name}</a></h6>
                </li>
            )
        })

        return categories
    }
    render(){
        return(
            <div className="card disable-box-shadow">
                <div className="card-header">
                    <h3 className="card-title custom">Danh mục</h3>
                </div>
                <div className="card-content">
                    <div id="side-left-category" className="media-list position-relative ps-container ps-theme-default">
                        <ul className="list-group">
                            <h5 className="title-list">Danh mục</h5>
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
                </div>
                <ContentPlaceholder/>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    resAllCategory: storeState.reProduct.resAllCategory
});
const mapDispatchToProps = {
    reAllCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(SideLeftMenu);
