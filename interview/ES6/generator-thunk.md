## generator


### thunk
传值调用
传名调用
编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。

### js thunk
在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数
```js
    // 正常版本的readFile（多参数版本）
    fs.readFile(fileName, callback);

    // Thunk版本的readFile（单参数版本）
    var readFileThunk = Thunk(fileName);
    readFileThunk(callback);

    var Thunk = function (fileName){
    return function (callback){
        return fs.readFile(fileName, callback); 
      };
    };
```
thunk 转换器
```js
    var Thunk = function(fn){
        return function (){
            var args = Array.prototype.slice.call(arguments);
            return function (callback){
              args.push(callback);
              return fn.apply(this, args);
            }
        };
    };
```

#### thunkify
https://github.com/tj/node-thunkify
```js
    function thunkify(fn){
    return function(){
        var args = new Array(arguments.length);
        var ctx = this;

        for(var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
        }

        return function(done){
            var called;

            args.push(function(){
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });

            try {
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
    };

```

### generator 
```js
   function run(fn) {
        var gen = fn();

        function next(err, data) {
            var result = gen.next(data);
            if (result.done) return;
            result.value(next);
        }

        next();
    }
    var gen = function* (){
        var f1 = yield readFile('fileA');
        var f2 = yield readFile('fileB');
        // ...
        var fn = yield readFile('fileN');
    };

    run(gen);
```