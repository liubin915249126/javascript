cookie 有哪些可以设置的字段？
相关文章：blog.csdn.net/qq_39834073…
name 和 value：name 和 value 是一个键值对。name 是 cookie 的名称，cookie 一旦创建，名称便不可修改，一般名称不区分大小写；value 是该名称对应的 cookie 的值，如果值为 unicode 字符，需要为字符编码。如果值为二进制数据，则需要使用 base64 编码。
Domain：Domain 决定 cookie 在哪个域是有效的，也就是决定在向该域发送请求时是否携带此 cookie。Domain 的设置是对子域生效的，例如 Domain 设置为.a.com，则 b.a.com 和 c.a.com 均可以使用该 cookie，但如果设置为 b.a.com 则 c.a.com 不可使用该 cookie。Domain 参数必须以点（“.”）开始。
Path：Path 是 Cookie 的有效路径，和 Domain 类似，也对子路径生效，如 Cookie1 和 Cookie2 的 Domain 均为 a.com，但 Path 不同，Cookie1 的 Path 为 /b/,而 Cookie 的 Path 为 /b/c/,则在 a.com/b 页面时只可以访问 Cookie1，在 a.com/b/c 页面时，可访问 Cookie1 和 Cookie2。Path 属性需要使用符号“/”结尾。
Expires/Max-age： Expires 和 Max-age 均为 Cookie 的有效期，Expires 是该 Cookie 被删除时的时间戳，格式为 GMT,若设置为以前的时间，则该 Cookie 立刻被删除，并且该时间戳是服务器时间，不是本地时间！若不设置则默认页面关闭时删除该 Cookie。Max-age 也是 Cookie 的有效期，但它的单位为秒，即多少秒之后失效，若 Max-age 设置为 0，则立刻失效，设置为负数，则在页面关闭时失效。Max-age 默认为 -1。
Size：Szie 是此 Cookie 的大小。在所有浏览器中，任何 cookie 大小超过限制都被忽略，且永远不会被设置。各个浏览器对 Cookie 的最大值和最大数目有不同的限制，整理为下表(数据来源网络，未测试)：

浏览器 Cookie 最大条数 Cookie 最大长度/单位：字节 IE504095Chrome1504096FireFox504097Opera304096Safari 无限  4097
HttpOnly： HttpOnly 值为 true 或 false，若设置为 true，则不允许通过脚本 document.cookie 去更改这个值，同样这个值在 document.cookie 中也不可见，但在发送请求时依旧会携带此 Cookie。
Secure： Secure 为 Cookie 的安全属性，若设置为 true，则浏览器只会在 HTTPS 和 SSL 等安全协议中传输此 Cookie，不会在不安全的 HTTP 协议中传输此 Cookie。
SameSite： SameSite 用来限制第三方 Cookie，从而减少安全风险。它有 3 个属性，分别是：Scrict 最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie；Lax 规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外；
None，网站可以选择显式关闭 SameSite 属性，将其设为 None。不过，前提是必须同时设置 Secure 属性（Cookie 只能通过 HTTPS 协议发送），否则无效。关闭 SameSite 的方法：操作方法谷歌浏览器地址栏输入：chrome://flags/找到：SameSite by default cookies、Cookies without SameSite must be secure 设置上面这两项设置成 Disable。
Priority：优先级，chrome 的提案，定义了三种优先级，Low/Medium/High，当 cookie 数量超出时，低优先级的 cookie 会被优先清除。在 360 极速浏览器和 FireFox 中，不存在 Priority 属性，不清楚在此类浏览器中设置该属性后是否生效。

