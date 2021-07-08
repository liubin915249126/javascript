#### 安装依赖

yarn add webpack webpack-cli webpack-dev-server
yarn add html-webpack-plugin mini-css-extract-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin clean-webpack-plugin
yarn add url-loader less-loader babel-loader babel-core
yarn add whatwg-fetch babel-polyfill

html-webpack-plugin 需要升级

#### Plugin/Preset files are not allowed to export objects, only functions
yarn add  @babel/preset-env @babel/preset-react @babel/core

#### The 'decorators' plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean

yarn add --dev @babel/plugin-proposal-decorators 

 [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]

yarn add file-loader     


####  Support for the experimental syntax 'classProperties' isn't currently enabled

yarn add @babel/plugin-proposal-class-properties
['@babel/plugin-proposal-class-properties']

#### React is not definied

#### Uncaught Invariant Violation: [app.model] namespace should be defined  
browser.js:34 Uncaught Invariant Violation: [app.router] router should be function, but got object
yarn add -D babel-plugin-add-module-exports

"add-module-exports"

#### Unexpected token: keyword «const»

yarn add terser-webpack-plugin --save-dev

const TerserPlugin = require('terser-webpack-plugin')

  new TerserPlugin({
    parallel: true,
    terserOptions: {
      ecma: 6,
    },
  }),

#### 样式失效 package .babelrc冲突
#### babel-runtime 

"plugins": ["transform-runtime"]


  #### HappyPack 
yarn add -D happypack
  const HappyPack = require('happypack');
    new HappyPack({
        //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    })