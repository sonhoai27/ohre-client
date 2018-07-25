import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Index from './modules/index';
import { Provider } from 'react-redux';
import initStore from './configs/store';
import registerServiceWorker from './registerServiceWorker';
import BackToTop from './shared/components/BackToTop';
import ButtonHistory from './shared/components/history/ButtonHistory';
import {Storage} from "./utils/storage-util"

const store = initStore()
ReactDOM.render(
    <Provider store={store}>
        <>
            <Index />
            <BackToTop/>
            {Storage.local.get("access_token") ? <ButtonHistory/> : ''}
        </>
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
