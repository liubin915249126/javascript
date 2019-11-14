## 浏览器事件循环

#### 浏览器多进程

```js
    主要包含主进程和多个渲染进程。主进程主要负责对其他进程的管理，包括创建和销毁，
    以及将渲染进程返回的位于内存中的Bitmap渲染到显示器上，同时负责网络资源的下载等等。
    而每个渲染进程则对应于一个标签页，负责管理当前标签页打开的页面DOM结构解析，JavaScript脚本执行等
```

#### 渲染进程

```js
   包括GUI渲染线程、
       负责渲染页面，解析 HTML，CSS 构成 DOM 树等，当页面重绘或者由于某种操作引起回流都会调起该线程。
       和 JS 引擎线程是互斥的，当 JS 引擎线程在工作的时候，GUI 渲染线程会被挂起，
       GUI 更新被放入在 JS 任务队列中，等待 JS 引擎线程空闲的时候继续执行。
   JavaScript引擎线程、
   事件触发线程、
   定时触发器线程、 定时器指定的延时毫秒数其实并不准确
   http异步请求线程等.
```

#### js 单线程

```js
   为了保证DOM渲染不发生冲突.
   如果所有的操作都是同步的，毫无疑问会造成浏览器的阻塞，对于及时响应处理用户点击等操作是不利的。
   因此在浏览器环境中需要引入异步的处理机制，也就是事件循环.
```
![loop](https://github.com/liubin915249126/javascript/blob/master/image/loop.png)

#### js 任务

```js
  JavaScript 单线程中的任务分为同步任务和异步任务。同步任务会在调用栈中按照顺序排队等待主线程执行，
  异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待执行
```

![queue](https://github.com/liubin915249126/javascript/blob/master/image/queue.webp)
```js
  Macro Task(宏任务) setTimeout函数的回调、DOM事件处理函数，网络事件，Html解析
  Micro Task(微任务) Promise对象的resolve或reject回调、MutationObserver对象的回调
  正在执行的任务衍生出来的所有的Micro Task会在执行下一个Macro Task之前被放入执行栈执行
```

![task](https://github.com/liubin915249126/javascript/blob/master/image/task.webp)

## js 异步发展史

callback -> promise -> generator -> async + await

#### callback

```js
ajax(url, () => {
  // 处理逻辑
  ajax(url1, () => {
    // 处理逻辑
    ajax(url2, () => {
      // 处理逻辑
    });
  });
});
```

#### promise

```js
    Pending----Promise对象实例创建时候的初始状态
    Fulfilled----可以理解为成功的状态
    Rejected----可以理解为失败的状态
```

```js
Promise.resolve(1) //每次调用返回的都是一个新的Promise实例(这就是then可用链式调用的原因)
  .then(x => x + 1)
  .then(x => {
    throw new Error("My Error"); //如果then中出现异常,会走下一个then的失败回调
  })
  .catch(() => 1) //return -> 包装成 Promise.resolve(1)
  .then(x => x + 1)
  .then() //参数穿透
  .then(x => console.log(x)) //2
  .catch(console.error); //catch 会捕获到没有捕获的异常
```

#### 生成器 Generators/ yield

```js
function* foo(x) {
  let y = 2 * (yield x + 1); //yield可暂停，next方法可启动，每次返回的是yield后的表达式结果
  let z = yield y / 3; //yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
  return x + y + z;
}
let it = foo(5);
console.log(it.next()); // => {value: 6, done: false}
console.log(it.next(12)); // => {value: 8, done: false}
console.log(it.next(13)); // => {value: 42, done: true}
```

```js
  var fetch = require("node-fetch");

  function* gen() {
    var r1 = yield fetch("https://api.github.com/users/github");
    var json1 = yield r1.json();
    var r2 = yield fetch("https://api.github.com/users/github/followers");
    var json2 = yield r2.json();
    var r3 = yield fetch("https://api.github.com/users/github/repos");
    var json3 = yield r3.json();

    console.log([json1.bio, json2[0].login, json3[0].full_name].join("\n"));
  }

  function run(gen) {
    var g = gen();
    function next(data) {
      var result = g.next(data);
      if (result.done) return;
      result.value.then(function(data) {
        next(data);
      });
    }

    next();
  }

  run(gen);
  // co(gen)
```
[Generators](https://github.com/mqyqingfeng/Blog/issues/99)
#### async await
