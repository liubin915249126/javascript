## fiber

####

- 调度阶段（reconciliation）：在这个阶段 React 会更新数据生成新的 Virtual DOM，然后通过 Diff 算法，快速找出需要更新的元素，放到更新队列中去，得到新的更新队列。
- 渲染阶段（commit）：这个阶段 React 会遍历更新队列，将其所有的变更一次性更新到 DOM 上。
- Stack Reconciler -> Fiber Reconciler

#### 浏览器一帧

- 接受输入事件
- 执行事件回调
- 开始一帧
- 执行 RAF (RequestAnimationFrame)
- 页面布局，样式计算
- 绘制渲染
- 执行 RIC (RequestIdelCallback)

```js
requestIdleCallback((deadline) => {
  // deadline 有两个参数
  // timeRemaining(): 当前帧还剩下多少时间
  // didTimeout: 是否超时
  // 另外 requestIdleCallback 后如果跟上第二个参数 {timeout: ...} 则会强制浏览器在当前帧执行完后执行。
  if (deadline.timeRemaining() > 0) {
    // TODO
  } else {
    requestIdleCallback(otherTasks)
  }
})
```

#### Reconciliation 阶段 调度

beginWork 和 completeWork。在 beginWork 阶段，React 会执行组件的渲染逻辑，并计算副作用（side effects）。在 completeWork 阶段，是向上归并的过程，如果有兄弟节点，会返回 sibling 兄弟，没有返回 return 父级，一直返回到 fiebrRoot ，期间可以形成 effectList，对于初始化流程会创建 DOM ，对于 DOM 元素进行事件收集，处理 style，className 等，这个阶段并不直接更新 DOM 或触发任何用户可见的更改，而是为后续的 Commit 阶段做准备。

#### Commit 阶段

在 Commit 阶段，React 将根据在 Reconciliation 阶段生成的更新计划来执行实际的 DOM 更新。这个过程包括更新 DOM 节点、处理生命周期方法（如在类组件中的 useEffect）以及执行其他与渲染相关的副作用。此阶段是同步执行的，意味着一旦开始，就会一口气完成，不会被其他任务打断。

####

⚛️ 协调阶段: 可以认为是 Diff 阶段, 这个阶段可以被中断, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更 React 称之为'副作用(Effect)' . 以下生命周期钩子会在协调阶段被调用：

constructor
componentWillMount 废弃
componentWillReceiveProps 废弃
static getDerivedStateFromProps
shouldComponentUpdate
componentWillUpdate 废弃
render

⚛️ 提交阶段: 将上一个阶段计算出来的需要处理的**副作用(Effects)**一次性执行了。这个阶段必须同步执行，不能被打断. 这些生命周期钩子在提交阶段被执行:

getSnapshotBeforeUpdate() 严格来说，这个是在进入 commit 阶段前调用
componentDidMount
componentDidUpdate
componentWillUnmount

需要注意的是：因为协调阶段可能被中断、恢复，甚至重做，⚠️React 协调阶段的生命周期钩子可能会被调用多次!, 例如 componentWillMount 可能会被调用两次。
因此建议 协调阶段的生命周期钩子不要包含副作用. 索性 React 就废弃了这部分可能包含副作用的生命周期方法，例如 componentWillMount、componentWillUpdate. v17 后我们就不能再用它们了, 所以现有的应用应该尽快迁移.

作者：荒山
链接：https://juejin.cn/post/6844903975112671239
