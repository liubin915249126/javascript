## 重绘和回流

回流必重绘

#### 回流也叫重排

> 简单来说，就是当我们对 DOM 结构的修改引发 DOM 几何尺寸变化的时候，会发生回流的过程。
> 具体一点，有以下的操作会触发回流:

- 一个 DOM 元素的几何属性变化，常见的几何属性有 width、height、padding、margin、left、top、border 等等, 这个很好理解。
- 使 DOM 节点发生增减或者移动。
- 读写 offset 族、scroll 族和 client 族属性的时候，浏览器为了获取这些值，需要进行回流操作。
- 调用 window.getComputedStyle 方法。
  >

#### 重绘

触发条件
当 DOM 的修改导致了样式的变化，并且没有影响几何属性的时候，会导致重绘(repaint)。

#### 实践意义

知道上面的原理之后，对于开发过程有什么指导意义呢？

- 避免频繁使用 style，而是采用修改 class 的方式。
- 使用 createDocumentFragment 进行批量的 DOM 操作。
- 对于 resize、scroll 等进行防抖/节流处理。
- 添加 will-change: tranform ，让渲染引擎为其单独实现一个图层，当这些变换发生时，仅仅只是利用合成线程去处理这些变换，而不牵扯到主线程，大大提高渲染效率。当然这个变化不限于 tranform, 任何可以实现合成效果的 CSS 属性都能用 will-change 来声明
