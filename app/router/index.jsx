import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from 'containers/Main';
import Home from 'containers/Home';
import Login from 'containers/Login';

const notFound = () => {
    return <div>404</div>;
};

class Router extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" name="login" component={Login}/>
                <Route path="/main" name="main" component={Main}/>
                <Route component={notFound}/>
            </Switch>
        );
    }
}

export default Router;
