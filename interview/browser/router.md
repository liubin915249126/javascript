## 前端路由

#### hash

hashchange

#### history

pushState/replaceState
popstate

```js
// history.pushState和history.replaceState方法是不会触发popstate事件的
// 但是浏览器的某些行为会导致popstate，比如go、back、forward
// popstate事件对象中的state属性，可以理解是我们在通过history.pushState或history.replaceState方法时，传入的指定的数据

let _wr = function (type) {
  let orig = history[type]
  return function () {
    let rv = orig.apply(this, arguments)
    let e = new Event(type)
    e.arguments = arguments
    window.dispatchEvent(e)
    return rv
  }
}

history.pushState = _wr('pushState')
history.replaceState = _wr('replaceState')
```

####

hash 模式是不需要后端服务配合的。但是 history 模式下，如果你再跳转路由后再次刷新会得到 404 的错误，这个错误说白了就是浏览器会把整个地址当成一个可访问的静态资源路径进行访问，然后服务端并没有这个文件

```js
http://192.168.30.161:5500/ === http://192.168.30.161:5500/index.html // 默认访问路径下的index.html文件，没毛病
http://192.168.30.161:5500/home === http://192.168.30.161:5500/index.html // 仍然访问路径下的index.html文件，没毛病
...
http://192.168.30.161:5500/mine === http://192.168.30.161:5500/index.html // 所有的路由都是访问路径下的index.html，没毛病
http://192.168.30.161:5500/mine === http://192.168.30.161:5500/mine/index.html文件，出问题了，服务器上并没有这个资源，404

```

```js
location / {
  try_files $uri $uri/ /index.html;
}

```
