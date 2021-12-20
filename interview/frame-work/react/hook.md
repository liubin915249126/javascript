## hook
闭包 + 两级链表

#### 闭包
组件挂载阶段hook执行的源码
```js
// packages/react-reconciler/src/ReactFiberHooks.js
function mountReducer(reducer, initialArg, init) {
  const hook = mountWorkInProgressHook();
  let initialState;
  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = initialArg;
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    last: null,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: initialState,
  });
  // 重点
  const dispatch = (queue.dispatch = (dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  )));
  return [hook.memoizedState, dispatch];
}
// currentlyRenderingFiber: 其实就是workInProgressTree, 即更新时链表当前正在遍历的fiber节点(源码注释：The work-in-progress fiber. I've named it differently to distinguish it from the work-in-progress hook)；
// queue: 指向hook.queue，保存当前hook操作相关的reducer 和 状态的对象，其来源于mountWorkInProgressHook这个函数，下面重点讲；
// 这个闭包将 fiber节点与action, action 与 state很好的串联起来了，举上面的例子就是：

// 当点击增加执行setAge, 执行后，新的state更新任务就储存在fiber节点的hook.queue上，并触发更新；
// 当节点更新时，会遍历queue上的state任务链表，计算最终的state，并进行渲染；
```
#### FC VS class component
>
useState: 状态的存储及更新，状态更新会触发组件更新，和类的state类似，只不过setState更新时是采用Object.assign(oldstate, newstate); 而useState的set是直接替代式的
useEffect: 类似于以前的componentDidMount 和 componentDidUpdate生命周期钩子(即render 执行后，再执行Effect, 所以当组件与子组件都有Effect时，子组件的Effect先执行)， Update需要deps依赖来唤起；
useRefs: 用法类似于以前直接挂在类的this上，像this.selfCount 这种，用于变量的临时存储，而又不至于受函数更新，而被重定义；与useState的区别就是，refs的更新不会导致Rerender
useMemo: 用法同以前的componentWillReceiveProps与getDerivedStateFromProps中，根据state和props计算出一个新的属性值：计算属性
useCallback: 类似于类组件中constructor的bind，但比bind更强大，避免回调函数每次render造成回调函数重复声明，进而造成不必要的diff；但需要注意deps，不然会掉进闭包的坑
useReducer: 和redux中的Reducer相像，和useState一样，执行后可以唤起Rerender
>