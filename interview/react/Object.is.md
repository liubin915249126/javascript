#### Object.is

=== NaN 的 NaN 不等， +0 和 -0 的相等

修复了 NaN 的 NaN 的 不等

```js
// 案例 1：评估结果和使用 === 相同
Object.is(25, 25) // true
Object.is('foo', 'foo') // true
Object.is('foo', 'bar') // false
Object.is(null, null) // true
Object.is(undefined, undefined) // true
Object.is(window, window) // true
Object.is([], []) // false
const foo = { a: 1 }
const bar = { a: 1 }
const sameFoo = foo
Object.is(foo, foo) // true
Object.is(foo, bar) // false
Object.is(foo, sameFoo) // true

// 案例 2: 带符号的 0
Object.is(0, -0) // false
Object.is(+0, -0) // false
Object.is(-0, -0) // true

// 案例 3: NaN
Object.is(NaN, 0 / 0) // true
Object.is(NaN, Number.NaN) // true
```
