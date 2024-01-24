## memorizedState

```js
// create: 传入 useEffect 函数的第一个参数,即回调函数;
// destroy: 回调函数 return 的函数,在该 effect 销毁的时候执行;
// deps: 依赖项;
// next: 指向下一个 effect;
// tag: effect 的类型,区分是 useEffect 还是 useLayoutEffect;

const effect: Effect = {
  tag,
  create,
  destroy,
  deps,
  // Circular
  next: (null: any),
}
```

#### 两者的区别是 useEffect 不会阻塞 DOM 的更新,useLayoutEffect 在 DOM 更新前同步触发，会阻塞 DOM 的更新

- render 阶段: 函数组件开始渲染的时候,创建出对应的 hook 链表挂载到 workInProgress 的 memoizedState 上,并创建 effect 链表,但是基于上次和本次依赖项的比较结果;
- commit 阶段: 异步调度 useEffect,layout 阶段同步处理 useLayoutEffect 的 effect,也就是在浏览器进行布局 layout 和回执 paint 之前同步执行。等到 commit 阶段完成,更新应用到页面上之后,开始处理 useEffect 产生的 effect;

#### 阶段

mount 阶段;
update 阶段;
