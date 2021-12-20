## Taptap

### 一面

换肤都做过什么处理，有没有处理过可能改变尺寸的换肤
i18n 在团队内部都做了哪些实践
webpack 迁移 vite 遇到了哪些问题
CI/CD 做了哪些实践
鉴权有了解么，jwt 如何实现踢人，session 和 jwt 鉴权的区别

<!-- todo -->

TCP 三次握手 http1.0，1.1，2 都有哪些区别
https，为什么 https 可以防中间人攻击
冒泡排序

### 二面

给你一个已经升序排列的数组，给一个数字，找一下这个数字在这个数组里出现了几次
洗牌算法，如何验证这个洗牌算法可以把牌洗得足够乱
node stream 去取一个超大数据量的日志，由于内存限制每次只能取一部分，现在希望在全部日志中随机取一万条，如何做
介绍一下项目 有哪些是由你主导提出的方案做的事情

## 京东

### 一面

介绍一下 promise，它为啥叫 promise
esmodule 介绍一下，它和 commonjs 的区别，主要的优势是什么
介绍一下 vite 的原理，它会去编译你的代码吗，vite 引用 commonjs 的包的时候怎么处理
如何转成 esm vue3 的组合式 API 有了解吗，它有哪些优势
介绍 https cors 介绍一下
微前端有了解吗
为什么你们移动端 h5 用 vue，pc 管理端用 react？
git 对象上的操作有了解过吗？ git reset、rebase 这些操作用过吗 ？
看你之前跳的都比较频繁，每段都没超过两年，京东有个二五原则，这个问题你怎么看

### 二面

你们小程序是用的 taro，对 taro 原理有了解吗
你们 cms 系统的架构是怎样的
你有了解过 webpack 现在也支持 esm 了吗？
你们的组件库是全公司公用的还是团队内自己的，是从 0 开发还是参考其他开源组件库在别人的基础上搞的？
有用 vue3 吗，为什么团队没有上 vue3？

<!-- todo -->

你们 react 用的是什么语法？ fiber 原理有了解吗？
你们当前团队有多少人，未来想做哪方面？

## BOSS 直聘

聊一下最复杂的项目
在无障碍的项目中做过哪些
做黑夜模式有没有考虑过用户设置了定时切换手机黑夜模式的情况
你们开发的 h5 项目依赖的安卓和苹果的 webview 的内核分别都是什么
Lottie 动画上做过哪些优化，有考虑在低端机上用 CSS 动画做么
如果让你做一个动画，一个地球本身在自转，外面有个飞机围着它转，飞机的螺旋桨自己也在转，有哪些需要考虑的点
CI/CD 上做过哪些
webpack 迁移 Vite 遇到过哪些问题，之前 webpack 慢是为什么，有过优化么
业务内的公共工具提炼了哪些
自己做着玩的这些项目介绍一下，主要都是做什么的
这次找工作主要看重什么

## 奇虎 360（安全卫士）

