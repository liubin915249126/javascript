## ServiceWorker 与浏览器缓存

#### 特点

基于 web worker（一个独立于 JavaScript 主线程的独立线程，在里面执行需要消耗大量资源的操作不会堵塞主线程）
在 web worker 的基础上增加了离线缓存的能力
本质上充当 Web 应用程序（服务器）与浏览器之间的代理服务器（可以拦截全站的请求，并作出相应的动作->由开发者指定的动作）
创建有效的离线体验（将一些不常更新的内容缓存在浏览器，提高访问体验）
由事件驱动的,具有生命周期
可以访问 cache 和 indexDB
支持推送 ws
并且可以让开发者自己控制管理缓存的内容以及版本

#### 生命周期

- 注册 register

```js
;(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
  }
})()
// 作用域
navigator.serviceWorker.register('/topics/sw.js')
// 只会对topics/下面的路径进行优化
```

- 安装 install

```js
//service worker安装成功后开始缓存所需的资源
var CACHE_PREFIX = 'cms-sw-cache'
var CACHE_VERSION = '0.0.20'
var CACHE_NAME = CACHE_PREFIX + '-' + CACHE_VERSION
var allAssets = ['./main.css']
self.addEventListener('install', function (event) {
  //调试时跳过等待过程
  self.skipWaiting()
  // Perform install steps
  //首先 event.waitUntil 你可以理解为 new Promise，
  //它接受的实际参数只能是一个 promise，因为,caches 和 cache.addAll 返回的都是 Promise，
  //这里就是一个串行的异步加载，当所有加载都成功时，那么 SW 就可以下一步。
  //另外，event.waitUntil 还有另外一个重要好处，它可以用来延长一个事件作用的时间，
  //这里特别针对于我们 SW 来说，比如我们使用 caches.open 是用来打开指定的缓存，但开启的时候，
  //并不是一下就能调用成功，也有可能有一定延迟，由于系统会随时睡眠 SW，所以，为了防止执行中断，
  //就需要使用 event.waitUntil 进行捕获。另外，event.waitUntil 会监听所有的异步 promise
  //如果其中一个 promise 是 reject 状态，那么该次 event 是失败的。这就导致，我们的 SW 开启失败。
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('[SW]: Opened cache')
      return cache.addAll(allAssets)
    })
  )
})
```

- 激活 activated
  如果是第一次加载 sw，在安装后，会直接进入 activated 阶段，而如果 sw 进行更新，情况就会显得复杂一些。流程如下：
  首先老的 sw 为 A，新的 sw 版本为 B。B 进入 install 阶段，而 A 还处于工作状态，所以 B 进入 waiting 阶段。只有等到 A 被 terminated 后，B 才能正常替换 A 的工作。

这个 terminated 的时机有如下几种方式：

> 1、关闭浏览器一段时间；
> 2、手动清除 serviceworker；
> 3、在 sw 安装时直接跳过 waiting 阶段

```js
var CACHE_PREFIX = 'cms-sw-cache'
var CACHE_VERSION = '0.0.20'
/**
 * 找出对应的其他key并进行删除操作
 * @returns {*}
 */
function deleteOldCaches() {
  return caches.keys().then(function (keys) {
    var all = keys.map(function (key) {
      if (
        key.indexOf(CACHE_PREFIX) !== -1 &&
        key.indexOf(CACHE_VERSION) === -1
      ) {
        console.log('[SW]: Delete cache:' + key)
        return caches.delete(key)
      }
    })
    return Promise.all(all)
  })
}
//sw激活阶段,说明上一sw已失效
self.addEventListener('activate', function (event) {
  event.waitUntil(
    // 遍历 caches 里所有缓存的 keys 值
    caches.keys().then(deleteOldCaches)
  )
})
```

- fetch 拦截请求

```js
//监听浏览器的所有fetch请求，对已经缓存的资源使用本地缓存回复
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      //该fetch请求已经缓存
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
```

[实例应用](./code/ServiceWorker-nerEasy.js)

#### tips

```js
// 缓存图片
self.addEventListener('fetch', function (evt) {
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      if (response) {
        return response
      }
      var request = evt.request.clone()
      return fetch(request).then(function (response) {
        if (
          !response &&
          response.status !== 200 &&
          !response.headers.get('Content-type').match(/image/)
        ) {
          return response
        }
        var responseClone = response.clone()
        caches.open('my-test-cache-v1').then(function (cache) {
          cache.put(evt.request, responseClone)
        })
        return response
      })
    })
  )
})
```

通过监听 fetch 事件，service worker 可以返回自己的响应。
首先检缓存中是否已经缓存了这个请求，如果有，就直接返回响应，就减少了一次网络请求。否则由 service workder 发起请求，这时的 service workder 起到了一个中间代理的作用。

service worker 请求的过程通过 fetch api 完成，得到 response 对象以后进行过滤，查看是否是图片文件，如果不是，就直接返回请求，不会缓存。
如果是图片，要先复制一份 response，原因是 request 或者 response 对象属于 stream，只能使用一次，之后一份存入缓存，另一份发送给页面。 这就是 service worker 的强大之处：拦截请求，伪造响应。fetch api 在这里也起到了很大的作用。

service worker 的更新很简单，只要 service-worker.js 的文件内容有更新，就会使用新的脚本。但是有一点要注意：旧缓存文件的清除、新文件的缓存要在 activate 事件中进行，因为可能旧的页面还在使用之前的缓存文件，清除之后会失去作用。
