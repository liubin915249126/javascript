```js
const times = [] // 存储当前的时间数组
let fps
function refreshLoop() {
  window.requestAnimationFrame(() => {
    const now = performance.now() // 使用performance.now()能获取更高的精度
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift() // 去掉1秒外的时间
    }
    times.push(now)
    fps = times.length
    refreshLoop()
    console.log(fps)
  })
}

refreshLoop()
```

```js
let count = 0
let prevTimestamp

function showFPS(fps) {
  // 这里设置如何将 fps 数值输出
  // 比如你可以将其更新到某个 DOM 元素上
  console.log(fps)
}

function loop(timestamp) {
  if (prevTimestamp) {
    count++ // 间隔超过 1s，将之前计算的 count 输出
    if (timestamp - prevTimestamp >= 1000) {
      showFPS(count)
      prevTimestamp = timestamp
      count = 0
    }
  } else {
    prevTimestamp = timestamp
  }
  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
```
