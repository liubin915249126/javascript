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
  Babel 将 ES6 模块转为 CommonJS 后
>
