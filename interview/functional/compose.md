## compose

```js
function compose(...fns) {
  return function composed(result) {
    // 拷贝一份保存函数的数组
    var list = fns.slice();

    while (list.length > 0) {
      // 将最后一个函数从列表尾部拿出
      // 并执行它
      result = list.pop()(result);
    }

    return result;
  };
}
// reduce优化代码
function compose1() {
  var args = Array.prototype.slice.call(arguments);
  var len = args.length - 1;
  return function (x) {
    return args.reduceRight(function (res, cb) {
      return cb(res);
    }, x);
  };
}

// ES6 箭头函数形式写法
var compose =
  (...fns) =>
  (result) => {
    var list = fns.slice();

    while (list.length > 0) {
      // 将最后一个函数从列表尾部拿出
      // 并执行它
      result = list.pop()(result);
    }

    return result;
  };
// reduce优化代码  
const compose =
  (...args) =>
  (x) =>
    args.reduceRight((res, cb) => cb(res), x);
```

#### example

```js
// 实现字符串翻转后用-分割
var newCompose = compose(toUpperCase,split,reverse);
var ans = newCompose('time');
```

```js
function uniqueWords(str) {
  return unique(words(str));
}
uniqueWords(text);
```
