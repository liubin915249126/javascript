#### useCallback

useCallback 使用场景

- 将其作为 props 传递给包装在 [memo] 中的组件。如果 props 未更改，则希望跳过重新渲染。缓存允许组件仅在依赖项更改时重新渲染。
- 传递的函数可能作为某些 Hook 的依赖。比如，另一个包裹在 useCallback 中的函数依赖于它，或者依赖于 useEffect 中的函数。
- 自定义 hook 的时候，返回的 function 需要包裹下。

#### useMemo

- 你在 useMemo 中进行的计算明显很慢，而且它的依赖关系很少改变。
- 将计算结果作为 props 传递给包裹在 memo 中的组件。当计算结果没有改变时，你会想跳过重新渲染。记忆化让组件仅在依赖项不同时才重新渲染。
- 你传递的值稍后用作某些 Hook 的依赖项。例如，也许另一个 useMemo 计算值依赖它，或者 useEffect 依赖这个值。

#### useEffect

- setup：处理 Effect 的函数。setup 函数选择性返回一个 清理（cleanup） 函数。当组件被添加到 DOM 的时候，React 将运行 setup 函数。在每次依赖项变更重新渲染后，React 将首先使用旧值运行 cleanup 函数（如果你提供了该函数），然后使用新值运行 setup 函数。在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数。
- 使用 Object.is 来比较每个依赖项和它先前的值
- 第一个 useEffect 没有添加依赖数组，它的触发时机有：

  - 组件挂载、卸载的时候
  - 页面每一次 re-render 的时候，即 leftCount 和 rightCount 更新的时候，也是左按钮和右按钮点击的时候

- 第二个 useEffect 依赖数组添加了 rightCount，它的触发时机有：

  - 组件挂载、卸载的时候
  - rightCount 触发的 re-render 的时候，即 rightCount 更新的时候，也是右按钮点击的时候

- 第三个 useEffect 依赖数组说空的，它的触发时机有：
  - 组件挂载、卸载的时候
