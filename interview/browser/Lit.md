## Lit
Lit 是一个基于 Web-Component 构建的前端框架，前身基本可以理解为即 Polymer ， Lit 提供了如下具有竞争力的特性
基于 Web-Component 的更高层封装，提供了现代前端开发习惯的响应式数据，声明式的模版，减少了web component的一部分样板代码.
小。运行时仅有5K
性能强悍。规避了 VDOM 的一些弊端，更新时仅处理 UI 中的异步部分（可以理解成仅处理响应式的部分）
兼容性较好。因为 web-component 是 HTML 的原生能力，也就代表着 web-component 可以在任何使用 HTML 的地方使用，框架无关。

#### web component
- 如何响应reactive properties的变化，并应用到UI上
- 如何解决模版语法
Lit 用了两个个核心库来解决这个问题，分别是 lit-element 和 lit-html

#### Lit-html
jsx->tagged template