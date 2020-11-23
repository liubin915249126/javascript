#### promisify

```js
MyPromise.promisify = function(fn) {
    return function() {
        var args = Array.from(arguments);
        return new MyPromise(function(resolve, reject) {
            fn.apply(null, args.concat(function(err) {
                err ? reject(err) : resolve(arguments[1])
            }));
        })
    }
}

```