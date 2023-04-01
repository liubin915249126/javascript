#### 引入依赖

```js
// module.js文件
;(function (window, $) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
    $('body').css('background', 'red')
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar }
})(window, jQuery)
```

#### 模块的好处

>

    避免命名冲突(减少命名空间污染)
    更好的分离, 按需加载
    更高复用性
    高可维护性

>

#### AMD require.js

```js
//定义有依赖的模块
define(['module1', 'module2'], function (m1, m2) {
  return 模块
})
require(['module1', 'module2'], function (m1, m2) {
  // 使用m1/m2
})
```

#### CMD sea.js

[example](./sea.js)

#### UMD

```js
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports) // CMD
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory) // AMD
    : factory((global['module'] = {})) // Browser globals
})(this, function (exports) {
  'use strict'

  exports.x = x
  Object.defineProperty(exports, '__esModule', { value: true })
})
```

#### CommonJS(node)

暴露模块：module.exports = value 或 exports.xxx = value
引入模块：require(xxx),如果是第三方模块，xxx 为模块名；如果是自定义模块，xxx 为模块文件路径

> CommonJS 模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。这点与 ES6 模块化有重大差异  
>  跟 sea.js 的执行结果一致，也是在 require 的时候才去加载模块文件，加载完再接着执行。

#### ES6

> 跟 require.js 的执行结果是一致的，也就是将需要使用的模块先加载完再执行代码
> 原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
> 编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import 时采用静态命令的形式。即在 import 时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。

#### exports 和 module.exports 的区别

module.exports 默认值为{}
exports 是 module.exports 的引用
exports 默认指向 module.exports 的内存空间
require() 返回的是 module.exports 而不是 exports
若对 exports 重新赋值，则断开了 exports 对 module.exports 的指向

#### commonJs 和 esModule 的区别

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。
commonJs 是被加载的时候运行，esModule 是编译的时候运行
commonJs 输出的是值的浅拷贝，esModule 输出值的引用
commentJs 具有缓存。在第一次被加载时，会完整运行整个文件并输出一个对象，拷贝（浅拷贝）在内存中。下次加载文件时，直接从内存中取值

> ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
> 换句话说，ES6 的 import 有点像 Unix 系统的“符号连接”，原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块（动态绑定）。
> 第二个差异是因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

- commonJs 输出值拷贝(断开引用)

```js
/*************** a.js**********************/
let count = 0
exports.count = count // 输出值的拷贝
exports.add = () => {
  //这里改变count值，并不会将module.exports对象的count属性值改变
  count++
}

/*************** b.js**********************/
const { count, add } = require('./a.js')
//在支持es6模块的环境下等同于
import { count, add } from './a.js'

console.log(count) //0
add()
console.log(count) //0
```

- esModule 输出值引用

```js
/*************** a.js**********************/
export let count = 0 //输出的是值的引用，指向同一块内存
export const add = () => {
  count++ //此时引用指向的内存值发生改变
}

/*************** b.js**********************/
import { count, add } from './a.js'

console.log(count) //0
add()
console.log(count) //1
```

- commonJs 输出的浅拷贝验证

```js
/*************** a.js**********************/
const foo = {
  count: 0,
}
//module.exports的foo属性为 foo 对象的浅拷贝，指向同一个内存中
exports.foo = foo

window.setTimeout(() => {
  foo.count += 1
  console.log('changed foo')
}, 1000)

/*************** b.js**********************/
const { foo } = require('./a.js')

console.log('foo', foo) //'foo',{count: 0}
window.setTimeout(() => {
  console.log('after 2s foo', foo) //'after 2s foo ',{count: 1}
}, 2000)
```

[循环引用](https://mp.weixin.qq.com/s/NFNcwLZq97MNcyHqEfJs2Q)
