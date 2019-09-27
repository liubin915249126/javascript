```js
   //去除moment语言库
   new webpack.ContextReplacementPlugin(
      // 需要被处理的文件目录位置
      /moment[\/\\]locale/,
      // 正则匹配需要被包括进来的文件
      /(en|zh-cn)\.js/
    )
  ]
```
babel-plugin-lodash
new webpack.optimize.ModuleConcatenationPlugin()  scope hoisting

hard-source-webpack-plugin

preload-webpack-plugin 让静态资源支持 DNS 预解析和预加载
```js
   plugins: [
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: 'all',
      fileBlacklist: [/\.(css|map)$/, /base?.+/]
    })
  ]
```