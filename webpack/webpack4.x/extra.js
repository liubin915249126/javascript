const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空打包目录的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html的插件
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin') //CSS文件单独提取出来
const webpack = require('webpack')

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src', 'index.js'),
        page: path.resolve(__dirname, 'src', 'page.js'),
        vendor:'lodash' // 多个页面所需的公共库文件，防止重复打包带入
    },
    output:{
        publicPath: '/',  //这里要放的是静态资源CDN的地址
        path: path.resolve(__dirname,'dist'),
        filename:'[name].[hash].js'
    },
    resolve:{
        extensions: [".js",".css",".json"],
        alias: {} //配置别名可以加快webpack查找模块的速度
    },
    module: {
        // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
        rules:[
            {
                test: /\.css$/,
                use: ExtractTextWebapckPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader'] // 不再需要style-loader放到html文件内
                }),
                include: path.join(__dirname, 'src'), //限制范围，提高打包速度
                exclude: /node_modules/
            },
            {
                test:/\.less$/,
                use: ExtractTextWebapckPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                }),
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test:/\.scss$/,
                use: ExtractTextWebapckPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader', 'postcss-loader', 'sass-loader']
                }),
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    query: { //同时可以把babel配置写到根目录下的.babelrc中
                      presets: ['env', 'stage-0'] // env转换es6 stage-0转es7
                    }
                }
            },
            { //file-loader 解决css等文件中引入图片路径的问题
            // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                  loader: 'url-loader',
                  options: {
                    outputPath: 'images/', // 图片输出的路径
                    limit: 1 * 1024
                  }
                }
            }
        ]
    },
    plugins: [
        // 多入口的html文件用chunks这个参数来区分
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src','index.html'),
            filename:'index.html',
            chunks:['index', 'vendor'],
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩 去掉引号
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src','page.html'),
            filename:'page.html',
            chunks:['page', 'vendor'],
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩 去掉引号
            }
        }),
        new webpack.ProvidePlugin({
            _:'lodash' //所有页面都会引入 _ 这个变量，不用再import引入
        }),
        new ExtractTextWebapckPlugin('css/[name].[hash].css'), // 其实这个特性只用于打包生产环境，测试环境这样设置会影响HMR
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'static'),
                to: path.resolve(__dirname, 'dist/static'),
                ignore: ['.*']
            }
        ]),
        new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    ],
    devtool: 'eval-source-map', // 指定加source-map的方式
    devServer: {
        contentBase: path.join(__dirname, "dist"), //静态文件根目录
        port: 3824, // 端口
        host: 'localhost',
        overlay: true,
        compress: false // 服务器返回浏览器的时候是否启动gzip压缩
    },
    watch: true, // 开启监听文件更改，自动刷新
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll:1000 //每秒询问的文件变更的次数
    },
}