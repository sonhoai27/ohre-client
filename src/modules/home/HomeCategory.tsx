import * as React from 'react';
import ModalList from '../../shared/components/modals/ModalList';
import {connect} from 'react-redux';
import {reAllCategory} from './ReHome';
declare const $: any;
interface Props {
    resAllCategory:any,
    reAllCategory: Function
}
class HomeCategory extends React.Component<Props, {}> {
    constructor(props){
        super(props)
    }
    showListCategory = ()=> {
        this.props.reAllCategory()
        $("#all-list-category").modal('show')
    }
    render() {
        return (
            <div className="content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 home-category-title">
                            <h3 className="content-header-title mb-0 d-inline-block">
                                <span>Danh mục</span>
                            </h3>
                        </div>
                        <div className="col-sm-12">
                            <div className="home-category">
                                <div className="card disable-box-shadow">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <i className="icon-screen-smartphone"></i>
                                            <h4 className="card-title info">Phones</h4>
                                            <p>Samsung, Apple</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card disable-box-shadow">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <i className="icon-screen-tablet"></i>
                                            <h4 className="card-title info">Tablet</h4>
                                            <p>Samsung, Apple</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card disable-box-shadow">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <i className="la la-magic"></i>
                                            <h4 className="card-title info">Make Up</h4>
                                            <p>Mac, Shu Reemura</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card disable-box-shadow">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <i className="la la-stethoscope"></i>
                                            <h4 className="card-title info">Health</h4>
                                            <p>Nokia, Withings</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card disable-box-shadow">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <i className="la la-black-tie"></i>
                                            <h4 className="card-title info">Clothes</h4>
                                            <p>Cucci, Channel</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card disable-box-shadow">
                                    <div className="card-content">
                                        <div className="card-body"  onClick={this.showListCategory}>
                                            <i className="icon-arrow-right"></i>
                                            <h4 className="card-title info">More</h4>
                                            <p>Foods, TV</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalList list={this.props.resAllCategory} size="modal-lg"/>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    resAllCategory: storeState.reHome.resAllCategory
});
const mapDispatchToProps = {
    reAllCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeCategory);