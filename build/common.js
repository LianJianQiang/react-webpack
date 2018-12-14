const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const { srcPath, isDev, publicPath } = require('./default');


let baseConfig = {
    entry: [
        '@babel/polyfill',
        path.join(__dirname, '../src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
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
                test: /\.(js|jsx)$/,
                include: srcPath,
                enforce: "pre",
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: isDev ? '[name].[ext]' : 'assets/css/font/[name]_[hash:7].[ext]'
                }
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
                options: {
                    name: isDev ? '[name].[ext]' : 'assets/css/font/[name]_[hash:7].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: isDev ? '[name].[ext]' : 'assets/img/[name]_[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|ogg)$/,
                loader: 'file-loader',
            }
        ]
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, '/../'),
            manifest: require('../manifest.json')
        }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     children: true,
        //     minChunks: 2
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Test',
        //     // filename: './index.html',
        //     template: './app/index.html',
        //     favicon: './app/favicon.ico',
        //     hash: true
        // }),

        // new CopyWebpackPlugin([
        //     { from: 'lib', to: '' }
        // ]),
        //
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: [`${venderName}.js`],
        //     append: false
        // })
    ]
};


exports.cssRules = {
    test: /\.css$/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader'
        }
    ]
};

exports.lessRules = {
    test: /\.less/,
    // include: /node_modules/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader'
        },
        {
            loader: 'less-loader'
        }
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
                minimize: true,
                sourceMap: !isDev
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
