const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { resolvePath } = require('./utils');

// 需要单独打包到lib
const vendors = [
    'react',
    'react-dom',
    'react-router-dom',
    'react-loadable'
];

module.exports = {
    devtool: 'source-map',
    mode: 'production',
    entry: {
        lib: vendors
    },
    output: {
        path: resolvePath('lib'),
        filename: '[name].[chunkhash:8].js',
        library: '[name]_[chunkhash:8]'
    },
    plugins: [
        new CleanWebpackPlugin(['lib'], {
            root: resolvePath('./')     // 将目录指向根目录
        }),

        // 创建dll的bundle
        new webpack.DllPlugin({
            path: 'manifest.json',  // manifest文件的输出路径
            name: '[name]_[chunkhash:8]',   // dll暴露的对象名,跟output.library保持一致
            context: __dirname       // 解析包路径的上下文
        }),

        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
};
