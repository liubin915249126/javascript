## 串行执行 Promise

```js
function delay(time) {
  return new Promise((resolve, reject) => {
    console.log(`wait ${time}s`)
    setTimeout(() => {
      console.log('execute')
      resolve()
    }, time * 1000)
  })
}

const arr = [3, 4, 5]
```

#### reduce

```js
arr.reduce((s, v) => {
  return s.then(() => delay(v))
}, Promise.resolve())
```

#### async + 循环 + await

```js
;(async function () {
  for (const v of arr) {
    await delay(v)
  }
})()
```

#### generator

```js
function* gen() {
  for (const v of arr) {
    yield delay(v)
  }
}

function run(gen) {
  const g = gen()

  function next(data) {
    const result = g.next(data)
    if (result.done) return result.value
    result.value.then(function (data) {
      next(data)
    })
  }

  next()
}

run(gen)
```

#### 普通循环

其实仔细想想方式 1 的本质是使用一个中间变量（上一次执行结果）来保存链式 Promise, 那我们举一反三， 换别的循环也可以实现

```js
let p = Promise.resolve()
for (const i of arr) {
  p = p.then(() => delay(i))
}
```

#### 递归

这是面试官提供的思路，也提到了 koa，其实 koa 自己也有研究，其中洋葱模型来自于 koa-compose 库。

```js
function dispatch(i, p = Promise.resolve()) {
  if (!arr[i]) return Promise.resolve()
  return p.then(() => dispatch(i + 1, delay(arr[i])))
}
dispatch(0)
```

#### for await of

通过查阅了 for await of 的规则，其实 for await of 和 for of 规则类似，只需要实现一个内部[Symbol.asyncIterator]方法即可

```js
function createAsyncIterable(arr) {
  return {
    [Symbol.asyncIterator]() {
      return {
        i: 0,
        next() {
          if (this.i < arr.length) {
            return delay(arr[this.i]).then(() => ({
              value: this.i++,
              done: false,
            }))
          }

          return Promise.resolve({ done: true })
        },
      }
    },
  }
}

;(async function () {
  for await (i of createAsyncIterable(arr)) {
  }
})()
```

[referer](https://juejin.cn/post/6844903801296519182)
