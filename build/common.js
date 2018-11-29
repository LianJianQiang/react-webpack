const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { srcPath, isDev, publicPath } = require('./default');
const manifest = require('../manifest.json');

const _venderName = manifest.name.split('_');
const venderName = _venderName[0] + '.' + _venderName[1];

let baseConfig = {
    entry: {
        app: './app/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isDev ? '[name].js' : '[name].[chunkhash].js',
        // chunkFilename: "[name].chunk.js",
        publicPath: `${publicPath}`
    },
    resolve: {
        extensions: ['.js', '.jsx', ".ts", ".tsx"],
        // 定义别名
        alias: {
            common: `${srcPath}/common`,
            components: `${srcPath}/components`,
            containers: `${srcPath}/containers`,
            static: `${srcPath}/static`,
            styles: `${srcPath}/styles`,
            utils: `${srcPath}/utils`,
            router: `${srcPath}/router`
            // 解决Ant Design中Carousel组件在scale情况下计算宽度错误的bug
            // 'react-slick': path.resolve(__dirname, 'src/vender/react-slick')
        },
        // 告诉webpack解析模块时应该搜索哪些目录
        modules: [srcPath, "node_modules"]
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            },
            {
                test: /\.(js|jsx)$/,
                include: srcPath,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192, // <= 8kb的图片base64内联
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'images/'
                }
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192, // <= 8kb的base64内联
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'fonts/'
                }
            }
        ]
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../manifest.json')
        }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     children: true,
        //     minChunks: 2
        // }),
        new HtmlWebpackPlugin({
            title: 'Test',
            filename: './index.html',
            template: './app/index.html',
            favicon: './app/favicon.ico',
            hash: true
        }),

        new CopyWebpackPlugin([
            { from: 'lib', to: '' }
        ]),

        new HtmlWebpackIncludeAssetsPlugin({
            assets: [`${venderName}.js`],
            append: false
        })
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: ['env-config.js'],
        //     append: false,
        //     hash: true
        // }),
        // new HtmlWebpackHarddiskPlugin()
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        // })
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server', // static/disabled
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: '8888'
        // })


        // new webpack.ProvidePlugin({
        //     _: 'lodash'
        // }),
        // new webpack.HashedModuleIdsPlugin()
    ]
};

exports.scssRules = {
    test: /\.scss$/,
    include: srcPath,
    use: [
        {
            loader: "style-loader"
        },
        {
            loader: "css-loader",
            options: {
                modules: true,
                camelCase: true,
                localIdentName: '[local]_[hash:base64:5]',
                minimize: true
            }
        },
        {
            loader: 'postcss-loader',    // 自动添加css前缀
        },
        {
            loader: "sass-loader"
        }
    ]
};


exports.baseConfig = baseConfig;
