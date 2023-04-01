## 浏览器安全

#### XSS

> Cross Site Scripting

- 窃取 Cookie。
- 监听用户行为，比如输入账号密码后直接发送到黑客服务器。
- 修改 DOM 伪造登录表单。
- 在页面中生成浮窗广告。
  >

> 实现方式:

- 存储型
  脚本存储到了服务端的数据库，然后在客户端执行这些脚本，从而达到攻击的效果.
  eg:
  - 存储了 <script>, 通过转译解决
  - 直接给 innerHTML 赋值一段 js，是无法被执行的
    但是，jQuery 的 append 可以做到，究其原因，就是因为 jquery 会在将 append 元素变为 fragment 的时候，找到其中的 script 标签，再使用 eval 执行一遍。jquery 的 append 使用的方式也是 innerHTML，而 innerHTML 是会将 unicode 码转换为字符实体的。
    利用这两种知识结合，我们可以得出，网站使用 append 进行 dom 操作，如果是 append 我们可以决定的字段，那么我们可以将左右尖括号，使用 unicode 码伪装起来，就像这样--"\u003cscript\u003ealert('okok');"。接下来转义的时候，伪装成\u003 的<会被漏掉，append 的时候，则会被重新调用
  - img 标签的再次利用
    img 标签，在加载图片失败的时候，会调用该元素上的 onerror 事件。我们正可以利用这种方式来进行攻击 <script>, 通过转译解决
  - innerHTML 赋值的 script 标签，不会被执行，但是 innerHTML 赋值一个 img 标签是可以被识别的。我们把 img 标签的左右尖括号，使用 unicode 进行伪装，让转义方法认不出来，即使 innerHTML 也可以利用上了
    我们将输出的字符串中的\反斜杠进行转义(json 转义)。这样，\就不会被当做 unicode 码的开头来被处理了
  - url 参数含有 script
- 反射型
  通过作为网络请求的参数，经过服务器，然后再反射到 HTML 文档中，执行解析
- 文档型
  文档型的 XSS 攻击并不会经过服务端，而是作为中间人的角色，在数据传输过程劫持到网络数据包，然后修改里面的 html 文档！
  这样的劫持方式包括 WIFI 路由器劫持或者本地恶意软件等
  >

> 防范方式：

- 千万不要相信任何用户的输入！
  无论是在前端和服务端，都要对用户的输入进行转码或者过滤。
  也可以利用关键词过滤的方式，将 script 标签给删除
- CSP，即浏览器中的内容安全策略
  - 限制其他域下的资源加载。
  - 禁止向其它域提交数据。
  - 提供上报机制，能帮助我们及时发现 XSS 攻击。
- 利用 HttpOnly  
   很多 XSS 攻击脚本都是用来窃取 Cookie, 而设置 Cookie 的 HttpOnly 属性后，JavaScript 便无法读取 Cookie 的值。这样也能很好的防范 XSS 攻击。
  >

#### CSRF (Cross-site request forgery), 即跨站请求伪造

> 攻击方式

- 自动发 GET 请求
  <img src="https://xxx.com/info?user=hhh&count=100">
  会自动带上关于 xxx.com 的 cookie 信息
- 自动发 POST 请求
  自动提交，携带 cookie
- 诱导点击发送 GET 请求
  <a href="https://xxx/info?user=hhh&count=100" taget="_blank">点击进入修仙世界</a>
  点击后，自动发送 get 请求，接下来和自动发 GET 请求部分同理。
  >

> 防范措施

- 利用 Cookie 的 SameSite 属性
  1. Strict
     在 Strict 模式下，浏览器完全禁止第三方请求携带 Cookie。
     比如请求 sanyuan.com 网站只能在 sanyuan.com 域名当中请求才能携带 Cookie，在其他网站请求都不能
  2. Lax
     在 Lax 模式，就宽松一点了，但是只能在 get 方法提交表单况或者 a 标签发送 get 请求的情况下可以携带 Cookie，其他情况均不能。
  3. None
     也就是默认模式，请求会自动携带上 Cookie
- 验证来源站点
  Origin 和 Referer。
  其中，Origin 只包含域名信息，而 Referer 包含了具体的 URL 路径。
  当然，这两者都是可以伪造的，通过 Ajax 中自定义请求头即可，安全性略差。
- CSRF Token
  首先，浏览器向服务器发送请求时，服务器生成一个字符串，将其植入到返回的页面中。
  然后浏览器如果要发送请求，就必须带上这个字符串，然后服务器来验证是否合法，
  如果不合法则不予响应。这个字符串也就是 CSRF Token，通常第三方站点无法拿到这个 token, 因此也就是被服务器给拒绝。

>

#### HTTPS 为什么让数据传输更安全

[参考文档](https://juejin.im/post/5df5bcea6fb9a016091def69#heading-84)

> 谈到 HTTPS, 就不得不谈到与之相对的 HTTP。HTTP 的特性是明文传输，因此在传输的每一个环节，
> 数据都有可能被第三方窃取或者篡改，具体来说，HTTP 数据经过 TCP 层，然后经过 WIFI 路由器、
> 运营商和目标服务器，这些环节中都可能被中间人拿到数据并进行篡改，也就是我们常说的中间人攻击。

> 其原理是在 HTTP 和 TCP 之间建立了一个中间层，当 HTTP 和 TCP 通信时并不是像以前那样直接通信，
> 直接经过了一个中间层进行加密，将加密后的数据包传给 TCP, 响应的，TCP 必须将数据包解密，
> 才能传给上面的 HTTP。这个中间层也叫安全层。安全层的核心就是对数据加解密

> 对称加密是最简单的方式，指的是加密和解密用的是同样的密钥。
> 而对于非对称加密，如果有 A、 B 两把密钥，如果用 A 加密过的数据包只能用 B 解密，
> 反之，如果用 B 加密过的数据包只能用 A 解密

- XSS 攻击: 注入恶意代码
  - cookie 设置 httpOnly
  - 转义页面上的输入内容和输出内容
- CSRF: 跨站请求伪造，防护:
  - get 不修改数据
  - 不被第三方网站访问到用户的 cookie
  - 设置白名单，不被第三方网站请求
  - 请求校验
