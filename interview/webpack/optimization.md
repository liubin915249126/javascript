## webpack 打包性能优化清单

#### speed-measure-webpack-plugin

可以使用 speed-measure-webpack-plugin 测量打包时间

#### 优化 Loader 配置

由于 Loader 对文件的转换操作很耗时，所以需要让尽可能少的文件被 Loader 处理。
可以通过 test/include/exclude 三个配置项来命中 Loader 要应用规则的文件。
同时 test/include/exclude 还可以有其他的妙用，比如之前实现的一个项目兼容
css-modules 与不使用的方案

#### 优化 resolve.modules 配置

resolve.modules 的默认值是［'node_modules'］，
含义是先去当前目录的 node_modules 目录下去找我们想找的模块，
如果没找到就去上一级目录 ../node_modules 中找，再没有就去 ../../node_modules 中找，以此类推。

```js
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'node modules')],
  },
}
```

#### 优化 resolve.mainFields 配置

在安装的第三方模块中都会有一个 package.json 文件，用于描述这个模块的属性,其中可以存在多个字段描述入口文件，
原因是某些模块可以同时用于多个环境中，针对不同的运行环境需要使用不同的代码。
resolve.mainFields 的默认值和当前的 target 配置有关系，对应的关系如下。
target web 或者 webworker 时，值是［'browser','module','main']。
target 为其他情况时，值是［ 'module','main']。
以 target 等于 web 为例， Webpack 会先采用第三方模块中的 browser 字段去寻找模块的入口文件，如果不存在，就采用 module 字段，以此类推。

```js
module.exports = {
  resolve: {
    //只采用 main 字段作为入口文件的描述字段，以减少搜索步骤
    mainFields: ['main'],
  },
}
```

#### 优化 resolve.alias 配置

- 一套是采用 CommonJS 规范的模块化代码，这些文件都放在 lib 录下，
  以 package.json 中指定的入口文件 react.js 为模块的入口
- 一套是将 React 的所有相关代码打包好的完整代码放到一个单独的文件中，
  这些代码没有采用模块化，可以直接执行。其中 dist/react.js 用于开发环境，
  里面包含检查和警告的代码。dist/react.min.js 用于线上环境，被最小化了

```js
module.exports = {
  resolve: {
    //使用 alias 将导入 react 的语句换成直接使用单独、完整的 react.min.js 文件，
    //减少耗时的递归解析操作
    alias: {
      react: path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
    },
  },
}
```

#### 优化 resolve.extensions 配置

在导入语句没带文件后缀时，Webpack 会自动带上后缀去尝试询问文件是否存在

- 后缀尝试列表要尽可能小，不要将项目中不可能存在的情况写到后缀尝试列表中。
- 频率出现最高的文件后缀要优先放在最前面，以做到尽快退出寻找过程。
- 在源码中写导入语句时，要尽可能带上后缀 从而可以避免寻找过程。例如在确定的情况下将 require ( './data '） 写成 require （'./data.json'）

```js
module.exports = {
  resolve: {
    //尽可能减少后缀尝试的可能性
    extensions: ['js'],
  },
}
```

#### 优化 module.noParse 配置

打包的时候不去解析，加快打包速度。

```js
module.exports = {
  module: {
    noParse: /jquery/,
  },
}
```

#### 使用 DllPlugin

```js
module.exports = {
  // mode: "development || "production",
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..', 'dll'),
      manifest: require('../dll/dist/alpha-manifest.json'), // eslint-disable-line
    }),
    new webpack.DllReferencePlugin({
      scope: 'beta',
      manifest: require('../dll/dist/beta-manifest.json'), // eslint-disable-line
      extensions: ['.js', '.jsx'],
    }),
  ],
}
```

webpack5

```js
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const plugins = [new HardSourceWebpackPlugin()]
```

#### 使用 HappyPack

```js
   const HappyPack = require('happypack')
    const os = require('os')
    const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

    {
        test: /\.js$/,
        // loader: 'babel-loader',
        loader: 'happypack/loader?id=happy-babel-js', // 增加新的HappyPack构建loader
        include: [resolve('src')],
        exclude: /node_modules/,
    }

    plugins: [
        new HappyPack({
        id: 'happy-babel-js',
        loaders: ['babel-loader?cacheDirectory=true'],
        threadPool: happyThreadPool
        })
    ]
```

#### 使用 ParallelUglifyPlugin

#### 优化文件监听的性能

```js
module.export = {
  watchOptions: {
    //不监听的 node_modules 目录下的文件
    ignored: /node_modules/,
  },
}
```
