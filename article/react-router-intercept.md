### react-router 拦截器

#### react-router v3的拦截器
  组件自带 onEnter onLeave 事件
#### react-router v4以后的拦截器
  route完全组件化，直接在对应的组件的生命周期
#### 路由跳转
  class 组件 this.props 注入了一个 history 对象
  function 组件 useHistory
  组件外:
  ```js
     import { createHashHistory,createBrowserHistory } from 'history'
     const history = createHashHistory()||createBrowserHistory()
  ```