import 'scss/style.scss';

import { AppContainer }     from 'react-hot-loader';
//Core
import React                from 'react';
import { render }           from 'react-dom';
import { Provider }         from 'react-redux';
// Store
import store                from 'store';
// Root
import Root                 from './roots';

const renderRouter = (Component, element) => {
    render(
        <AppContainer>
            <Provider store={ store }>
                <Component />
            </Provider>
        </AppContainer>,
        element
    );
};

const main = document.getElementById('main');

if (main) {
    renderRouter(Root, main);
}

if (module.hot) {
    module.hot.accept([
        './roots'
    ], () => {

        if (main) {
            const newRoot = require('./roots').default;
            renderRouter(newRoot, main);
        }
    });
}