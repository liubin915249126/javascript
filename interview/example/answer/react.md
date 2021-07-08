## react


#### 说下react fiber。
把可中断的工作拆分成小任务
对正在做的工作调整优先次序、重做、复用上次（做了一半的）成果
在父子任务之间从容切换（yield back and forth），以支持React执行过程中的布局刷新
支持render()返回多个元素
更好地支持error boundary

#### react hooks 有哪些优缺点？
  - 优点
    - 更容易复用代码
    - 清爽的代码风格
    - 代码量更少
  - 缺点
    - 响应式的useEffect
    - 状态不同步

#### react中为什么不能在for循环、if语句里使用hooks，说下react hooks实现原理。
[hook](../code/hook.js)
[ref](https://zhuanlan.zhihu.com/p/65012054)

而useEffect的运行流程
- 初次渲染的时候，按照 useState，useEffect 的顺序，把 state，deps 等按顺序塞到 memoizedState 数组中。
- 更新的时候，按照顺序，从 memoizedState 中把上次记录的值拿出来。
- useState，useEffect 和使用的不是同一个数据
- 核心就在于每次更新把cursor赋值为零，然后更新时按照hooks顺序，依次从 memoizedState 中把上次记录的值拿出来，useEffect接受useState(返回新值)和旧值进行比较
#### useLayoutEffect 和 useEffect 区别是什么？
- useEffect
    基本上90%的情况下,都应该用这个,这个是在render结束后,你的callback函数执行,但是不会block browser painting,算是某种异步的方式吧,但是class的componentDidMount 和componentDidUpdate是同步的,在render结束后就运行,useEffect在大部分场景下都比class的方式性能更好.

- useLayoutEffect
    这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制.
