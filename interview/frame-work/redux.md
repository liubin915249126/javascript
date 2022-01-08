## redux

#### 三大原则
- 单一数据源
  整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
- State 是只读的
  唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象
- 使用纯函数来执行修改
  为了描述 action 如何改变 state tree ，你需要编写 reducers。