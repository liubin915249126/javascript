const path = require('path')
const webpack = require('webpack')
/**
 * 尽量减小搜索范围
 * target: '_dll_[name]' 指定导出变量名字
 */
module.exports = {
    entry: {
        vendor: ['jquery', 'lodash']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].dll.js',
        library: '_dll_[name]' // 全局变量名，其他模块会从此变量上获取里面模块
    },
    // manifest是描述文件
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dist', 'manifest.json')
        })
    ]
}
// webpack.config.js
/*找到上一步生成的`manifest.json`文件配置到`plugins`里面*/
new webpack.DllReferencePlugin({
    manifest: require(path.join(__dirname, '..', 'dist', 'manifest.json')),
})