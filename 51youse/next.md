## next.js

#### 框架特点
>
    使用后端渲染加快首屏渲染,增强SEO
    自动进行代码分割（code splitting），以获得更快的网页加载速度
    简洁的前端路由实现
    使用webpack进行构建，支持模块热更新（Hot Module Replacement）
    可与主流Node服务器进行对接（如koa，express）
    可自定义babel和webpack的配置
>

#### 兼容性
>
  Next.js 支持 IE11 and all modern browsers 需要 polyfill
  dva  IE8+
>

#### 状态管理
>
  状态管理使用场景:
  1.需要跨组件共享的数据
  2.页面返回时需要保留之前的状态

  对于以上两种需要使用状态管理的场景
    项目集成了dva，dva集成了redux,redux-saga,能够处理同步与异步数据的共享问题，
    dva将 redux,redux-saga的分开写法,集成进一个model文件，省去大部份的样板代码。

  对于不需要使用的状态管理的场景:
    如果所有请求的数据全部塞进全局store会造成页面比较臃肿，根据前面项目经验倾向于直接在组件请求数据
    放进组件state,对于跨组件通信采用 React 的 state lifting(状态提升) 如果组件设计合理可以覆盖
    大部分场景。
>

#### 逻辑与样式
>
  项目采用ES6+,配合React能够提高开发效率,用babel解析为ES5/3的代码供浏览器识别

  项目样式文件可分为全局样式，组件样式，行内样式。
  全局样式通常是定义通用的类对所有页面起作用
  react推崇组件化写法，项目中以antd组件为基础将通用模块抽出为通用业务组件，为避免组件样式相互影响，采用了
  css-modules(也可以有其他方案)，将样式表跟着组件走
  行内样式则可以通过js控制，react通常是将样式与state绑定(这种尽量少出现)，在react中Dom节点或是组件作为
  一种数据结构，可以采用卸载挂载的方式切换。
>
#### 开发
可由express 的 http-proxy-middleware,做到路由转发解决跨域
#### 存在的问题，已解决的问题
发现的问题
  官网说是要实现文件hash，但目前发现还没有
已解决
  前端路由(next内部实现)
  404，500页面的实现(已解决)
  全局样式与css-modules(已解决)
  dva的引入(已解决)
  跨域的实现(已解决)
  组件的复用(已解决)
  请求报错的提示及跳转(已解决)
  组件的通讯(已有解决方案)
  
#### nextjs开发模式切换页面样式丢失  
```js
// 在Layout组件中  
<Head>
  <title>{title}</title>
  {process.env.NODE_ENV !== 'production' && (<link rel="stylesheet" type="text/css" href={'/_next/static/css/styles.chunk.css?v=' + Router.route} />)}
</Head>    
```
```js
   // 在_app.js中
  import Router from 'next/router';
  
  Router.events.on('routeChangeComplete', () => {
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
    const timestamp = new Date().valueOf();
    els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
  }
  });
```