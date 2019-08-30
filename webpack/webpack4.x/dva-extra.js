const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = (config, env) => {
  // console.log(config);
  // console.log(JSON.stringify(config));
  (config.entry.vendor = [
    //build the mostly used framework scripts into vendor.
    "react",
    "react-dom",
    "react-redux",
    "react-router",
    "redux",
    "dva",
    "moment",
    "lodash",
    "redux-saga",
    "prop-types",
    "whatwg-fetch",
    "promise-polyfill"
  ]),
    (config.entry.antd = [
      //build the mostly used components into a independent chunk,avoid of total package over size.
      "antd/lib/button",
      "antd/lib/icon",
      "antd/lib/breadcrumb",
      "antd/lib/form",
      "antd/lib/menu",
      "antd/lib/input",
      "antd/lib/input-number",
      "antd/lib/dropdown",
      "antd/lib/table",
      "antd/lib/tabs",
      "antd/lib/modal",
      "antd/lib/row",
      "antd/lib/col"
    ]);
  config.entry.echarts = ["echarts", "xlsx", "braft-editor", "jspdf"];
  config.module.rules[0].exclude.push(/\.ejs$/); // 注 1
  if (env === "production") {
    config.output.filename = "[name].[chunkhash].js";
    config.output.chunkFilename = "[chunkhash].async.js";
    // config.plugins[3] = new ExtractTextPlugin({
    //   filename:  (getPath) => {
    //     return getPath('css/[name][contenthash:20].css').replace('css/js', 'css');
    //   },
    //   allChunks: true
    // }); // 注 2

    config.plugins.push(
      new HtmlWebpackPlugin({
        template: "ejs!public/index.ejs", // 注 3
        inject: true,
        hash:true,
        // minify: { collapseWhitespace: true },
        production: true,
        chunks:["manifest","echarts","vendor","antd","index"],
        chunksSortMode: 'manual',
      }),
      new WebpackMd5Hash(),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      new UglifyJsPlugin({
        cache: true,
        uglifyOptions: {
          compress: {
            warnings: false
          },
          output: {
            comments: false,
            ascii_only: true
          },
          ie8: true
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ["antd", "vendor", "echarts","manifest"],
        minChunks: Infinity
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity,
        chunks: ["antd", "vendor"]
      })
    );
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: "ejs!public/index.ejs",
        inject: true
      })
    );
  }

  // 别名配置
  config.resolve.alias = {
    "@": `${__dirname}/src`,
    "@components": `${__dirname}/src/components`,
    "@routes": `${__dirname}/src/routes`
  };
  config.resolve.extensions = [".js", ".jsx", ".less"];
  return config;
};
