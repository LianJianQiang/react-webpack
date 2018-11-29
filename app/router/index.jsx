import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import Main from 'containers/Main';

class Router extends React.PureComponent {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact render={(props) => {
                        return (
                            <Main {...props}/>
                        );
                    }}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default Router;
