import * as React from 'react';
import NavTopMenu from '../../shared/components/header/nav.top.menu';
import SideLeftMenu from './Category/sideLeftMenu'
import ListProduct from './Category/ListProduct';
import BottomFooter from '../../shared/components/footer/bottom.footer';
class ProductCategory extends React.Component {
    render(){
        return(
            <>
                <NavTopMenu isShowing={true}/>
                <div className="app-content content">
                    <div className="content-wrapper">
                        <div className="content-header row"></div>
                        <div className="content-body row">
                            <div className="col-sm-3">
                                <SideLeftMenu/>
                            </div>
                            <div className="col-sm-9">
                                <ListProduct/>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomFooter/>
            </>
        )
    }
}
export default ProductCategory
