import { resolve } from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import renderHtml from './renderHtml';
import webpackDevConfig from '../../build/dev';

const compiler = webpack(webpackDevConfig);

export default function (app) {
    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));

    app.get('*', (req, res) => {
        res.status('200');
        res.send(renderHtml(resolve(__dirname, '..', '..', 'build-dev/index.html'), req));
    });
}
