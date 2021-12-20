## tree-shaking

#### DCE(dead code elimination)
[referer](https://juejin.cn/post/6968262966604988429)
- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量，只写不读
>
- ES6 的模块引入是静态分析的，可以在编译时正确判断到底加载了什么代码。
- 分析程序流，判断哪些变量被使用、引用，打包这些代码。
而 tree-shaking 的核心就包含在这个分析程序流的过程中： 基于作用域，在 AST 过程中对函数或全局对象形成对象记录，然后在整个形成的作用域链对象中进行匹配 import 导入的标识，最后只打包匹配的代码，而删除那些未被匹配使用的代码。
>

#### Webpack 实现 tree-shaking 的 3 个阶段
[referer](https://developer.51cto.com/art/202106/668517.htm)
- 第一阶段：UglifyJS
    - UglifyJS 不支持 ES6 及以上，需要用 Babel 将代码编译为 ES5，然后再用 UglifyJS 来清除无用代码;
    - 通过 Babel 将代码编译为 ES5，但又要让 ES6 模块不受 Babel 预设(preset)的影响：配置 Babel 预设不转换 module，对应地配置 Webpack 的 plugins 配置;
    - 为避免副作用，将其标记为 pure(无副作用)，以便 UglifyJS 能够处理，主要是 webpack 的编译过程阻止了对类进行 tree-shaking，它仅对函数起作用，后来通过支持将类编译后的赋值标记为 @__PURE__解决了这个问题。
- 第二阶段：BabelMinify
    webpack 标记代码 --> Babili(即 BabelMinify)压缩删除无用代码 Babili 后来被重命名为 BabelMinify，是基于 Babel 的代码压缩工具，而 Babel 已经通过我们的解析器 Babylon 理解了新语法，同时又在 babili 中集成了 UglifyJS 的压缩功能，本质上实现了和 UglifyJS 一样的功能，但使用 babili 插件又不必再转译，而是直接压缩，使代码体积更小。
    一般使用 Babili 替代 uglify 有 Babili 插件式和 babel-loader 预设两种方式。在官方文档最后有说明，Babel Minify 最适合针对最新的浏览器(具有完整的 ES6+ 支持)，也可以与通常的 Babel es2015 预设一起使用，以首先向下编译代码。
    在 webpack 中使用 babel-loader，然后再引入 minify 作为一个 preset 会比直接使用 BabelMinifyWebpackPlugin 插件(下一个就讲到)执行得更快。因为 babel-minify 处理的文件体积会更小。  
- 第三阶段：Terser
webpack 标记代码 --> Terser 压缩删除无用代码 (webpack5 已内置) terser 是一个用于 ES6+ 的 JavaScript 解析器和 mangler/compressor 工具包。
  - uglify 不再进行维护且不支持 ES6+ 语法
  - webpack 默认内置配置了 terser 插件实现代码压缩 关于副作用，从 webpack 4 正式版本扩展了未使用模块检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。  

#### Webpack 的 Tree-shaking 流程
Webpack 标记代码 总的来说，webpack 对代码进行标记，主要是对 import & export 语句标记为 3 类：
  - 所有 import 标记为 /* harmony import */
  - 所有被使用过的 export 标记为/* harmony export ([type]) */，其中 [type] 和 webpack 内部有关，可能是 binding, immutable 等等
  - 没被使用过的 export 标记为/* unused harmony export [FuncName] */，其中 [FuncName] 为 export 的方法名称   