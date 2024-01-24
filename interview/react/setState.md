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


#### state与不可变对象
react官方把state当成不可变对象，一方面直接修改this.state，组件并不会重新render；
另一方面，state中包含的所有状态都应该是不可变的对象，state当中的某一个状态发生变化时，
应该重新创建这个状态对象，而不是直接修改原来的state状态，那么当状态发生变化时，
如何去创建新的状态呢，我们根据状态类型可以分为下面三种情况：
  - 状态类型为不可变类型
    number、string、boolean、null、undefined
    这种情况最简单，因为状态是不可变类型，所以直接给要修改的状态赋一个新值即可
  - 数组
    不要使用push，pop，shift，unshift，splice等方法修改数组类型的状态，
    因为这些方法都是在原数组的基础上修改的，而concat，slice，filter会返回一个新的数组。  
  - 状态的类型是普通对象
    ...
    Object.assgin()  
    ```js
      this.setState(preState=>{
        owner: {...preState.owner, name:'Jason'}
      })
    ```

#### 为什么React推荐组件状态的修改是不可变对象呢？
（1) 不可变对象的修改会返回一个新的对象，不用担心原对象在不小心的情况下修改导致的错误，方便程序的管理和调试。
（2) 处于性能的考虑，对象组件的状态是不可变对象时，在组件的shouldComponentUpdate方法中仅需要比较前后两次状态对象的引用就可以判断状态是否真的改变，从而避免不必要的render调用。
