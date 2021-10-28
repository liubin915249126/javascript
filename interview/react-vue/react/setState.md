## ？？
react 使用 shallowEqual (===) state 判断是否更新
setState shallow merge newState = {...state, [key]: props}


#### Immutable
react官方把state当成不可变对象，

## 遇到的问题


#### array
不要使用push，pop，shift，unshift，splice等方法修改数组类型的状态，
因为这些方法都是在原数组的基础上修改的，而concat，slice，filter会返回一个新的数组。
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

#### shouldComponentUpdate
当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。
返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。

#### Immutable.js
返回一个新数据
不可变数据，对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享
#### immerjs

