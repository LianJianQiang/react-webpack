import React from 'react';
import _ from 'lodash';

import styles from './index.scss';

class Test extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                Test
                <div>
                    {
                        _.join(['asdfasd', 'asdfasdf'], '~')
                    }
                </div>
            </div>
        );
    }
}

export default Test;
