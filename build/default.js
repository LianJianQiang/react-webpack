'use strict';
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const resolvePath = dir => path.join(__dirname, '..', dir);
const srcPath = resolvePath('app');

module.exports = {
    srcPath: srcPath,
    publicPath: isDev ? '/' : './',
    resolvePath,
    isDev,
};
