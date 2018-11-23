const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { resolvePath } = require('./utils');
const common = require('./common.js');

common.scssRules.use = ExtractTextPlugin.extract({
    fallback: common.scssRules.use.splice(0, 1)[0], // 当CSS不被提取时，使用style-loader将css加载到js中去
    use: common.scssRules.use // 将资源转换为CSS导出模块的加载程序（必需）
});

module.exports = merge(common.baseConfig, {
    devtool: 'source-map',
    mode: 'production',
    module: {
        rules: [
            common.scssRules
        ]
    },
    plugins: [
        // 每次打包前先清理dist目录
        new CleanWebpackPlugin(['dist'], {
            root: resolvePath('./')
        }),

        new UglifyJSPlugin({
            sourceMap: true
        }),

        // 提取样式表文件
        new ExtractTextPlugin('styles.css')
    ]
});
