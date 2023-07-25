## 跨域

所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源。

- Cookie、LocalStorage 和 IndexDB 无法读取
- DOM 和 JS 对象无法获得
- AJAX 请求不能发送

#### JSONP 跨域

```js
 // <script>标签没有跨域限制
 <script>
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
    document.head.appendChild(script);

    // 回调执行函数
    function handleCallback(res) {
        alert(JSON.stringify(res));
    }
 </script>

```

```js
var querystring = require('querystring')
var http = require('http')
var server = http.createServer()

server.on('request', function (req, res) {
  var params = querystring.parse(req.url.split('?')[1])
  var fn = params.callback

  // jsonp返回设置
  res.writeHead(200, { 'Content-Type': 'text/javascript' })
  res.write(fn + '(' + JSON.stringify(params) + ')')

  res.end()
})

server.listen('8080')
console.log('Server is running at port 8080...')
```

#### 跨域资源共享（CORS）

简单请求

- method
  head
  get
  post

- Heder
  Accept
  Accept-Language
  Content-Language
  Content-Type: 只限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain

#### 对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个 Origin 字段。

CORS 请求设置的响应头字段，都以 Access-Control-开头:
1）Access-Control-Allow-Origin：必选
   它的值要么是请求时 Origin 字段的值，要么是一个\*，表示接受任意域名的请求。
2）Access-Control-Allow-Credentials：可选
   它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求之中。设为 true，即表示服务器明确许可，Cookie 可以包含在请求中，一起发给服务器。这个值也只能设为 true，如果服务器不要浏览器发送 Cookie，删除该字段即可。
3）Access-Control-Expose-Headers：可选
  CORS 请求时，XMLHttpRequest 对象的 getResponseHeader()方法只能拿到 6 个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在 Access-Control-Expose-Headers 里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回 FooBar 字段的值。

#### 非简单请求

preflight
预检"请求用的请求方法是 OPTIONS ,表示这个请求是用来询问的。请求头信息里面，关键字段是 Origin，表示请求来自哪个源。除了 Origin 字段，"预检"请求的头信息包括两个特殊字段。
1）Access-Control-Request-Method：必选
   用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法，上例是 PUT。
2）Access-Control-Request-Headers：可选
   该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段，上例是 X-Custom-Header。

```js
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0..
```

#### nginx 代理跨域

#### nodejs 中间件代理跨域

#### webpack webpack-dev-server

#### postMessage 跨域

data： html5 规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用 JSON.stringify()序列化。
origin： 协议+主机+端口号，也可以设置为"\*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

#### WebSocket 协议跨域

作者：小铭子
链接：https://juejin.cn/post/6844903882083024910
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
