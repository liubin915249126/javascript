## 实现 fetch 请求返回的统一拦截

#### 拦截器的目的

拦截器（interceptors）一般用于发起 http 请求之前或之后对请求进行统一的处理，
如 token 实现的登录鉴权（每个请求带上 token），统一处理 404 响应等等。

#### 之前的实现

区别于 axios，fetch 没有搜到请求返回拦截器相关 api,那之前是怎么实现统一拦截的呢，
参照 antd-pro，写一个统一的请求方法，所有的请求都调用这个方法，从而实现请求与返回的拦截。
这样我们每次都要去引入这个方法使用，那么有没有更好实现呢？

#### 常见的一道面试题

vue 双向绑定的原理

- vue2 基于 defineProperty
- vue3 基于 Proxy

极简的双向绑定

```js
   const obj = {};
Object.defineProperty(obj, 'text', {
  get: function() {
    console.log('get val');&emsp;
  },
  set: function(newVal) {
    console.log('set val:' + newVal);
    document.getElementById('input').value = newVal;
    document.getElementById('span').innerHTML = newVal;
  }
});

const input = document.getElementById('input');
input.addEventListener('keyup', function(e){
  obj.text = e.target.value;
})

```

其中我们可以看到运用了看数据劫持。

#### defineProperty

查看 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Syntax)
我们可以发现 defineProperty 的使用方法

```js
Object.defineProperty(obj, prop, descriptor);
```

> descriptor 属性与方法包含

- value
  属性的值(不用多说了)
- configurable: true,
  总开关，一旦为 false，就不能再设置他的（value，writable，configurable）
- enumerable: true,
  是否能在 for...in 循环中遍历出来或在 Object.keys 中列举出来。
- writable: true,
  如果为 false，属性的值就不能被重写,只能为只读了
- set()
  设置属性时候会调用
- get()
  访问属性时候会调用
> 
  回想下我们使用 fetch 的时候都是直接使用，所以 fetch 是 window 或者 global 对象下的一个属性啊，
  每次我们使用 fetch 的时候相当于访问了 window 或者 global 的属性，也就是上面的 get 方法
> 

#### 拦截器的实现

```js
const originFetch = fetch;
Object.defineProperty(window, "fetch", {
  configurable: true,
  enumerable: true,
  // writable: true,
  get() {
    return (url,options) => {
      return originFetch(url,{...options,...{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Accept: 'application/json',
          token:localStorage.getItem('token') 
          //这里统一加token 实现请求拦截
        },...options.headers
      }}).then(checkStatus) 
      // checkStatus 这里可以做返回错误处理，实现返回拦截
    .then(response =>response.json())
  }
});

```
#### 扩展
此文是基于 defineProperty , Proxy 同样可以实现。
另外在小程序里面 request 方法是挂在 wx 下面，同样是可以实现，
具体实现 [wx.request](https://github.com/liubin915249126/javascript/blob/master/interview/defineProperty.md)

- 原文地址 [dynamic-import-image](https://github.com/liubin915249126/javascript/blob/master/webpack/dynamic-import-image.md)

- 另外我的博客地址 [blog](https://github.com/liubin915249126/javascript)会经常分享 最近的学习内容，项目中遇到的问题及解决方案