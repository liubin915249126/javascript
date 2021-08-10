## js 错误处理

#### Error 实例对象
JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。
JavaScript 原生提供Error构造函数，所有抛出的错误都是这个构造函数的实例。
```js
    var err = new Error('出错了');
    console.log(err.message)  // "出错了"
    // 抛出Error实例对象以后，整个程序就中断在发生错误的地方，不再往下执行
    throw err;
```

#### 实例错误对象
存在Error的6个派生对象
这6种派生错误，连同原始的Error对象，都是构造函数。开发者可以使用它们，手动生成错误对象的实例。这些构造函数都接受一个参数，代表错误提示信息（message）。

- SyntaxError 对象是解析代码时发生的语法错误。
- ReferenceError 对象是引用一个不存在的变量时发生的错误。
  - 使用一个不存在的变量
  - 将一个值分配给无法分配的对象
- RangeError对象是一个值超出有效范围时发生的错误。
  - 一是数组长度为负数
  - 二是Number对象的方法参数超出范围，以及函数堆栈超过最大值
- TypeError 对象是变量或参数不是预期类型时发生的错误  
  - 对字符串、布尔值、数值等原始类型的值使用new命令
  - 调用对象不存在的方法
- URIError对象是 URI 相关函数的参数不正确时抛出的错误，
  - 主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。  
- eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。  

#### 自定义错误
```js
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```

#### throw 语句
throw语句的作用是手动中断程序执行，抛出一个错误。

#### try catch
- 只能捕获到同步的运行时错误
- 不能捕获到语法错误
- try代码块抛出错误（上例用的是throw语句），JavaScript 引擎就立即把代码的执行，转到catch代码块，或者说错误被catch代码块捕获了。
- catch代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。
- catch代码块之中，还可以再抛出错误，甚至使用嵌套的try...catch结构。
```js
    try {
    throw new Error('出错了!');
    } catch (e) {
    console.log(e.name + ": " + e.message);
    console.log(e.stack);
    }
```

try...catch结构允许在最后添加一个finally代码块，表示不管是否出现错误，都必需在最后运行的语句。
```js
function cleansUp() {
  try {
    throw new Error('出错了……');
    console.log('此行不会执行');
  } finally {
    console.log('完成清理工作');
  }
}
```

return语句的执行是排在finally代码之前，只是等finally代码执行完毕后才返回
```js
function idle(x) {
  try {
    console.log(x);
    return 'result';
  } finally {
    console.log('FINALLY');
  }
}
idle('hello')
// hello
// FINALLY
```

#### 错误捕获
任何没有 catch 的错误都会触发 window 对象的 error 事件。

可疑区域增加 try...catch
全局监控JS异常： window.onerror
全局监控静态资源异常： window.addEventListener('error',(e)=>{},false)
全局捕获没有 catch 的 promise 异常：unhandledrejection
iframe 异常：window.error

#### window.onerror
window.onerror是一个全局变量，默认值为null。当有js运行时错误触发时，window会触发error事件，并执行window.onerror()。onerror可以接受多个参数。
若该函数返回true，则阻止执行默认事件处理函数，如异常信息不会在console中打印。没有返回值或者返回值为false的时候，异常信息会在console中打印
#### addEventListener('error')
监听js运行时错误事件，会比window.onerror先触发，与onerror的功能大体类似，不过事件回调函数传参只有一个保存所有错误信息的参数，不能阻止默认事件处理函数的执行，但可以全局捕获资源加载异常的错误.