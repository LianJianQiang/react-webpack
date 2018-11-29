import React from 'react';

import Test from './Test';
import styles from './index.scss';

class Main extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                ceshi
                <Test/>
            </div>
        );
    }
}

export default Main;
