import { resolve } from "path";

// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');

// const webpackDevConfig = require('../build/dev');
const renderHtml = require('./middlewares/renderHtml');

const HTTP_PORT = 3020;
const app = express();

app.set('env', process.env.NODE_ENV);

app.use(bodyParser.json());

// const compiler = webpack(webpackDevConfig);

// app.use(webpackDevMiddleware(compiler));
// app.use(webpackHotMiddleware(compiler));
const clientBuildPath = resolve(__dirname, '..', 'dist');
app.use('/', express.static(clientBuildPath));

app.get('*', (req, res) => {
    res.status('200');
    res.send(renderHtml(resolve(clientBuildPath, 'index.html'), req));
});

app.listen(HTTP_PORT, () => {
    console.log(`HTTP server is now running on http://localhost:${HTTP_PORT}`);
});
