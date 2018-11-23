const { resolvePath } = require('./utils');

const isDev = process.env.NODE_ENV === 'development';
const srcPath = resolvePath('app');

module.exports = {
    srcPath,
    isDev,
    publicPath: isDev ? '/' : './'
};
