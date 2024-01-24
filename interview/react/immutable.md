#### 好处
不变性可以给你的应用带来性能提升，也可以带来更简单的编程和调试体验。
这是因为，与那些在整个应用中可被随意篡改的数据相比，永远不变的数据更容易追踪，推导。


#### 为什么 Redux 需要不变性？
Redux 和 React-Redux 都使用了浅比较。具体来说：
  - Redux 的 combineReducers 方法 浅比较 它调用的 reducer 的引用是否发生变化。
  - React-Redux 的 connect 方法生成的组件通过 浅比较根 state 的引用变化 与 mapStateToProps 函数的返回值，来判断包装的组件是否需要重新渲染。 以上浅比较需要不变性才能正常工作
不可变数据的管理极大地提升了数据处理的安全性。



####
因为性能考虑，Redux 使用浅比较。
浅比较的使用要求不变性


[referer](https://www.reduxjs.cn/faq/immutable-data/#redux-shallow-checking-requires-immutability)