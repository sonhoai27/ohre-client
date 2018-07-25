import * as React from 'react';
import ModalList from '../../shared/components/modals/ModalList';
import { connect } from 'react-redux';
import { reAllCategory } from './ReHome';
declare const $: any;
interface Props {
    resAllCategory: any,
    reAllCategory: Function
}
class HomeCategory extends React.Component<Props, {}> {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.reAllCategory()
    }
    showListCategory = () => {
        $("#all-list-category").modal('show')
    }
    renderListCategory = () => {
        const temp = [...[], ...this.props.resAllCategory]
        console.log("AA", temp)
        const aPartOfCate = temp.slice(0, 16)
        const colOpen = "<div class='col-sm-3'>"
        const close = "</div>"
        let dem = 0
        let list = ""
        aPartOfCate.forEach((element, index) => {
            let cal = Math.ceil((index + 1) / 4)
            if (cal == dem) {
                list += `<div class='item'>
                        <a href="/products/category/all/`+ element.category_id + `-` + element.category_alias + `">
                        ${element.category_name}
                        </a>
                        </div>`
            } else {
                if (dem != 0) {
                    list += close
                }
                dem = cal
                list += colOpen
                list += `<div class='item'>
                        <a href="/products/category/all/`+ element.category_id + `-` + element.category_alias + `">
                        ${element.category_name}
                        </a>
                        </div>`
            }
        })
        list += close
        return list
    }
    render() {
        this.renderListCategory()
        return (
            <div className="content-wrapper parent-transform">
                <div className="container transform">
                    <div className="row">
                        <div className="col-sm-12 home-category-title" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <h3 className="text-center content-header-title mb-0 d-inline-block">
                                <span>Danh mục</span>
                            </h3>
                            <p
                                className="action"
                                style={{ marginBottom: 0 }}
                                onClick={() => this.showListCategory()}>
                                Tất cả
                                </p>
                        </div>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="home-category" dangerouslySetInnerHTML={{ __html: this.renderListCategory() }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalList list={this.props.resAllCategory} size="modal-lg" />
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