## 性能优化

#### DNS 预解析

```xml
<link rel="dns-prefetch" href="g.alicdn.com">
```

#### DNS 负载均衡

#### 检查浏览器缓存

第三方库公共模块抽取
开启 HTTP2

#### 防止脚本阻塞

- CSS 执行不会阻塞 DOM 的解析 但是会阻塞 DOM 渲染，阻止 JS 执行
  浏览器并不知道 js 中的代码会干些什么，js 可以去改动 DOM，也可以获取/改变 css 样式。js 要获取正确的样式就必须等 css 加载完
- JS 加载和执行会阻塞 HTML 解析，阻止 CSSOM 构建

#### preload

```html
<link rel="preload" href="style.css" as="style" />
<link rel="preload" href="main.js" as="script" />
```

#### prefetch

```html
// 1、link
<link rel="prefetch" href="/myscript.js" as="script" />

// 2、JS
<script>
  var res = document.createElement('link')
  res.rel = 'prefetch'
  res.as = 'style'
  res.href = 'styles/other.css'
  document.head.appendChild(res)
</script>

// 3、http header头模式 Link: <https://example.com/other/styles.css>;
rel=prefetch; as=style
```
