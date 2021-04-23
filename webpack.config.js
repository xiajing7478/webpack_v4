const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const dev = require('./config/dev.js')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const webpackDllConfig = require('./webpack.dll.config.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const loader = require('sass-loader')
const threadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
module.exports = {
    entry: ['./src/js/main.js', './src/js/main2.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: './'
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', // 开发
    // devtool: 'cheap-module-source-map' // 生产
    // externals: {
    //     jquery: 'jQuery'
    // },
    resolve: {
        // alias: {
        //     compents: './src/components'
        // },
        extensions: ['.js', '.vue', '.json']
    },
    devServer: {
        port: 8085,
        // host: 'loaclhost',
        headers: {
            'X-foo': '112233'
        },
        historyApiFallback: true,
        // hot: true,
        // inline: true,
        // open: true,
        compress: false, // 为true的时候，它会对所有服务器资源采用gzip进行压缩。
        overlay: true,
        stats: 'errors-only',
        proxy: {
            '/api': {
                target: 'http://news.baidu.com', // 目标接口的域名
                // secure: true,  // https 的时候 使用该参数
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': '' // 重写路径
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'happypack/loader?id=happyBabel',
                // loader: 'babel-loader',
                exclude: /(node_modules)/
            },
            // {
            //     test: /\.css$/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader']
            // },
            {
                test: /\.(scss|css)$/,
                // use: ['happypack/loader?id=happyCSS']
                // use: 'happypack/loader?id=happyCSS',
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg)$/,
                // loader: 'url-loader',
                // options: {
                //   limit: 1000,
                //   name: '[name].[ext]'
                // },
                use: ['happypack/loader?id=image']
            }
            //   {
            //     loader: 'postcss-loader',
            //     options: {
            //         plugins: [
            //             require('autoprefixer')({
            //                 overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']
            //             })
            //         ]
            //     }
            // },
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true
            })
        ]
    },
    plugins: [
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader??cacheDirectory=true'
            }],
            threadPool,
            verbose: true
        }),
        new HappyPack({
            id: 'image',
            loaders: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            }]
        }),
        // new HappyPack({
        //     id: 'happyCSS',
        //     // loaders: [{
        //     //     use: [require('mini-css-extract-plugin').loader, 'css-loader', 'sass-loader']
        //     // }],
        //     // loaders: ['css-loader'],
        //     loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        //     // threadPool,
        //     // verbose: true
        // }),
        new MiniCssExtractPlugin({
            filename: `[name].css`,
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html'
        }),
        new DllReferencePlugin({
            manifest: require('./dist/js/vendor.manifest.json')
        }),
        // new DllReferencePlugin({
        //     manifest: require('./dist/echarts.manifest.json')
        // }),
        // new AddAssetHtmlPlugin({
        //     filepath: path.resolve(__dirname, 'dist/jquery.dll.js'),
        //     outputPath: './',
        //     publicPath: './',
        //     includeSourcemap: false,
        //     hash: false
        // })
        new AutoDllPlugin({
            inject: true,
            filename: '[name].js',
            publicPath: './',
            entry: {
                vendor: [
                    'jquery'
                ]
            }
        }),
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS的参数如下：
            uglifyJS: {
                output: {
                    //是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
                    beautify: false,
                    //是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
                    comments: false
                },
                warnings: false,
                compress: {
                    //是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告
                    // warnings: false,
                    // 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
                    drop_console: true,
                    // 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不转换，为了达到更好的压缩效果，可以设置为false
                    collapse_vars: true,
                    //是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
                    // reduce_vars: true
                }
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false
        //     }
        // }),
    ]
}