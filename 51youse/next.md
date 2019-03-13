## next.js

#### 框架特点
>
    使用后端渲染
    自动进行代码分割（code splitting），以获得更快的网页加载速度
    简洁的前端路由实现
    使用webpack进行构建，支持模块热更新（Hot Module Replacement）
    可与主流Node服务器进行对接（如koa，express）
    可自定义babel和webpack的配置
>

#### 状态管理与样式
>
  目前已集成 dva，less，css-modules,
  dva:将 redux,redux-saga的分开写法,集成进一个model文件，省去大部份的样板代码
>

#### 目前以解决问题
>
  全局样式与css-modules的区分
  proxy
>