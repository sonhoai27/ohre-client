import * as React from 'react';
import NavTopMenu from '../../shared/components/header/nav.top.menu';
import MainSearch from './MainSearch';
import HomeCategory from './HomeCategory';
import HotProducts from './HotProducts';
import Ads from './Ads';
import BottomFooter from '../../shared/components/footer/bottom.footer';
import {connect} from 'react-redux';
import {reLogin} from './ReHome';

interface Props {
    reLogin: Function,
    responseLogin: any
}
class Home extends React.Component<Props, {}> {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        // this.props.reLogin({
        //     email: 'sonhoai272@gmail.com',
        //     password:'sontungmtp27'
        // })
    }
    render() {
        return <>
            <NavTopMenu/>
            <div className="app-content content">
                <MainSearch/>
                <HomeCategory/>
                <HotProducts/>
                <Ads/>
                <BottomFooter/>
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
