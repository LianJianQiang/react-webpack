import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router';

const render = (Component) => {
    ReactDOM.render(
        <Component/>,
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
