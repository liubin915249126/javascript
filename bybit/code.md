```js
var u = navigator.userAgent, app = navigator.appVersion;
  var type =  {// 移动终端浏览器版本信息
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    iPad: u.indexOf('iPad') > -1, //是否iPad
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
  };
```

简单请求

请求方法为GET、HEAD、POST时发的请求
人为设置了规范集合之内的首部字段，如Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width
Content-Type 的值仅限于下列三者之一,即application/x-www-form-urlencoded、multipart/form-data、text/plain
请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；
请求中没有使用 ReadableStream 对象。

复杂请求

使用了下面任一 HTTP 方法，PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH
人为设置了以下集合之外首部字段，即简单请求外的字段
Content-Type 的值不属于下列之一，即application/x-www-form-urlencoded、multipart/form-data、text/plain
[options](https://juejin.im/post/5edef7b2e51d45784213ca24)