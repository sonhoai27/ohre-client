import * as React from 'react';
import NavTopMenu from '../../shared/components/header/nav.top.menu';
import MainSearch from './MainSearch';
import HomeCategory from './HomeCategory';
class Home extends React.Component {
    render() {
        return (
            <>
                <NavTopMenu/>
                <MainSearch/>
                <HomeCategory/>
            </>
        );
    }
}

export default Home;
