import * as React from 'react';
import NavTopMenu from '../../shared/components/header/nav.top.menu';
import MainSearch from './MainSearch';
import HomeCategory from './HomeCategory';
import HotProducts from './HotProducts';
import Ads from './Ads';
import BottomFooter from '../../shared/components/footer/bottom.footer';
import BackToTop from '../../shared/components/BackToTop';

class Home extends React.Component {
    render() {
        return (
            <>
                <NavTopMenu/>
                <div className="app-content content">
                    <MainSearch/>
                    <HomeCategory/>
                    <HotProducts/>
                    <Ads/>
                    <BottomFooter/>
                </div>
                <BackToTop/>
            </>
        );
    }
}

export default Home;
