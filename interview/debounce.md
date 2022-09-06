#### debounce 函数防抖

持续触发不执行
不触发的一段时间之后再执行

```js
function debounce(func, delay) {
  let timeout
  return function () {
    clearTimeout(timeout) // 如果持续触发，那么就清除定时器，定时器的回调就不会执行。
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}
```

#### throttle 节流

持续触发并不会执行多次
到一定时间再去执行

```js
function throttle(func, deley) {
  let run = true
  return function () {
    if (!run) {
      return // 如果开关关闭了，那就直接不执行下边的代码
    }
    run = false // 持续触发的话，run一直是false，就会停在上边的判断那里
    setTimeout(() => {
      func.apply(this, arguments)
      run = true // 定时器到时间之后，会把开关打开，我们的函数就会被执行
    }, deley)
  }
}
```
