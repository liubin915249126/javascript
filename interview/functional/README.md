#### 纯函数
>
  纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。 
  副作用是在计算结果的过程中，系统状态的一种变化，或者与外部世界进行的可观察的交互。
    更改文件系统
    往数据库插入记录
    发送一个 http 请求
    可变数据
    打印/log
    获取用户输入
    DOM 查询
    访问系统状态
>

#### 高阶函数 
#### 偏函数
```js
   // 第二版
    var _ = {};

    function partial(fn) {
        var args = [].slice.call(arguments, 1);
        return function() {
            var position = 0, len = args.length;
            for(var i = 0; i < len; i++) {
                args[i] = args[i] === _ ? arguments[position++] : args[i]
            }
            while(position < arguments.length) args.push(arguments[position++]);
            return fn.apply(this, args);
        };
    };
var subtract = function(a, b) { return b - a; };
subFrom20 = partial(subtract, _, 20);
subFrom20(5);
```
#### 函数组合
#### 函数记忆
```js
   // 第一版 (来自《JavaScript权威指南》)
    function memoize(f) {
        var cache = {};
        return function(){
            var key = arguments.length + Array.prototype.join.call(arguments, ",");
            if (key in cache) {
                return cache[key]
            }
            else {
                return cache[key] = f.apply(this, arguments)
            }
        }
```
```js
    // 第二版 (来自 underscore 的实现)
    var memoize = function(func, hasher) {
        var memoize = function(key) {
            var cache = memoize.cache;
            var address = '' + (hasher ? hasher.apply(this, arguments) : key);
            if (!cache[address]) {
                cache[address] = func.apply(this, arguments);
            }
            return cache[address];
        };
        memoize.cache = {};
        return memoize;
    };
```