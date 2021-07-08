const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'


const APP_PATH = path.resolve(__dirname,"src") 
const config = {
    entry: {
        main: ['./index'],
    },
    output:{
        publicPath:'',
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].bundle.js',
        chunkFilename: 'js/[name][chunkhash].js',
    },
    mode: isProd ?'production':'development',
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    module:{
        rules:[
            {
                test: /\.(jsx|js)$/,
                exclude: /^node_modules$/,
                use: ['babel-loader'],
                include: [APP_PATH]
            },  
            {
                test: /\.(jsx|js)$/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
                            formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
                        }
                    }
                ],
                enforce: "pre",
                include: [path.resolve(__dirname, 'src')], // 指定检查的目录
            }       
        ]
    },
    devServer: {
        contentBase: "./src",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,
        port:9099,
        proxy:{
            '/': { target: 'http://localhost:3000', secure: false }
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'react',
            inject:'body',
            filename:'index.html',
            template:path.resolve(__dirname, "index.html"),
            // chunks: ['main','vandor']
        }),
        new CleanWebpackPlugin()
    ]
};
module.exports = config;