## memoize-one
函数记忆上一次计算结果

#### immerjs
[memoize-one](./memoize-one.ts)


#### 斐波那契
```js
const createFab = () => {
  const cache = [0, 1, 1];
  return n => {
    if (typeof cache[n] !== "undefined") {
      return cache[n];
    }
    for (let i = 3; i <= n; i++) {
      if (typeof cache[i] !== "undefined") continue;
      cache[i] = cache[i - 1] + cache[i - 2];
    }
    return cache[n];
  };
};
 
const fab = createFab();
```