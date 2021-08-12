#### http cache

首先都知道 HTTP 缓存都是从第二次请求开始的。

第一次发起请求后，服务器返回资源，并在 response header 中返回带 Cache-Control(http1.1)和 Expires(http1.0)的字段，状态码为 200。
第二次发起请求后，强缓存命中则直接读取浏览器缓存，在 network 中显示的是 from memory 或者 from disk,状态码为 200。当浏览器的强缓存失效的时候或者请求头中设置了不走强缓存，并且在请求头中设置了 If-Modified-Since(http1.0)或者 If-None-Match(http1.1)的时候，会将这两个属性值到服务端去验证是否命中协商缓存，如果命中了协商缓存，会返回 304 状态码，加载浏览器缓存，并且响应头会设置 Last-Modified 或者 ETag 属性。
若强缓存和协商缓存都未命中，则服务器返回新的资源。

#### 怎么设置不走强缓存？

请求头设置 Cache-Control: no-cache
不会走强缓存了，每次请求都回询问服务端，但不妨碍协商缓存。
请求头设置 Cache-Control: no-store
会让浏览器、服务器都不缓存，也就没有所谓的强缓存、协商缓存了。

#### from memory 和 from disk 区别知道吗？

from memory：一般是 字体、图片文件。（js 脚本不一定）
from disk：一般是 css 文件。

#### Cache-Control 的 public、 private 区别知道吗？

public：所有的内容都可以被缓存 ，包括浏览器和代理服务器， 如 CDN。
private：所有的内容只有浏览器可以缓存，代理服务器不能缓存，是默认值。

#### 请求报文和响应报文大致上都是起始行+头部+空行+实体。

起始行
请求报文起始行请求方法 路径 HTTP 版本。
响应报文起始行 HTTP 版本 状态码 状态。

头部
就是常见的那些请求头响应头字段。

空行
区分头部和实体。

实体
请求携带的数据或者响应返回的数据。


#### 常见的请求头字段：

Host: 服务端的域名
Accept、Accept-Encoding、Accept-Language：与服务端的协商字段
Content-Type：浏览器请求体内容的类型
Content-Length：实体数据的字节长度。
Referer：请求的页面来源。
User-Agent：用户代理，一些厂商、设备、版本等信息。
Cookie：用户的Cookie信息。
还有上面提到的缓存相关字段

#### 常见的响应头字段：

Access-Control-Allow-Origin：指定哪些网站可以跨域源资源共享。
Access-Control-Allow-Methods：允许的http请求方法
Content-Type：服务端响应体内容的类型。
Content-Length：实体数据的字节长度，如果设置短了数据会丢失，设置长了会导致请求失败。
Set-Cookie：与请求头中的 Cookie 对应
还有上面提到的缓存相关字段

#### 请求头里的Referer是干什么用的？

设置一些防盗链，比如直接在浏览器的地址栏中输入一个资源的URL地址，那么这种请求是不会包含Referer的。

#### Content-Length是什么的长度？

实体的传输字节长度。（实体长度和实体的传输长度是有区别，比如说gzip压缩下，消息实体长度是压缩前的长度，消息实体的传输长度是gzip压缩后的长度）

#### 知道Transfer-Encoding: chunked这个字段吗？

在数据内容不能确定，分块传输场景下使用。（无法在请求或者响应前明确指定Content-Length，所以Content-Length字段会被忽略不被发送）

#### Cookie中有哪些属性？

Name：Cookie的名称。
Value： Cookie的值。
Domain： 指定Cookie的域名。
Path：指定Cookie所属的路径。（只有匹配上Domain和Path才会附加Cookie）
Expires/Max-Age: 过期时间
Size：Cookie的大小
HttpOnly：禁止通过document.cookie等方式拿到Cookie。（缓解XSS攻击）
Secure： Cookie只能用https协议发送给服务器。
SameSite：可以有效缓解CSRF攻击。
SameSite=None: 浏览器会在同站请求、跨站请求下继续发送Cookie。
SameSite=Strict: 限制Cookie不能跨站发送，只在访问相同站点时发送Cookie。
SameSite=Lax: 跨站请求时，如果是安全的HTTP方法情况会携带Cookie。



[referer](https://juejin.cn/post/6996175213570293791)
[same-origin/same-site](https://juejin.cn/post/6877496781505200142)
