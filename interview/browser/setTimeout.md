#### setTimeout 为什么最小只能设置 4ms，怎么实现一个 0ms 的 setTimeout?

如果设置的 timeout 小于 0，或者不设置，设置为 0
如果嵌套的层级超过了 5 层，并且 timeout 小于 4ms，则设置 timeout 为 4ms。
在不满足嵌套层级的情况下，最小延迟时间设置为 1ms

```js
setTimeout(() => {
  setTimeout(() => {
    setTimeout(() => {
      setTimeout(() => {
        setTimeout(() => {}, 0)
      }, 0)
    }, 0)
  }, 0)
}, 0)
```

[referer](https://juejin.cn/post/6846687590616137742)
