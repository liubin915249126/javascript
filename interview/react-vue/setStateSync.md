## “异步的” setState 如何同步获取 state


#### setState的同步与异步的事机
- 异步
  由React控制的事件处理程序，以及生命周期函数调用setState
- 同步
  React控制之外的事件中调用setState是同步更新的。
  比如原生js绑定的事件，setTimeout/setInterval,Promise.then等。

#### setState 异步的原因
- 保证内部的一致性
  当我们使用 state-lifting 时候，同步更新 state，但this.props 并不会，
  如果要立即更新 this.props （也就是立即重渲染父组件），就必须放弃批处理（根据情况的不同，性能可能会有显著的下降）
  [Dan的解释](https://github.com/facebook/react/issues/11527#issuecomment-360199710)
- 性能优化
  将state的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实dom，那么它将带来巨大的性能消耗。

#### setStateSync 同步获取 state 
- Promise.then setTimeout/setInterval
  ```js
    new Promise(resolve=>{
      resolve()
    }).then(()=>{
        this.setState({})
    }) 
  ```
- setState 接收一个函数
  函数的首个参数就是上一次的state
  ```js 
    this.setState(prevState => {count: prevState.count + 1});
  ```
- setState 第二个参数回调函数
  在第二参数回调函数里面可以拿到更新后的state
  ```js
     this.setState({count:1},()=>console.log(this.state.count))
  ```
  回调函数容易让人想起回调地狱，更好的解决办法利用 async+await
- async + await 
  ```js
    setStateSync(state){
        return new Promise(resolve=>{
            this.setState(state,resolve)
        })
    }
    // 使用
    async example(){
        await this.setStateSync({count:1})
        console.log(this.state.count) //同步输出
    }
  ```
  >
    await 阻塞位于函数体里面 await 后面语句的执行，
    直到 await 后面的 promise resolve执行,
    resolve 放在 setState 第二个参数里面执行
    同步方式书写异步，避免回调地狱
  >
- 总结
  - 前面两种会影响性能
  - 推荐最后一种方法，不改变 setState 原本机制基础上，避免回调地狱 
#### setState 真的是异步的吗
>
  React使用了事务的机制，React的每个生命周期和合成事件都处在一个大的事务当中。在事务的前置钩子中调用batchedUpdates方法修改isBatchingUpdates变量为true，在后置钩子中将变量置为false。原生绑定事件和setTimeout异步的函数没有进入到React的事务当中，或者当他们执行时，刚刚的事务已近结束了，后置钩子触发了，所以此时的setState会直接进入非批量更新模式，表现在我们看来成为了同步SetState 
>

- 原文地址 [setStateSync](https://github.com/liubin915249126/javascript/blob/master/interview/react-vue/setStateSync.md)
- 另外我的博客地址 [blog](https://github.com/liubin915249126/javascript)会经常分享 最近的学习内容，项目中遇到的问题及解决方案