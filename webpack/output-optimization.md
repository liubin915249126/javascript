## webpack 输出质量优化

#### Webpack 实现 CDN 的接入
- 静态资源的导入  URL 需要变成指向 DNS 服务的绝对路径的 URL，而不是相对 HTML 文件的
- 静态资源的文件名需要带上由文件内容算出来的 Hash 值，以防止被缓存\
- 将不同类型的资源放到不同域名的 DNS 服务上，以防止资源的并行加载被阻塞

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
- 第二个要求，需要使用UglifyJsPlugin插件。如果在mode:"production"模式，这个插件已经默认添加了，如果在其它模式下，可以手工添加它。

另外要记住的是打开optimization.usedExports。在mode: "production"模式下，它也是默认打开了的。它告诉webpack每个模块明确使用exports。这样之后，webpack会在打包文件中添加诸如/* unused harmony export */这样的注释，其后UglifyJsPlugin插件会对这些注释作出理解。
```js
   module.exports = {
        mode: 'none',
        optimization: {
            minimize: true,
            minimizer: [
                new UglifyJsPlugin()
            ],
            usedExports: true,
            sideEffects: true
        }
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
