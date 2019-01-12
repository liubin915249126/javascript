const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')

module.exports = (config, env) => {
  // console.log(JSON.stringify(config)) 

  config.module.rules[0].exclude.push(/\.ejs$/)    // 注 1
  if (env === 'production') {
    config.output.filename = '[name].[chunkhash].js'
    config.output.chunkFilename = '[chunkhash].async.js'
    config.plugins[3] = new ExtractTextPlugin('[contenthash:20].css')    // 注 2
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!public/index.ejs',    // 注 3
        inject: true,
        // minify: { collapseWhitespace: true },
        production: true,
      }),
      new WebpackMd5Hash()
    )
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!public/index.ejs',
        inject: true,
      }),
    )
  }

  // 别名配置
  config.resolve.alias = {
    '@': `${__dirname}/src`,
    '@components': `${__dirname}/src/components`,
    '@routes': `${__dirname}/src/routes`,
  }
  config.resolve.extensions=[".js", ".jsx", ".less"]
  return config
}