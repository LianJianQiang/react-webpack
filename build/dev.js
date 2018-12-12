const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const common = require('./common.js');
const { resolvePath } = require('./default');

const libName = require('../manifest').name;

const devPort = 8801;

let config = merge(common.baseConfig, {
    // entry: [
    //     // 'react-hot-loader/patch', // RHL patch
    //     // '@babel/polyfill',
    //     // 'webpack-dev-server/client?http://127.0.0.1:' + devPort,
    //     // 'webpack/hot/only-dev-server',
    //     './app/index.js'
    // ],
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    module: {
        rules: [
            common.cssRules,
            common.lessRules,
            common.scssRules
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolvePath('app/index.html'),
            favicon: resolvePath('app/favicon.ico'),
        }),

        new CopyWebpackPlugin([
            {
                from: `lib/${libName}.js`,
                to: ''
            }
        ]),

        new HtmlWebpackIncludeAssetsPlugin({
            // files: ['index.html'],
            assets: [`${libName}.js`],
            append: false
        }),

        // new webpack.HotModuleReplacementPlugin(),       // TODO ?
        // new webpack.NoEmitOnErrorsPlugin()              // TODO ?
    ],
    devServer: {
        // contentBase: '',
        host: '127.0.0.1',
        compress: true,
        port: devPort,
        historyApiFallback: {
            index: path.resolve(__dirname, '../dist/')
        }
        // 需要webpack.HotModuleReplacementPlugin才能完全启用HMR。
        // 如果使用--hot选项启动webpack或webpack-dev-server，则会自动添加该插件，因
        // 此您可能不需要将其添加到webpack.config.js中
        // 注意：热更新(HMR)不能和[chunkhash]同时使用
        //hot: true
    }
});


module.exports = config;
