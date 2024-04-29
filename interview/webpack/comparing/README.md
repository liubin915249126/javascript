## 多种打包方案

#### webpack
#### snowpack
#### vite
- 一个是 Vite 主要对应的场景是开发模式，原理是拦截浏览器发出的 ES imports 请求并做相应处理。（生产模式是用 rollup 打包）
- 一个是 Vite 在开发模式下不需要打包，只需要编译浏览器发出的 HTTP 请求对应的文件即可，所以热更新速度很快。
- 需要要求项目里只使用原生 ES imports，如果使用了 require 将失效
#### esbuild
#### rollup
- 使用ES6的模块标准
- tree-shaking
[使用](https://juejin.im/post/6869551115420041229)
#### Parcel