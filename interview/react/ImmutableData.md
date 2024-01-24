## 不可变数据

Immutable，不可改变的，在计算机中，即指一旦创建，就不能再被更改的数据
对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象
Persistent Data Structure（持久化数据结构）

#### 变化范围

对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享

#### 性能优化

immutable 实现的原理是：持久化数据结构，也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。
同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗。

- 使用 Immutable 可以给 React 应用带来性能的优化，主要体现在减少渲染的次数
  - shouldComponentUpdate / Immutable 通过 is 方法则可以完成对比，而无需像一样通过深度比较的方式比较
- 在使用 redux 过程中也可以结合 Immutable，不使用 Immutable 前修改一个数据需要做一个深拷贝

#### PureComponent(memo)

与 React 中的 PureComponent(memo) 相结合，我们知道 PureComponent 能够在内部帮我们比较新 props 跟旧 props，新 state 和旧 state，如果值相等或者对象含有的相同的属性、且属性值相等，便确定 shouldComponentUpdate 返回 true 或者 false，从而判断是否再次渲染 render 函数。

作者：时光屋小豪
链接：https://juejin.cn/post/6863832173703593997
