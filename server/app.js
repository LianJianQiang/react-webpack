import { resolve } from "path";

// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');

// const webpackDevConfig = require('../build/dev');
// const renderHtml = require('./middlewares/renderHtml');
const development = require('./middlewares/development').default;
const production = require('./middlewares/production').default;

const HTTP_PORT = 3020;
const app = express();


process.env.NODE_ENV = process.env.NODE_ENV || 'production';

app.set('env', process.env.NODE_ENV);
app.use(bodyParser.json());

const setupAppRoutes = process.env.NODE_ENV === 'development' ? development : production;

setupAppRoutes(app);


app.listen(HTTP_PORT, () => {
    console.log(`HTTP server is now running on http://localhost:${HTTP_PORT}`);
});
