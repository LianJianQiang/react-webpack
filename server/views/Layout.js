import React, { Component, PropTypes } from 'react';

class Default extends Component {
    render() {
        const { children } = this.props;
        return (
            <html>
            <head>
                <meta charset="utf-8"/>
                <title>PMS</title>
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                <meta name="description" content=""/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            </head>
            <body>
            <div id="app" class="app-content">
                {children}
            </div>
            <script>__REACT_DEVTOOLS_GLOBAL_HOOK__ = parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;</script>
            </body>
            </html>
        )
    }
}