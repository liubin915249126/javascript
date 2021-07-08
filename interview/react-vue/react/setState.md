## 
react 使用 shallowEqual state 判断是否更新
setState shallow merge newState = {...state, ...{[key]: props}}
## 遇到的问题

#### nested state update
```js
// ... 或者 Object.assign 可以阻断对象引用
// 嵌套太深的则可以deepClone，比较浪费性能
this.setState({
  access: {
    ...this.state.access,
    hospital_id: 1,
  },
});
```
#### pureComponent 
[shallowEqual](https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js#L39)
[shallowEqual](./shallowEqual.js)

通过props和state的浅对比来实现 shouldComponentUpate()。

#### Immutable.js
不可变数据，对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享
#### immerjs

