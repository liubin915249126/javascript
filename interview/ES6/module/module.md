#### 引入依赖

```js
// module.js文件
(function(window, $) {
  let data = "www.baidu.com";
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`);
    $("body").css("background", "red");
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`);
    otherFun(); //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log("otherFun()");
  }
  //暴露行为
  window.myModule = { foo, bar };
})(window, jQuery);
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
define(["module1", "module2"], function(m1, m2) {
  return 模块;
});
require(["module1", "module2"], function(m1, m2) {
  // 使用m1/m2
});
```

#### CMD sea.js

[example](./sea.js)

#### UMD

```js
    (function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? factory(exports) // CMD
        : typeof define === "function" && define.amd
        ? define(["exports"], factory) // AMD
        : factory((global["module"] = {})); // Browser globals
    })(this, function(exports) {
    "use strict";

    exports.x = x;
    Object.defineProperty(exports, "__esModule", { value: true });
    });
```

#### CommonJS(node)

暴露模块：module.exports = value 或 exports.xxx = value
引入模块：require(xxx),如果是第三方模块，xxx 为模块名；如果是自定义模块，xxx 为模块文件路径

> 
  CommonJS 模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。这点与 ES6 模块化有重大差异  
  跟 sea.js 的执行结果一致，也是在 require 的时候才去加载模块文件，加载完再接着执行。
>

#### ES6
>
  跟 require.js 的执行结果是一致的，也就是将需要使用的模块先加载完再执行代码
  原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
  编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。
>

####  exports 和 module.exports 的区别
module.exports 默认值为{}
exports 是 module.exports 的引用
exports 默认指向 module.exports 的内存空间
require() 返回的是 module.exports 而不是 exports
若对 exports 重新赋值，则断开了 exports 对 module.exports 的指向

#### commonJs 和 esModule 的区别
ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。
commonJs是被加载的时候运行，esModule是编译的时候运行
commonJs输出的是值的浅拷贝，esModule输出值的引用
commentJs具有缓存。在第一次被加载时，会完整运行整个文件并输出一个对象，拷贝（浅拷贝）在内存中。下次加载文件时，直接从内存中取值


[循环引用](https://mp.weixin.qq.com/s/NFNcwLZq97MNcyHqEfJs2Q)
