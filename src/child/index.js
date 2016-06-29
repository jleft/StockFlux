import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './containers/App';
import 'babel-polyfill';

import './assets/styles/style.less';

fin.desktop.main(() => {
    const store = window.opener.store;
    const windowName = window.fin.desktop.Window.getCurrent().name;

    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
});
