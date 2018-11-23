import React from 'react';
import ReactDOM from 'react-dom';

import styles from './index.scss';

ReactDOM.render(
    <div className={styles.root}>hello world</div>,
    document.getElementById('app'),
    () => {
    },
);

// 设置所有模块接受热更新
if (module.hot) {
    module.hot.accept();
}
