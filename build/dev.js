const merge = require('webpack-merge');
// const webpack = require('webpack');

const common = require('./common.js');

module.exports = merge(common.baseConfig, {
    devtool: 'eval',
    mode: 'development',
    module: {
        rules: [
            common.scssRules
        ]
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin({})
    ],
    devServer: {
        contentBase: '../dist',
        host: '127.0.0.1',
        compress: true,
        port: 8801
        // 需要webpack.HotModuleReplacementPlugin才能完全启用HMR。
        // 如果使用--hot选项启动webpack或webpack-dev-server，则会自动添加该插件，因
        // 此您可能不需要将其添加到webpack.config.js中
        // 注意：热更新(HMR)不能和[chunkhash]同时使用
        //hot: true
    }
});
