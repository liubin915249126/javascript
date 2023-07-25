## generator

### co

```js
var gen = function* () {
  var f1 = yield readFile('/etc/fstab')
  var f2 = yield readFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}
var co = require('co')
co(gen)
co(gen).then(function () {
  console.log('Generator 函数执行完成')
})
```

### 基于 Promise 对象的自动执行

```js
// promisefy
var fs = require('fs')
var readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) reject(error)
      resolve(data)
    })
  })
}

var gen = function* () {
  var f1 = yield readFile('/etc/fstab')
  var f2 = yield readFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}
```

```js
function run(gen) {
  var g = gen()

  function next(data) {
    var result = g.next(data)
    if (result.done) return result.value
    result.value.then(function (data) {
      next(data)
    })
  }

  next()
}

run(gen)
```

### co 源码

```js
    function co(gen) {
    var ctx = this;
    function next(ret) {
        if (ret.done) return resolve(ret.value);
        var value = toPromise.call(ctx, ret.value);
        if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
        return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
                + 'but the following object was passed: "' + String(ret.value) + '"'));
            }
    });
    return new Promise(function(resolve, reject) {
        if (typeof gen === 'function') gen = gen.call(ctx);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);

        onFulfilled();
        function onFulfilled(res) {
        var ret;
        try {
            ret = gen.next(res);
        } catch (e) {
            return reject(e);
        }
        next(ret);
        }
    });
    }
```

### co 并发

```js
// 数组的写法
co(function* () {
  var res = yield [Promise.resolve(1), Promise.resolve(2)]
  console.log(res)
}).catch(onerror)

// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  }
  console.log(res)
}).catch(onerror)
```

#### toPromise

```js
function toPromise(obj) {
  if (!obj) return obj
  if (isPromise(obj)) return obj
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj)
  if ('function' == typeof obj) return thunkToPromise.call(this, obj)
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj)
  if (isObject(obj)) return objectToPromise.call(this, obj)
  return obj
}

function thunkToPromise(fn) {
  var ctx = this
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err)
      if (arguments.length > 2) res = slice.call(arguments, 1)
      resolve(res)
    })
  })
}

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this))
}

function objectToPromise(obj) {
  var results = new obj.constructor()
  var keys = Object.keys(obj)
  var promises = []
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var promise = toPromise.call(this, obj[key])
    if (promise && isPromise(promise)) defer(promise, key)
    else results[key] = obj[key]
  }
  return Promise.all(promises).then(function () {
    return results
  })
}

function isPromise(obj) {
  return 'function' == typeof obj.then
}

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw
}

function isGeneratorFunction(obj) {
  var constructor = obj.constructor
  if (!constructor) return false
  if (
    'GeneratorFunction' === constructor.name ||
    'GeneratorFunction' === constructor.displayName
  )
    return true
  return isGenerator(constructor.prototype)
}

function isObject(val) {
  return Object == val.constructor
}
```
