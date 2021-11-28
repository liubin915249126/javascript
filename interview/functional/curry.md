#### curry

```js
// ES5
var curry = function curry(fn, arr) {
  arr = arr || [];

  return function () {
    var args = [].slice.call(arguments);
    var arg = arr.concat(args);

    return arg.length >= fn.length ? fn.apply(null, arg) : curry(fn, arg);
  };
};

// ES6
const curry =
  (fn, arr = []) =>
  (...args) =>
    ((arg) => (arg.length >= fn.length ? fn(...arg) : curry(fn, arg)))([
      ...arr,
      ...args,
    ]);
```

#### example
```js
function add(a,b,c,d){
  return a + b + c + d;
};
var newAdd = curry(add);    //将add函数柯里化
//柯里化之后的newAdd函数执行方式，传入剩余的参数。
newAdd(1)(2)(3)(4);  
newAdd(1,2)(3,4);
newAdd(1,2,3)(4);
newAdd(1,2,3,4);
newAdd(1)(2,3,4);
newAdd(1)(2,3)(4);
```

#### compose

```js
// redux 版
const compose = (...fns) => {
  if (fns.length === 0) return (arg) => arg;
  if (fns.length === 1) return fns[0];

  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
};

// 一行版，支持多参数，但必须至少传一个函数
const compose = (...fns) =>
  fns.reduceRight(
    (acc, fn) =>
      (...args) =>
        fn(acc(...args))
  );

// 一行版，只支持单参数，但支持不传函数
const compose =
  (...fns) =>
  (arg) =>
    fns.reduceRight((acc, fn) => fn(acc), arg);
```
