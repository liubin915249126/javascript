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