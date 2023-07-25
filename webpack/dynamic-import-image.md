## webpack 加载动态图片

> 所谓动态图片指的是接口返回的图片地址，这里的地址指的是本地的图片地址，而非网络图片的 url。
> 本地有一个 image 文件夹，存放需要用到的图片。按照接口返回的图片地址比对去加载。
> webpack 加载图片首先想到的是 file-loader 或者 url-loader

#### 加载图片的配置

> 首先安装 file-loader

```js
  npm install file-loader --save-dev
```

增加 webpack 配置,详细文档请参考 [file-loader](https://github.com/webpack-contrib/file-loader)

```js
  ...
  module: {
    rules: [
      {
        test: /\.(png|gif|svg|jpg)$/,
        use: ["file-loader"]
      }
    ]
  }
  ...
```

>

#### webpack 加载本地图片

> webpack 将一切 web 资源视为模块，其中就包含图片，
> webpack 支持 commonjs，ES6 的模块规范，于是我们可以使用 require,以及基于 ES6 规范的 import() 来加载图片
> 这两种方式有啥区别呢

- require
  输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。这点与 ES6 import
  模块化有重大差异 跟 sea.js 的执行结果一致，也是在 require 的时候才去加载模块文件，加载完再接着执行。

我们可以这样使用

```js
const lodash = require('lodash')
```

还有一个 commonjs 异步加载 require.ensure 已经被下文的 import()方法 取代了。

- import()方法
  ES2015 loader 规范实现了用于动态加载的 import()方法，
  这个功能可以实现按需加载我们的代码，并且使用了 promise 式的回调，获取加载的包。

从上我们可以看出 import 是异步加载，我们可以这样使用

```js
const module = await import('lodash')
// 或者
import('lodash').then((module) => {})
```

>

#### 两种方法发现的问题

- require
  返回的文件不在上述 image 文件夹时候就回报模块找不到的错误。
- import()方法
  异步加载，实测图片没显示(如有大神解决了，请告知)

#### 解决办法

> [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext)

```js
const file = require.context('../../image', false)
const keys = file.keys()
```

keys 会返回 image 里面已存在的图片路径的数组，我们只要判断接口返回的图片地址在本地图片里面再去加载
从而避免模块找不到的问题。

>

- 原文地址 [dynamic-import-image](https://github.com/liubin915249126/javascript/blob/master/webpack/dynamic-import-image.md)

- 另外我的博客地址 [blog](https://github.com/liubin915249126/javascript)会经常分享 最近的学习内容，项目中遇到的问题及解决方案
