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
```js
// 输入不仅仅只有Array
function promiseAll (args) {
  return new Promise((resolve, reject) => {
    const promiseResults = [];
    let iteratorIndex = 0;
    // 已完成的数量，用于最终的返回，不能直接用完成数量作为iteratorIndex
    // 输出顺序和完成顺序是两码事
    let fullCount = 0;
    // 用于迭代iterator数据
    for (const item of args) {
      // for of 遍历顺序，用于返回正确顺序的结果
      // 因iterator用forEach遍历后的key和value一样，所以必须存一份for of的 iteratorIndex
      let resultIndex = iteratorIndex;
      iteratorIndex += 1;
      // 包一层，以兼容非promise的情况
      Promise.resolve(item).then(res => {
        promiseResults[resultIndex] = res;
        fullCount += 1;
        // Iterator 接口的数据无法单纯的用length和size判断长度，不能局限于Array和 Map类型中
        if (fullCount === iteratorIndex) {
          resolve(promiseResults)
        }
      }).catch(err => {
        reject(err)
      })
      }
    // 处理空 iterator 的情况
    if(iteratorIndex===0){
      resolve(promiseResults)
    }
  }
  )
}
if (!Promise.all) Promise.all = promiseAll;
```
```js
Promise.race = (promises) => {
  return new Promise((rs, rj) => {
    promises.forEach((p) => {
      // 对p进行一次包装，防止非Promise对象
      // 并且对齐进行监听，将我们自己返回的Promise的resolve，reject传递给p，哪个先改变状态，我们返回的Promise也将会是什么状态
      Promise.resolve(p).then(rs).catch(rj)
    })
  })
}

```