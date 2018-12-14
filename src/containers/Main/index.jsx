import React from 'react';

import Test from './Test';
import styles from './index.scss';

class Main extends React.Component {
    bootstrap() {
        console.log('aaaaaaaaaaaaaaaaaaa');
    }

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