```js
var a = { name: "Sam" };
var b = { name: "Tom" };
var o = {};
o[a] = 1;
o[b] = 2;
console.log(o); // { '[object Object]': 2 }
console.log(o[a]); // 2
```

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
async1();
new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise2");
});
console.log("script end");
```

8.React 的合成事件和原生事件了解吗？
[SyntheticEvent](../frame-work/react/SyntheticEvent.md)

## 陌陌

如何限制 Promise 请求并发数
实现这个 pipe
[pip](../functional/pip.md)

```js
const fn = pipe(addOne, addTwo, addThree, addFour); // 传入pipe的四个函数都是已实现的
fn(1); // 1 + 1 + 2 + 3 + 4 = 11，输出11
```

了解过 Vue3 么，为什么还没有上 Vue3，了解 Proxy 么，它和 defineProperty 的区别是什么，性能上有什么区别么
Vue 如果想做模板的复用，应该怎么做

```js
// 下面这个 class 的四个属性分别属于这个 class 的什么，fn 和 f 有什么区别
[class/method](../ES6/class/method.md)
class A {
  static a = 1;
  b = 2;
  fn() {}
  f = () => {};
}
```

```js
type A = "   Hello world!   ";
type B = LeftTrim<A>; //  'Hello world!   '
```

```js
const data1 = { "a.b.c": 1, "a.b.d": 2 };
const data2 = { "a.b.e": 3, "a.b.f": 4 };
// 把如上两个对象合并成一个JSON，其中的.需要处理成对应的层级
```

## 滴滴

chrome 浏览器最多同时加载多少个资源，那如果想同时加载更多资源应该怎么办
http2 的多路复用是什么原理
[http2.Multiplexing](../computer/network-review/http2.Multiplexing.md)
实现一个改变 this 指向的 call 方法，介绍一下原理

## 小红书

Vue 和 React 的区别
Vue 和 React 的 Diff 算法有哪些区别
编写一个方法，判断一个字符串是否是合法的 XML

```js
const str1 = "<html><div>123</div></html>"; // true
const str2 = "<div><div>123</div><div></div></div>"; // true
const str2 = "<html><div>123</html></div>"; // false
```

```js
// 矩阵中的路径 [hasStr](../algorithm/collection/hasStr.js)
// 在一个矩阵中查找一个字符串，可以上下左右移动，但是不能回头，如果能找到这个字符串返回 true
const str = "abcde";
const matrix = [
  ["0", "0", "0", "0", "0", "0"],
  ["0", "0", "a", "b", "0", "0"],
  ["0", "0", "0", "c", "d", "0"],
  ["0", "0", "0", "0", "e", "0"],
];
```

## 美团(酒旅)

export 和 module.exports 的区别
v-for 为什么会有 key
[react-key](./frame-work/react/key.md)

## 知乎

写个二叉树遍历，深度优先广度优先

### 二面

SSR 和 CSR 的区别，Nuxt 这类的 SSR 方案和直接渲染 ejs 这类方案有什么本质的区别
Vue 和 React 使用的比重是怎样的，这两者各自的优劣介绍一下
PureComponent 会引入什么问题，什么情况下会需要用到它
[PureComponent](../frame-work/react/PureComponent.md)
Vue 的单文件开发模式，这个解析 vue-loader 是如何实现的。
如果 template 语言换掉的话，会如何处理。
script 的部分会如何处理，由于 babel-loader 是只能针对 js 类型的文件进行转化，那.vue 文件中的 script 标签是如何被 babel-loader 读取的。
vue scoped 是怎么实现的，dom 上的哈希是如何和 style 中的哈希对应起来的，又是如何保证每次生成的哈希不变的
babel.config.js 和.babelrc 有什么区别，应该在什么场景使用，同时使用的话会出现什么现象
Vue 调用 render 函数的时机是在什么时机被触发的，后续状态变更导致 render 又是谁触发的
Vue 和 React 在数据更新上的差异，Vue 这种数据劫持的方式会不会带来额外的问题，Vue3 在这些问题上有优化么
$set和$forceupdate 都做了哪些事
异步更新 DOM 这个操作，Vue 和 React 都是如何实现的，Vue 的异步处理还有其他方式可以做么，除了 MessageChannel 还有其他和他用法类似的 API 么
公用的代码如何做提取，如何判断一个资源是否应该被提取
Portal 除了做了把组件提到对应的 DOM 下之外，还做了哪些事
用什么方式发请求，axios 是个同构的工具，它是如何实现区分 Node 和浏览器环境的
axios 内部如何把 xhr 的 callback 转换为 promise 的，如何处理请求异常的

## 腾讯（看点）

### 一面

```js
const test1 = "a2[b]a2[b2[c]]";
// abbabccbcc
const test2 = "2[3[c]]a2a";
// cccccca2a
const test3 = "[abc][d]3[e2]4";
// abcde2e2e24
```

<!-- todo -->

http2 都有哪些应用，多路复用和 1.1 版本 keep-alive 有什么区别和联系，如果 http1.1 服务端需要按顺序处理请求，那为什么有的时候在一个页面里看图片，有时下面的图片会先出来，http pipeline 有了解吗，http 流传输有了解吗

前端的工程化都做了哪些事情？git CI/CD 都做了哪些事？比如 lint，安全检查，圈复杂度都有关注吗？lint 的规则是你们业务自己定制的吗？组件测试和自动化测试有做吗？上线的流水线有配过吗？小流量上线是如何做测试的？

## 网易灵犀

实现一下 koa 中间件原理，如何判断调用了多次 next 并抛出错误
介绍一下浏览器的合成层
如果一个页面需要同时适配 PC 端和移动端，应该怎么做，rem 和 vw 方案有什么区别
Vue 的响应式原理介绍一下，Watcher 的 cleanDeps 是做什么的
computed 和 watch 是什么原理

计算一个矩阵内，所有 1 覆盖的区域（岛屿问题） [力扣](https://leetcode-cn.com/problems/number-of-islands/)

## 美团买药

```js
let a = 3;
function func(a) {
  a = 10; // 函数参数传值
  console.log(a); // 10
}
func();
console.log(a); // 3
```

```js
["a","b","c","d"] => {a: {b: {c: {d: null}}}}
```

## 网易传媒

跨域是否允许携带 cookie，如果希望携带 cookie 需要如何做，如果 a.com 是我的域名，向 b.com 发请求，带的是哪个域名的 cookie
请求头的 host，origin，refer 的区别是什么 [header](../computer/network/header.md)
Object.create(null)和直接创建一个{}有什么区别 [object](../ES5/object.md)
离线存储是如何做的

## 360
移动端有没有遇到过滑动穿透的问题
强缓存和协商缓存谁的优先级谁高，区别是什么，强缓存和服务器有通讯么，没有通讯的话有状态码么，状态码是谁返回的，缓存是存到了哪里
[cache](../browser/cache.md)
<!-- todo -->
http 都有哪些版本，1.1 有什么不好的地方么，队头阻塞是什么引起的，2.0 有没有完全解决了队头阻塞问题
babel 配置过么，preset 和 plugin 谁的优先级高

## 腾讯音乐

Vue 的插槽的实现原理是什么
如果在 js 中执行 location.href = url，这个行为有可能会有哪些安全问题 [XSS](../browser/XSS.md)

## 微软

最长递增子序列 [力扣](https://leetcode-cn.com/problems/longest-increasing-subsequence/)
最长连续递增子序列 [力扣](https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/)

[lru](https://leetcode-cn.com/problems/lru-cache/)

## 腾讯广告

```js
// 解释一下函数调用栈和作用域链的关系
function bar() {
  console.log(project);
}

