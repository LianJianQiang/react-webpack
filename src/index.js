import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Router from './router';

const render = (Component) => {
    ReactDOM.render(
        <BrowserRouter>
            <Component/>
        </BrowserRouter>,
        document.getElementById('app'),
        () => {
        }
    );
};


window.onload = function () {
    // load app
    render(Router);
};

// 设置所有模块接受热更新
if (module.hot) {
    module.hot.accept();
}
