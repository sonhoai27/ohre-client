import * as React from 'react';
import NavTopMenu from '../../shared/components/header/nav.top.menu';
import MainSearch from './MainSearch';
import HomeCategory from './HomeCategory';
import HotProducts from './HotProducts';
import Ads from './Ads';
import BottomFooter from '../../shared/components/footer/bottom.footer';
import { connect } from 'react-redux';
import { reLogin } from './ReHome';

interface Props {
    reLogin: Function,
    responseLogin: any
}
class Home extends React.Component<Props, {}> {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // this.props.reLogin({
        //     email: 'sonhoai272@gmail.com',
        //     password:'sontungmtp27'
        // })
    }
    render() {
        return <>
            <NavTopMenu isTrans={true} isShowing={false} />
            <div className="app-content content" style={{ marginTop: 0 }}>
                <MainSearch />
                <HomeCategory />
                <div className="full" style={{ background: '#fff', margin: '64px 0 100px 0' }}>
                    <div className="content-wrapper list-product">
                        <div className="container">
                            <div className="card row disable-box-shadow recommend">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12 home-category-title" style={{ marginBottom: 0 }}>
                                            <h3 className="content-header-title mb-0 d-inline-block">
                                                <span>Xem nhiều</span>
                                            </h3>
                                        </div>
                                        <HotProducts />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Ads />
                <BottomFooter />
            </div>
        </>;
    }
}
const mapStateToProps = storeState => ({
    responseLogin: storeState.reHome.responseLogin
});
const mapDispatchToProps = {
    reLogin
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
