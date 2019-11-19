#### state
isBatchingUpdates:false
batchedUpdates

异步：React 引发的事件处理
同步：绕过 React 通过 addEventListener 直接添加的事件处理函数，还有通过 setTimeout/setInterval 产生的异步调用

React使用了事务的机制，React的每个生命周期和合成事件都处在一个大的事务当中。在事务的前置钩子中调用batchedUpdates方法修改isBatchingUpdates变量为true，在后置钩子中将变量置为false。原生绑定事件和setTimeout异步的函数没有进入到React的事务当中，或者当他们执行时，刚刚的事务已近结束了，后置钩子触发了，所以此时的setState会直接进入非批量更新模式，表现在我们看来成为了同步SetState


##### PureComponent shouldComponentUpdate(nextProps, nextState) 
浅比较 props,state

改变数据地址
immutable.js

React.memo(FunctionalComponent,equal)

#### memoize-one