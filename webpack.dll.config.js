const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')

module.exports = {
    entry: {
        // jquery: ['jquery'],
        // echarts: ['echarts']
        vendor: ['jquery', 'echarts']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, 'dist/js'),
        library: '_dll_[name]'
    },
    plugins: [
        new DllPlugin({
            /*
            该插件的name属性值需要和 output.library保存一致，该字段值，也就是输出的 manifest.json文件中name字段的值。
            比如在jquery.manifest文件中有 name: '_dll_jquery'
            */
            name: '_dll_[name]',
            /* 生成manifest文件输出的位置和文件名称 */
            path: path.join(__dirname, 'dist/js', '[name].manifest.json')
        })
    ]
}