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
   因此在浏览器环境中需要引入异步的处理机制。
   JavaScript 单线程中的任务分为同步任务和异步任务。
   同步任务会在调用栈中按照顺序排队等待主线程执行，
   异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待执行,
```

![queue](https://raw.githubusercontent.com/liubin915249126/javascript/master/image/queue.webp)

#### 事件循环

```js
  当执行栈空的时候,js引擎就会查看任务队列有没有等待执行的任务，形成一个事件循环
```

![loop](https://raw.githubusercontent.com/liubin915249126/javascript/master/image/loop.png)

```js
  Macro Task(宏任务) setTimeout，setInterval函数的回调、DOM事件处理函数，网络事件，Html解析,
  requestAnimationFrame,I/O操作,setImmediate(node)
  Micro Task(微任务) Promise对象的resolve或reject回调、MutationObserver对象的回调,process.nextTick
  正在执行的任务衍生出来的所有的Micro Task会在执行下一个Macro Task之前被放入执行栈执行
```

![task](https://raw.githubusercontent.com/liubin915249126/javascript/master/image/task.webp)

测试题 1

```js
async function test() {
  setTimeout(() => console.log(2), 0);
  new Promise(resolve => {
    console.log(3);
    // resolve()
    setTimeout(() => resolve(), 0);
  }).then(() => {
    console.log(4);
  });
  console.log(5);
}
test();
// 3524
```

- [原文地址](https://github.com/liubin915249126/javascript/blob/master/house/51youse/PPT-broswer.md)浏览器事件循环
- 另外我的博客地址 [blog](https://github.com/liubin915249126/javascript)会经常分享 最近的学习内容，项目中遇到的问题及解决方案