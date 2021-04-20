# webpack_v4
1. .babelrc
2. scss
   node-sass, sass-loader
3. postcss
4. webpack3提取公用css用extract-text-webpack-plugin， webpack4用mini-css-extract-plugin
5. webpack4用new webpack.optimize.UglifyJsPlugin()报错， 可以安装uglifyjs-webpack-plugin插件。--mode production 表示生产环境,只要配置在package.json的script里面 js自动就压缩了
6. 增加webpack.dll.config
