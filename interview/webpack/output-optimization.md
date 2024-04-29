## webpack 输出质量优化

#### Webpack 实现 CDN 的接入

- 静态资源的导入 URL 需要变成指向 DNS 服务的绝对路径的 URL，而不是相对 HTML 文件的
  publicPath
- 静态资源的文件名需要带上由文件内容算出来的 Hash 值，以防止被缓存
- 将不同类型的资源放到不同域名的 DNS 服务上，以防止资源的并行加载被阻塞

#### webpack 中 hash,chunkhash,contenthash 区别

- hash
  hash 是跟整个项目的构建相关，构建生成的文件 hash 值都是一样的，所以 hash 计算是跟整个项目的构建相关，
  同一次构建过程中生成的 hash 都是一样的，只要项目里有文件更改，整个项目构建的 hash 值都会更改。
  导致所有的缓存失效。
  ```js
  const path = require('path')
  module.exports = {
    entry: {
      index: './src/index.js',
      main: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
    },
  }
  ```
- chunkhash
  - chunkhash 和 hash 不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，
    生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，
    接着我们采用 chunkhash 的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。
  - 但是这样又有一个问题，因为我们是将样式作为模块 import 到 JavaScript 文件中的，所以它们的 chunkhash 是一致的，
    这样就会有个问题，只要对应 css 或则 js 改变，与其关联的文件 hash 值也会改变，但其内容并没有改变呢，所以没有达到缓存意义。
    固 contenthash 的用途随之而来。
- contenthash
  contenthash 是针对文件内容级别的，只有你自己模块的内容变了，那么 hash 值才改变，所以我们可以通过 contenthash 解决上诉问题

#### 使用 Tree Shaking

Tree Shaking 正常工作的前提是，提交给 Webpack 的 JavaScript 代码必须采用了 ES6 的模块化语法，因为 ES6 模块化语法是静态的，可以进行静态分析。

- 首先，为了将采用 ES6 模块化的代码提交给 Webpack ，需要配置 Babel 以让其保留 ES6 模块化语句。修改 .babelrc 文件如下：

```js
   {
        'presets':[
            [
                'env',{
                    'module':false
                }
            ]
        ]
    }
```

- 第二个要求，需要使用 UglifyJsPlugin 插件。如果在 mode:"production"模式，这个插件已经默认添加了，如果在其它模式下，可以手工添加它。

另外要记住的是打开 optimization.usedExports。在 mode: "production"模式下，它也是默认打开了的。它告诉 webpack 每个模块明确使用 exports。这样之后，webpack 会在打包文件中添加诸如/_ unused harmony export _/这样的注释，其后 UglifyJsPlugin 插件会对这些注释作出理解。

```js
module.exports = {
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin()],
    usedExports: true,
    sideEffects: true,
  },
}
```

#### 提取公共代码

```js
    splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
        default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
```

#### 分割代码以按需加载

- 符合 ECMAScript proposal 的 import() 语法，推荐使用
- 传统的 require.ensure
  loadable

#### 分析工具

官方可视化工具：http://webpack.github.io/analyse/
