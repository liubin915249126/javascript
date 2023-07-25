## fiber

js 单线程
React 通过 Fiber 架构，让自己的 Reconcilation 过程变成可被中断。 '适时'地让出 CPU 执行权，除了可以让浏览器及时地响应用户的交互

> Ruby 就将协程称为 Fiber,Lua 的 Coroutine, ES6 新增的 Generator。

####

[referer](https://juejin.cn/post/6844903975112671239)
超时检查的机制来让出控制权 requestIdleCallback
[frame]()
任务分类

- Immediate(-1) - 这个优先级的任务会同步执行, 或者说要马上执行且不能中断
- UserBlocking(250ms) 这些任务一般是用户交互的结果, 需要即时得到反馈
- Normal (5s) 应对哪些不需要立即感受到的任务，例如网络请求
- Low (10s) 这些任务可以放后，但是最终应该得到执行. 例如分析通知
- Idle (没有超时时间) 一些没有必要做的任务 (e.g. 比如隐藏的内容), 可能会被饿死

####

```js
// 1️⃣ performWork 会拿到一个Deadline，表示剩余时间
function performWork(deadline) {
  // 2️⃣ 循环取出updateQueue中的任务
  while (updateQueue.length > 0 && deadline.timeRemaining() > ENOUGH_TIME) {
    workLoop(deadline)
  }
  // 3️⃣ 如果在本次执行中，未能将所有任务执行完毕，那就再请求浏览器调度
  if (updateQueue.length > 0) {
    requestIdleCallback(performWork)
  }
}
```

workLoop 的工作大概猜到了，它会从更新队列(updateQueue)中弹出更新任务来执行，每执行完一个‘执行单元‘，就检查一下剩余时间是否充足，如果充足就进行执行下一个执行单元，反之则停止执行，保存现场，等下一次有执行权时恢复:

```js
// 保存当前的处理现场
let nextUnitOfWork: Fiber | undefined // 保存下一个需要处理的工作单元
let topWork: Fiber | undefined // 保存第一个工作单元

function workLoop(deadline: IdleDeadline) {
  // updateQueue中获取下一个或者恢复上一次中断的执行单元
  if (nextUnitOfWork == null) {
    nextUnitOfWork = topWork = getNextUnitOfWork()
  }

  // 🔴 每执行完一个执行单元，检查一次剩余时间
  // 如果被中断，下一次执行还是从 nextUnitOfWork 开始处理
  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    // 下文我们再看performUnitOfWork
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork, topWork)
  }

  // 提交工作，下文会介绍
  if (pendingCommit) {
    commitAllWork(pendingCommit)
  }
}
```

#### VirtualDOM 节点 数据表示

```js
export type Fiber = {
  // Fiber 类型信息
  type: any,
  // ...

  // ⚛️ 链表结构
  // 指向父节点，或者render该节点的组件
  return: Fiber | null,
  // 指向第一个子节点
  child: Fiber | null,
  // 指向下一个兄弟节点
  sibling: Fiber | null,
}
```

performUnitOfWork 深度优先的遍历返回下一个 Fiber

```js
/**
 * @params fiber 当前需要处理的节点
 * @params topWork 本次更新的根节点
 */
function performUnitOfWork(fiber: Fiber, topWork: Fiber) {
  // 对该节点进行处理
  beginWork(fiber)

  // 如果存在子节点，那么下一个待处理的就是子节点
  if (fiber.child) {
    return fiber.child
  }

  // 没有子节点了，上溯查找兄弟节点
  let temp = fiber
  while (temp) {
    completeWork(temp)

    // 到顶层节点了, 退出
    if (temp === topWork) {
      break
    }

    // 找到，下一个要处理的就是兄弟节点
    if (temp.sibling) {
      return temp.sibling
    }

    // 没有, 继续上溯
    temp = temp.return
  }
}
```

#### Reconciliation(协调阶段) 和 Commit(提交阶段).

- 协调阶段: 可以认为是 Diff 阶段, 这个阶段可以被中断, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更 React 称之为'副作用(Effect)' . 以下生命周期钩子会在协调阶段被调用：
  constructor
  componentWillMount 废弃
  componentWillReceiveProps 废弃
  static getDerivedStateFromProps
  shouldComponentUpdate
  componentWillUpdate 废弃
  render

- 提交阶段: 将上一个阶段计算出来的需要处理的**副作用(Effects)**一次性执行了。这个阶段必须同步执行，不能被打断. 这些生命周期钩子在提交阶段被执行:

  getSnapshotBeforeUpdate() 严格来说，这个是在进入 commit 阶段前调用
  componentDidMount
  componentDidUpdate
  componentWillUnmount

- 因为协调阶段可能被中断、恢复，甚至重做，⚠️React 协调阶段的生命周期钩子可能会被调用多次!, 例如 componentWillMount 可能会被调用两次
- 协调阶段的生命周期钩子不要包含副作用. 索性 React 就废弃了这部分可能包含副作用的生命周期方法，例如 componentWillMount、 componentWillUpdate. v17 后我们就不能再用它们了, 所以现有的应用应该尽快迁移.
- 因为我们要正确地处理各种副作用，包括 DOM 变更、还有你在 componentDidMount 中发起的异步请求、useEffect 中定义的副作用... 因为有副作用，所以必须保证按照次序只调用一次，况且会有用户可以察觉到的变更, 不容差池。

#### Reconcilation

> Fiber 包含的属性可以划分为 5 个部分:

🆕 结构信息 - 这个上文我们已经见过了，Fiber 使用链表的形式来表示节点在树中的定位

节点类型信息 - 这个也容易理解，tag 表示节点的分类、type 保存具体的类型值，如 div、MyComp

节点的状态 - 节点的组件实例、props、state 等，它们将影响组件的输出

🆕 副作用 - 这个也是新东西. 在 Reconciliation 过程中发现的'副作用'(变更需求)就保存在节点的 effectTag 中(想象为打上一个标记).
那么怎么将本次渲染的所有节点副作用都收集起来呢？ 这里也使用了链表结构，在遍历过程中 React 会将所有有‘副作用’的节点都通过 nextEffect 连接起来

🆕 替身 - React 在 Reconciliation 过程中会构建一颗新的树(官方称为 workInProgress tree，WIP 树)，可以认为是一颗表示当前工作进度的树。还有一颗表示已渲染界面的旧树，React 就是一边和旧树比对，一边构建 WIP 树的。 alternate 指向旧树的同等节点。

>

```js
function beginWork(fiber: Fiber): Fiber | undefined {
  if (fiber.tag === WorkTag.HostComponent) {
    // 宿主节点diff
    diffHostComponent(fiber)
  } else if (fiber.tag === WorkTag.ClassComponent) {
    // 类组件节点diff
    diffClassComponent(fiber)
  } else if (fiber.tag === WorkTag.FunctionComponent) {
    // 函数组件节点diff
    diffFunctionalComponent(fiber)
  } else {
    // ... 其他类型节点，省略
  }
}

function diffHostComponent(fiber: Fiber) {
  // 新增节点
  if (fiber.stateNode == null) {
    fiber.stateNode = createHostComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  const newChildren = fiber.pendingProps.children

  // 比对子节点
  diffChildren(fiber, newChildren)
}

function diffClassComponent(fiber: Fiber) {
  // 创建组件实例
  if (fiber.stateNode == null) {
    fiber.stateNode = createInstance(fiber)
  }

  if (fiber.hasMounted) {
    // 调用更新前生命周期钩子
    applybeforeUpdateHooks(fiber)
  } else {
    // 调用挂载前生命周期钩子
    applybeforeMountHooks(fiber)
  }

  // 渲染新节点
  const newChildren = fiber.stateNode.render()
  // 比对子节点
  diffChildren(fiber, newChildren)

  fiber.memoizedState = fiber.stateNode.state
}

function diffChildren(fiber: Fiber, newChildren: React.ReactNode) {
  let oldFiber = fiber.alternate ? fiber.alternate.child : null
  // 全新节点，直接挂载
  if (oldFiber == null) {
    mountChildFibers(fiber, newChildren)
    return
  }

  let index = 0
  let newFiber = null
  // 新子节点
  const elements = extraElements(newChildren)

  // 比对子元素
  while (index < elements.length || oldFiber != null) {
    const prevFiber = newFiber
    const element = elements[index]
    const sameType = isSameType(element, oldFiber)
    if (sameType) {
      newFiber = cloneFiber(oldFiber, element)
      // 更新关系
      newFiber.alternate = oldFiber
      // 打上Tag
      newFiber.effectTag = UPDATE
      newFiber.return = fiber
    }

    // 新节点
    if (element && !sameType) {
      newFiber = createFiber(element)
      newFiber.effectTag = PLACEMENT
      newFiber.return = fiber
    }

    // 删除旧节点
    if (oldFiber && !sameType) {
      oldFiber.effectTag = DELETION
      oldFiber.nextEffect = fiber.nextEffect
      fiber.nextEffect = oldFiber
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index == 0) {
      fiber.child = newFiber
    } else if (prevFiber && element) {
      prevFiber.sibling = newFiber
    }

    index++
  }
}
```

#### reconcile 调和

reconcile 其实就是虚拟 DOM 树的 diff 操作，需要删除不需要的节点，更新修改过的节点，添加新的节点

#### 双缓冲

图形绘制引擎一般会使用双缓冲技术，先将图片绘制到一个缓冲区，再一次性传递给屏幕进行显示，这样可以防止屏幕抖动，优化渲染性能。

- 放到 React 中，WIP 树就是一个缓冲，它在 Reconciliation 完毕后一次性提交给浏览器进行渲染。它可以减少内存分配和垃圾回收，WIP 的节点不完全是新的，比如某颗子树不需要变动，React 会克隆复用旧树中的子树。
- 双缓存技术还有另外一个重要的场景就是异常的处理，比如当一个节点抛出异常，仍然可以继续沿用旧树的节点，避免整棵树挂掉。

```js
// 所有打了 Effect 标记的节点串联起来
function completeWork(fiber) {
  const parent = fiber.return

  // 到达顶端
  if (parent == null || fiber === topWork) {
    pendingCommit = fiber
    return
  }

  if (fiber.effectTag != null) {
    if (parent.nextEffect) {
      parent.nextEffect.nextEffect = fiber
    } else {
      parent.nextEffect = fiber
    }
  } else if (fiber.nextEffect) {
    parent.nextEffect = fiber.nextEffect
  }
}
// 将所有副作用提交
function commitAllWork(fiber) {
  let next = fiber
  while (next) {
    if (fiber.effectTag) {
      // 提交，偷一下懒，这里就不展开了
      commitWork(fiber)
    }
    next = fiber.nextEffect
  }

  // 清理现场
  pendingCommit = nextUnitOfWork = topWork = null
}
```
