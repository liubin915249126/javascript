问的一些项目中的内容，就没有记录下来了。

提到的技术栈里，最擅长哪一块或者对哪一块研究比较深入？

什么是 BFC ？形成 BFC 的条件。

垂直 margin 重叠是为什么？怎么解决这个问题？
margin 的定义不是让元素移动 xxpx，而是这个元素的旁边必须有 xxxpx 的的空白。

flex: 0 1 auto 表示什么意思

传送门

const a = 123，然后执行 a = 456 会怎么样？

箭头函数 this 指向？箭头函数的 prototype 指向？

箭头函数里 this 的指向就是上下文里对象 this 指向，偶尔没有上下文对象，this 就指向 window

箭头函数没有原型属性

var Foo = () => {};
console.log(Foo.prototype); //undefined
复制代码

什么情况下不适合用箭头函数？箭头函数跟普通函数有什么区别？

当想要函数被提升时(箭头函数是匿名的)
要在函数中使用 this/arguments 时，由于箭头函数本身不具有 this/arguments，因此它们取决于外部上下文
使用命名函数(箭头函数是匿名的)
使用函数作为构造函数时(箭头函数没有构造函数)
当想在对象字面是以将函数作为属性添加并在其中使用对象时，因为咱们无法访问 this 即对象本身。

WeakMap 、 WeakSet、 map、 set 的区别跟使用场景。

map 与 forEach 的区别？

如何对一个已声明的变量进行解构赋值？

介绍一下 JavaScript 有哪几种继承方式？

介绍下 JavaScript 异步机制

事件循环(event loop)和任务队列(task queue)

如果让你实现一个无限下拉的列表怎么实现？

云音乐前端技术团队的方案

你了解 Intersection Observer 吗？

MDN IntersectionObserver 接口 (从属于 Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。

进程与线程的区别？

阮一峰老师的文章

浏览器内核有哪几个线程？

GUI 线程
JS 引擎线程
事件触发线程
定时器线程
HTTP 请求线程

输入 URL 后发生了什么？

从 URL 输入到页面展现到底发生什么？

http1.0、http1.1 跟 HTTP2 的区别？

HTTP1.0、HTTP1.1 和 HTTP2.0 的区别

TCP,UDP 的区别？

http 请求头中能想到有哪些字段？

http 中设置 keep-alive 有什么作用？

介绍下浏览器缓存方式？

前端安全了解有多少？

观察者模式与发布订阅者区别

react 和 vue 的区别？

看个人理解

Vue 的 Diff 和 React 的 Diff 的区别？

🌟 不知道

Vue 组件间通讯有哪几种方式？

Vue 中 V-for 里为什么要使用 key？一般用什么作为 key？

V-for 中不使用 index 作为 key，你知道为什么吗？

介绍一下 Vue 中的插槽 slot 的使用。什么是作用域插槽？

谈一谈 Vue 中 nextTick 的原理以及运行机制？nextTick 在事件循环是怎么处理它的？

在 vue 中 如何 通过 createElement 创建虚拟 dom?

虚拟 DOM 相比 真实 DOM，为什么会带来性能上的优化？

React hooks 了解吗？

redux 做状态管理和发布订阅模式有什么区别？

如何实现一个多级菜单？

介绍下移动端的适配方案？

微前端了解吗？

对 TS 的认识，项目中是否使用？

实事求是回答

怎么看待几种前端跨端解决方案？

React Native、Weex、Flutter、 Taro 、uni-app

Webpack 怎么做优化的？

前端监控分为哪几个方面？ 性能监控跟异常监控怎么处理的？有什么解决方案或者框架？

性能监控、行为监控（埋点，点击流）、异常监控

异常监控框架：betterjs，fundebug

前端页面性能指标有哪些？

首次绘制（FP）
首次内容绘制（FCP）
首次有效绘制（FMP）
每秒传输帧数（FPS）
DNS 解析时间
TCP 连接时间
HTTP 请求响应时间
用户可交互时间

负责一个新项目，如何选择技术栈？

如何进行项目重构

项目中遇到印象深刻的困难是什么？

你是怎么学习前端的？

代码执行题没怎么记住：

```js
//打印顺序
setTimeout(function () {
console.log(1)
}, 0)
for (let i = 10; i <30; i += 10 ) {
setTimeout((function (i) {
console.log(i)
return () => i
})(i), i \*100)
}
new Promise(function (resolve) {
console.log(2)
for (var i = 0; i < 1000; i++) {
if (i == 999) {
console.log(resolve())
}
}
console.log(4)
}).then(function () {
console.log(3)
return 3.1
})
console.log(5)
```

```js
// 多维数组降维, 将[1, [[2], [3, [4]], 5]] 转化为 [1,2,3,4,5]
flattenDeep (arr){
// TODO
}
flattenDeep([1, [[2], [3, [4]], 5]]) // [1,2,3,4,5]
```
