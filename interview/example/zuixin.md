#### 11 http2.0 做了哪些改进 3.0 呢
http2.0 特性如下

二进制分帧传输
多路复用
头部压缩
服务器推送

Http3.0 相对于 Http2.0 是一种脱胎换骨的改变！
UDP

连接迁移
无队头阻塞
自定义的拥塞控制
前向安全和前向纠错

#### 闭包的应用
```js
// 防抖
function debounce(fn, delay = 300) {
  let timer; //闭包引用的外界变量
  return function () {
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
// 模拟块级作用域
function outputNumbers(count) {
  (function () {
    for (var i = 0; i < count; i++) {
      alert(i);
    }
  })();
  alert(i); //导致一个错误！
}
// 在对象中创建私有变量
var aaa = (function () {
  var a = 1;
  function bbb() {
    a++;
    console.log(a);
  }
  function ccc() {
    a++;
    console.log(a);
  }
  return {
    b: bbb, //json结构
    c: ccc,
  };
})();
console.log(aaa.a); //undefined
aaa.b(); //2
aaa.c(); //3
// 模块化

```

#### 字符串最长不重复子串
[lengthOfLongestSubstring]