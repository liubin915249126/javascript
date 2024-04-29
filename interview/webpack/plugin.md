#### plugin

new webpack.HotModuleReplacementPlugin(), // 热更新插件
terser-webpack-plugin
ParallelUglifyPlugin

#### compression-webpack-plugin

new CompressionPlugin({
// gzip 压缩配置
test: /\.js$|\.html$|\.css/, // 匹配文件名
threshold: 10240, // 对超过 10kb 的数据进行压缩
deleteOriginalAssets: false, // 是否删除原文件
}),

#### ProvidePlugin

new webpack.ProvidePlugin({
$: 'jquery',
React: 'react',
})

#### IgnorePlugin

//moment 这个库中，如果引用了./locale/目录的内容，就忽略掉，不会打包进去
new Webpack.IgnorePlugin(/\.\/locale/, /moment/),

//手动引入所需要的语言包
import 'moment/locale/zh-cn'