function foo() {
  var project = "foo";
  bar();
}

var project = "global";
foo();
```

判断一个对象是否是循环引用对象 [hasLoop](../ES5/hasLoop.js)
幂等与非幂等的区别
HTTP幂等方法，是指无论调用这个url多少次，都不会有不同的结果的HTTP方法
  - HTTP GET方法，用于获取资源，不管调用多少次接口，结果都不会改变，所以是幂等的。
  - HTTP POST方法是一个非幂等方法，因为调用多次，都将产生新的资源
  - HTTP PUT方法 直接把实体部分的数据替换到服务器的资源，我们多次调用它，只会产生一次影响，但是有相同结果的 HTTP 方法，所以满足幂等性。
  - HTTP PATCH方法是非幂等的 当调用一次方法，更新部分字段，将这条ticket记录的操作记录加一，这次，每次调用的资源是不是变了呢，所以它是有可能是非幂等的操作
  - HTTP DELETE方法用于删除资源，会将资源删除。调用一次和多次对资源产生影响是相同的，所以也满足幂等性。
## 度小满

怎么理解 vue 单向数据流的
Vue 组件之间的通信方式都有哪些，用过 eventbus 么，eventbus 的思想是什么
写个自定义 v-modal
$attrs和$listener 有了解吗
Vue 生命周期有哪些，都是做什么的，updated 什么情况下会触发，beforeCreate 的时候能拿到 Vue 实例么，组件销毁的时候调用的是哪个 API
什么情况下会触发组件销毁，销毁的时候会卸载自定义事件和原生事件么
自定义指令写过么，自定义指令都有哪些钩子
传统前端开发和框架开发的区别是什么
Vue2 的数据响应式有两个缺陷，你知道是哪两个缺陷么，为什么会有这样的缺陷，如何解决
Vue 如何实现的数组的监听，为什么 Vue 没有对数组下标修改做劫持
Symbol 有了解吗，迭代器有了解吗，哪些是可迭代的
用 Set 获取两个数组的交集，如何做
实现 Promise.all
animation 和 transition 有什么区别
写个动画，一个盒子，开始时缩放是 0，50%时是 1，100%时是 0，开始结束都是慢速，持续 2 秒，延迟 2 秒，结束后固定在结束的效果

[referer](https://juejin.cn/post/7036581158670303240)
