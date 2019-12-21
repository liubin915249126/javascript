## Promise

```js
if (!Promise.every) {
  // get the boolean if all promises resolved
  Promise.every = promiseList => {
    return Promise.all(promiseList)
      .then(() => Promise.resolve(true))
      .catch(() => Promise.resolve(false));
  };
}
```

```js
if (!Promise.first) {
  // get first resolve result
  Promise.first = promiseList => {
    return new Promise((resolve, reject) => {
      var num = 0;
      var len = promiseList.length;
      promiseList.forEach(pms => {
        Promise.resolve(pms)
          .then(resolve)
          .catch(() => {
            num++;
            if (num === len) {
              reject("all promises not resolve");
            }
          });
      });
    });
  };
}
```

```js
if (!Promise.any) {
  // get only resolve the results
  Promise.any = promiseList => {
    let result = [];
    return Promise.all(
      promiseList.map(pms => {
        return Promise.resolve(pms)
          .then(res => result.push(res))
          .catch(e => {});
      })
    ).then(res => {
      return new Promise((resolve, reject) => {
        result.length ? resolve(result) : reject();
      });
    });
  };
}
```

```js
if (!Promise.none) {
  // if all the promises rejected, then succes
  Promise.none = promiseList => {
    return Promise.all(
      promiseList.map(pms => {
        return new Promise((resolve, reject) => {
          // 将pms的resolve和reject反过来
          return Promise.resolve(pms).then(reject, resolve);
        });
      })
    );
  };
}
```

```js
if (!Promise.last) {
  // get last resolve result
  Promise.last = promiseList => {
    return new Promise((resolve, reject) => {
      let num = 0;
      let len = promiseList.length;
      let lastResolvedResult;

      const fn = () => {
        if (++num === len) {
          lastResolvedResult
            ? resolve(lastResolvedResult)
            : reject("all promises rejected");
        }
      };
      promiseList.forEach(pms => {
        Promise.resolve(pms)
          .then(res => {
            lastResolvedResult = res;
            fn();
          })
          .catch(fn);
      });
    });
  };
}
```
```js
   Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
      value  => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    );
  };
```

#### promisify
```js
   function promisify(original) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function callback(err, ...values) {
                if (err) {
                    return reject(err);
                }
                return resolve(...values)
            });
            original.call(this, ...args);
        });
    };
}
```