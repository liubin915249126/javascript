## Workbox

#### 加载
```js
importScripts(
    "https://edu-cms.nosdn.127.net/topics/js/workbox_9cc4c3d662a4266fe6691d0d5d83f4dc.js"
);
// 引入workbox后，全局会挂载一个workbox对象
if (workbox) {
    console.log('workbox加载成功');
} else {
    console.log('workbox加载失败');
}
//设置缓存cachestorage的名称
workbox.core.setCacheNameDetails({
    prefix:'edu-cms',
    suffix:'v1'
});
```
#### 缓存时机
- precache
precache对应的是在installing阶段进行读取缓存的操作。它让开发人员可以确定缓存文件的时间和长度，以及在不进入网络的情况下将其提供给浏览器，这意味着它可以用于创建Web离线工作的应用。
适合于上线后就不会经常变动的静态资源

- runtimecache
运行时缓存是在install之后，activated和fetch阶段做的事情。
既然在fetch阶段发送，那么runtimecache 往往应对着各种类型的资源，对于不同类型的资源往往也有不同的缓存策略。

##### precache
首次加载Web应用程序时，workbox会下载指定的资源，并存储具体内容和相关修订的信息在indexedDB中。
当资源内容和sw.js更新后，workbox会去比对资源，然后将新的资源存入cache，并修改indexedDB中的版本信息。
```js
workbox.precaching.precacheAndRoute([
    './main.css'
]);
```
这个时候我们把main.css的内容改变后，再刷新页面，会发现除非强制刷新，否则workbox还是会读取cache中存在的老的main.css内容。
即使我们把main.css从服务器上删除，也不会对页面造成影响。
所以这种方式的缓存都需要配置一个版本号。在修改sw.js时，对应的版本也需要变更。

##### runtimecache
- staleWhileRevalidate
>
    当请求的路由有对应的 Cache 缓存结果就直接返回，在返回 Cache 缓存结果的同时会在后台发起网络请求拿到请求结果并更新 Cache 缓存，如果本来就没有 Cache 缓存的话，直接就发起网络请求并返回结果，这对用户来说是一种非常安全的策略，能保证用户最快速的拿到请求的结果。
    但是也有一定的缺点，就是还是会有网络请求占用了用户的网络带宽.
>

- networkFirst
这种策略就是当请求路由是被匹配的，就采用网络优先的策略，也就是优先尝试拿到网络请求的返回结果，如果拿到网络请求的结果，就将结果返回给客户端并且写入 Cache 缓存。
如果网络请求失败，那最后被缓存的 Cache 缓存结果就会被返回到客户端，这种策略一般适用于返回结果不太固定或对实时性有要求的请求，为网络请求失败进行兜底。
- cacheFirst
当匹配到请求之后直接从 Cache 缓存中取得结果，如果 Cache 缓存中没有结果，那就会发起网络请求，拿到网络请求结果并将结果更新至 Cache 缓存，并将结果返回给客户端。这种策略比较适合结果不怎么变动且对实时性要求不高的请求。

- networkOnly
比较直接的策略，直接强制使用正常的网络请求，并将结果返回给客户端，这种策略比较适合对实时性要求非常高的请求。

- cacheOnly
这个策略也比较直接，直接使用 Cache 缓存的结果，并将结果返回给客户端，这种策略比较适合一上线就不会变的静态资源请求。

[实际应用](./code/Workbox-taobao.js)