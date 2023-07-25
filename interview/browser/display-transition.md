## 浏览器每一帧与事件循环

## display: none vs transition

display: none -> display: block 加了 transition 没有过渡效果

display + opacity

```js
container.addEventListener('click', function (e) {
  target.classList.toggle('display')
  target.classList.toggle('opacity')
})
```

依然没效果：opacity 变化和 display 的变化在同一帧执行

#### 解决办法 1

```js
target.classList.toggle('display')
console.log(target.offsetWidth)
target.classList.toggle('opacity')
```

获取元素几何尺寸会导致浏览器重绘 repaint, 立即执行 render, opacity 变化在 display 变化的下一帧执行。

#### 宏任务与微任务与微任务的尝试

```js
target.classList.toggle('display')
setTimeout(() => {
  target.classList.toggle('opacity')
}, 0)
// 宏任务可以
// 微任务不可以
target.classList.toggle('display')
Promise.resolve().then(() => {
  console.log(111)
  target.classList.toggle('opacity')
})
```

#### 宏任务与微任务

一般浏览器的刷新率为 60HZ，即 1 秒钟刷新 60 次。1000ms / 60hz = 16.6 ，大概每过 16.6ms 浏览器会渲染一帧画面。
在这段时间内，浏览器大体会做两件事：task 与 render。
task 被称为宏任务，包括 setTimeout，setInterval，setImmediate，postMessage，requestAnimationFrame，I/O，DOM 事件 等。
render 是指渲染页面。
task 执行过程中如果调用 Promise、MutationObserver、process.nextTick 会将其作为 微任务 保存在 microTask queue 中。
每当执行完 task，在执行下一个 task 前，都需要检查 microTask queue，执行并清空里面的 microTask。
在当前的微任务没有执行完成时，是不会执行下一个宏任务的。

#### 浏览器一帧

- 接受输入事件
- 执行事件回调
- 开始一帧
- 执行 RAF (RequestAnimationFrame) 但此刻执行的是上一帧注册的（动画）事件！
- 页面布局，样式计算
- 绘制渲染
- 执行 RIC (requestIdleCallback)

其中 update rendering（视图渲染）发生在本轮事件循环的 microtask 队列被执行完之后，所以微任务不行，
setTimeout 宏任务，但是浏览器可能会在一帧执行多个 task，所以不能保证每一次 task 都会执行 render，timeout=16.67
大概可以保证在下一帧执行。

#### 最好的解决办法

浏览器下一帧

```js
requestAnimationFrame(() => {
  target.classList.toggle('opacity')
})
```

#### requestAnimationFrame vs setTimeout

- requestAnimationFrame 可以保证在下一帧执行
- requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，
  并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒 60 帧。
- 在隐藏或不可见的元素中，requestAnimationFrame 将不会进行重绘或回流，
  这当然就意味着更少的的 cpu，gpu 和内存使用量。

useCapture 可选
这个参数设计到事件的捕获与冒泡，为 true 时捕获，false 时冒泡。
