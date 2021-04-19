const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const dev =require('./config/dev.js')
module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', // 开发
    // devtool: 'cheap-module-source-map' // 生产
    externals: {
        jquery: 'jQuery'
    },
    resolve: {
        alias: {
            compents: './src/components'
        },
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
              changeOrigin: true,  // 是否跨域
              pathRewrite: {
                '^/api' : ''  // 重写路径
              }
            }
          }
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: `[name].css`
        })
    ]
}