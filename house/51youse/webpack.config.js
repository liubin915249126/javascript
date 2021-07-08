const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HappyPack = require("happypack");
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// var proxy = require('http-proxy-middleware')
const isProd = process.env.NODE_ENV === "production";
const cssLoader = isProd ? MiniCssExtractPlugin.loader : "style-loader";

const APP_PATH = path.resolve(__dirname, "src");
const modifyVars = require("./src/theme");

const config = {
  entry: {
    main: ["whatwg-fetch", "babel-polyfill", "./src/index.js"]
    // main: "./src/index.js"
    // vandor:['jquery','react']
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[hash].bundle.js",
    chunkFilename: "js/[name][chunkhash].js"
  },
  mode: isProd ? "production" : "development",
  // devtool: 'source-map',
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
      "@components": `${__dirname}/src/components`,
      "@routes": `${__dirname}/src/routes`
    },
    //集成省略扩展名
    extensions: [".js", ".json", ".jsx", ".less", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /^node_modules$/,
        // use: [{loader:'babel-loader'}],
        use: ["babel-loader"]
        // include: [APP_PATH]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          cssLoader,
          "css-loader?modules",
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: modifyVars
            }
          }
        ]
      },
      {
        test: /\.less$/,
        //use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }],
        use: [
          cssLoader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              javascriptEnabled: true
            }
          }
        ],
        include: /node_modules/
      },
      {
        test: /\.css$/,
        //use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }],
        use: [cssLoader, "css-loader"]
      },
      {
        //file-loader 解决css等文件中引入图片路径的问题
        // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: "url-loader",
          options: {
            outputPath: "images/", // 图片输出的路径
            limit: 1 * 1024
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: "./src", //本地服务器所加载的页面所在的目录
    historyApiFallback: true,
    port: 8008,
    proxy: {
      "/": { target: "http://localhost:8000", secure: false }
    }
  },
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true // set to true if you want JS source maps
      // }),
      new OptimizeCSSAssetsPlugin({})
    ],
    runtimeChunk: {
      name: "manifest"
    },
    // minimizer: true, // [new UglifyJsPlugin({...})]
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        // 处理异步chunk
        "async-vendors": {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: "async",
          name: "async-vendors"
        },
        antd: {
          name: "chunk-antd", // 单独将 antd 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\/]node_modules[\/]antd[\/]/
        },
        styles: {
          name: "styles",
          test: /\.(scss|css)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: "react 学习",
      inject: "body",
      filename: "index.html",
      template: path.resolve(__dirname, "public/index.ejs")
      // chunks: ['main','vandor']
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name][contenthash].css",
      chunkFilename: "[id][contenthash].css"
    }),
    // production
    new webpack.HashedModuleIdsPlugin({
      hashFunction: "sha256",
      hashDigest: "hex",
      hashDigestLength: 20
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist")]
    }),
    // new webpack.DefinePlugin({
    //   'process.env':
    //   {
    //     'NODE_ENV':isProd? JSON.stringify('production'):JSON.stringify('development'),
    //   },
    // }),
    new webpack.ProvidePlugin({
      React: "react"
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: "happyBabel",
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true"
        }
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    })
  ],
  externals: {
    g2: "G2",
    "g-cloud": "Cloud",
    "g2-plugin-slider": "G2.Plugin.slider"
    // 'react': 'React'
  }
};
if(isProd){
  config.plugins.push(
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6
      }
    }),
  )
}

module.exports = config;
