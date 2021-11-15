## 参数按值传递
ECMAScript中所有函数的参数都是按值传递的。
### 按值传递
```js
    var value = 1;
    function foo(v) {
        v = 2;
        console.log(v); //2
    }
    foo(value);
    console.log(value) // 1
```

#### 引用传递?
```js
    var obj = {
      value: 1
    };
    function foo(o) {
        o.value = 2;
        console.log(o.value); //2
    }
    foo(obj);
    console.log(obj.value) // 2
```
#### 共享传递
```js
    var obj = {
      value: 1
    };
    function foo(o) {
        o = 2;
        console.log(o); //2
    }
    foo(obj);
    console.log(obj.value) // 1
    // 而共享传递是指，在传递对象的时候，传递对象的引用的副本。
    // 注意： 按引用传递是传递对象的引用，而按共享传递是传递对象的引用的副本！
    // 所以修改 o.value(对象内部的值)，可以通过引用找到原值，但是直接修改 o，并不会修改原值。
    // 所以第二个和第三个例子其实都是按共享传递
```
参数如果是基本类型是按值传递，如果是引用类型按共享传递。
但是因为拷贝副本也是一种值的拷贝，所以在高程中也直接认为是按值传递了。

[referer](https://www.cnblogs.com/fundebug/p/10727895.html)
