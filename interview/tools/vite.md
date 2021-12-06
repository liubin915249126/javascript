## vite
[实现](./vite.js)

#### ES Modules
是浏览器支持的一种模块化方案
```js
<script type="module" src="main.js"></script>
// 当 script.type 为 module 时，通过 src 及 import 导入的文件会发送 http 请求。
import vue from './src/App.vue';
// 当浏览器解析上面代码时，会向服务器发送一个请求来获取对应的资源。
// 浏览器只支持相对路径和绝对路径的解析
```

#### 解析 /@modules
接下来就是要把 /@modules 开头的路径解析为真正的文件地址，并且返回给浏览器。之前是 webpack 帮我们做了这件事。
通过 import 导入的文件 webpack 会去 package.json 文件内找 moduel 属性。
