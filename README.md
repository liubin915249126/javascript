# javascript

## javascript 基础系列学习

- [作用域](./interview/ES5/scope.md)
- [执行上下文与变量对象](./interview/ES5/execution-context.md)
- [原型链](./interview/prototype/prototype.md)
- [new 的模拟实现](./interview/ES5/new.md)
- [多种继承方式](./interview/prototype/extends.md)
- [“异步的” setState 如何同步获取 state](./interview/react-vue/setStateSync.md)
- [fetch 拦截器的实现](./interview/ES6/fetch.md)
- [js 异步发展史](./house/51youse/PPT-async.md)
- [js 错误处理](./interview/ES5/error.md)
- [js 判断相等](./interview/ES6/SameValue.md)
- 函数式编程
  - [partial](./interview/functional/partial.md)
    - [curry 柯理化](./interview/functional/curry.md)
  - [compose](./interview/functional/compose.md)
  - [memoize](./interview/functional/memoize.md)

## ES6 基础系列学习

- [class](./interview/ES6/class.md)
- Set、Map、WeakSet 和 WeakMap 的区别
  - [SetMap](./interview/ES6/SetMap.md)
- [Symbol](./interview/ES6/Symbol.md)
- Iterator 迭代器与 for of
  - [Iterator](./interview/ES6/Iterator.md)
  - [参考文献](https://github.com/mqyqingfeng/Blog/issues/90)

## 手写源码系列

- [手写 Promise](./interview/function/promise.js)
  - [Promise](https://github.com/then/promise)
  - [asap](https://github.com/kriskowal/asap)
- [debounce](./interview/debounce.md) [throttle](./interview/debounce.md)
- [ES5 Array: forEach/map/filter/reduce/indexOf/every,some](./interview/ES5/array.md)

## 前端框架
- [React.setState](./interview/react-vue/react/setState.md) 
- [vite](./interview/tools/vite.md)
- [immer.js](./interview/frame-work/immerjs.md)
## 浏览器相关

- [浏览器事件循环](./house/51youse/PPT-broswer.md)
- 浏览器缓存
  - [浏览器文件缓存](./interview/browser/cache.md)
  - [ServiceWorker](./interview/browser/ServiceWorker.md)
  - [Workbox](./interview/browser/Workbox.md)
- [浏览器安全](./interview/browser/XSS.md)
- [浏览器回流与重绘](./interview/browser/repaint.md)
- [图片懒加载](./interview/browser/img-lazy.md)

## 工具类

- webpack

  - [webpack 性能优化](./webpack/optimization.md)
  - [webpack 输出质量优化](./webpack/output-optimization.md)
  - [webpack 加载动态图片](./webpack/dynamic-import-image.md)

- nginx
  - [nginx 基本配置](./tools/nginx/study.md)
  - [前后端分离通过 nginx 配置二级域名](./tools/nginx/secondary.md)

## 计算机基础系列

<!-- #### 计算机网络
- [概述](./interview/computer/network.md)
- [数据交换](./interview/computer/network/exchange.md)
- [网络性能](./interview/computer/network/performance.md)
- 计算机网络体系结构
  - [OSI](./interview/computer/network/OSI.md)
  - [TCP-IP](./interview/computer/network/TCP-IP.md)
- [应用层:Web/Email/DNS](./interview/computer/network/appliction.md)
- [传输层](./interview/computer/network/transport.md)
-->

### 算法与数据结构

[algorithm](./interview/algorithm/README.md)

#### 数据结构

- [Stack](./interview/algorithm/structer/stack.md)
- [queue](./interview/algorithm/structer/queue.md)
- [LinkedList](./interview/algorithm/structer/LinkedList.md)
<!-- - [tree](./interview/algorithm/structer/tree.md)
- [graph](./interview/algorithm/structer/graph.md) -->

#### 算法

<!-- ![排序算法](./assets/sort.webp) -->

- 排序算法
  - [冒泡排序](./interview/algorithm/sort/bubble-sort.js)
  - [选择排序](./interview/algorithm/sort/selection-sort.js)
  - [插入排序](./interview/algorithm/sort/insert-sort.js)
- [洗牌算法](./interview/algorithm/shuffle/shuffle1.js)
- 动态规划
  - [climStairs 爬楼梯](./interview/algorithm/dynamic/climStairs.js)
  - [allPath 所有路径](./interview/algorithm/dynamic/allPath.js)
  - [minPath 最短路径](./interview/algorithm/dynamic/minPath.js)
  - [maxRect 最大正方形](./interview/algorithm/yiti/maxRect.js)

## interview

- [interview](./interview/README.md)

## javascript,jquery 相关

<!-- 说明 -->

### 说明

jquery 插件皆可用于 react,使用方法:[react 中使用 jquery 插件](https://github.com/liubin915249126/react-study/tree/master/jquery%20in%20react)

<!--lencharts-->

### 封装了一个组织架构图的 jquery 插件[lenharts](https://github.com/liubin915249126/javascript/tree/master/lencharts)

#### 效果图

![效果图](https://github.com/liubin915249126/javascript/blob/master/lencharts/image/lenchart.gif)

<!--视差效果-->

#### 视差效果[parallax](https://github.com/liubin915249126/javascript/blob/master/Parallax/index.html)：

![效果图](https://github.com/liubin915249126/javascript/blob/master/Parallax/img/parallax.gif)

#### 用 SVG 连接两个 div[index.html](https://github.com/liubin915249126/javascript/blob/master/SVG/index.html)d3.js 动态修改 SVG 属性

![效果图](https://github.com/liubin915249126/javascript/blob/master/SVG/image/svgDrag.gif)

<!--判断鼠标划入方向-->

s

#### js 判断鼠标划入方向[mousedirction](https://github.com/liubin915249126/javascript/blob/master/js-plugin/mouseDirction.html)

![效果图](https://github.com/liubin915249126/javascript/blob/master/assets/dirction.gif)

<!-- jsplumb -->

### [jsplumb](https://github.com/liubin915249126/javascript/tree/master/jsplumb)流程图插件

#### 效果图

![效果图](https://github.com/liubin915249126/javascript/blob/master/jsplumb/image/index.gif)

<!-- spacetree -->

### [spacetree](https://github.com/liubin915249126/javascript/tree/master/spacetree)定制内容,异步加载子节点

#### 效果图

![效果图](https://github.com/liubin915249126/javascript/blob/master/spacetree/image/spacetree1.gif)

#### 定制化内容后的效果图

![效果图](https://github.com/liubin915249126/javascript/blob/master/spacetree/image/spacetree.gif)

#### jquery 放大镜插件[index1.html](https://github.com/liubin915249126/javascript/blob/master/imagezoom/index1.html)

![效果图](https://github.com/liubin915249126/javascript/blob/master/imagezoom/image/imagezoom.gif)

#### html+css+js 画出的架构图[index1.html](https://github.com/liubin915249126/javascript/blob/master/lencharts/examples/index1.html)

![效果图](https://github.com/liubin915249126/javascript/blob/master/lencharts/image/%E7%89%B9%E5%8C%BA%E5%BB%BA%E5%8F%91.png)
