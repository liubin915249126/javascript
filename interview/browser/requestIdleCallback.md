```js
let frameDeadline // 当前帧的结束时间
let penddingCallback // requestIdleCallback的回调方法
let channel = new MessageChannel()

// 当执行此方法时，说明requestAnimationFrame的回调已经执行完毕，此时就能算出当前帧的剩余时间了，直接调用timeRemaining()即可。
// 因为MessageChannel是宏任务，需要等主线程任务执行完后才会执行。我们可以理解requestAnimationFrame的回调执行是在当前的主线程中，只有回调执行完毕onmessage这个方法才会执行。
// 这里可以根据setTimeout思考一下，setTimeout也是需要等主线程任务执行完毕后才会执行。
channel.port2.onmessage = function () {
  // 判断当前帧是否结束
  // timeRemaining()计算的是当前帧的剩余时间 如果大于0 说明当前帧还有剩余时间
  let timeRema = timeRemaining()
  if (timeRema > 0) {
    // 执行回调并把参数传给回调
    penddingCallback &&
      penddingCallback({
        // 当前帧是否完成
        didTimeout: timeRema < 0,
        // 计算剩余时间的方法
        timeRemaining,
      })
  }
}
// 计算当前帧的剩余时间
function timeRemaining() {
  // 当前帧结束时间 - 当前时间
  // 如果结果 > 0 说明当前帧还有剩余时间
  return frameDeadline - performance.now()
}
window.requestIdleCallback = function (callback) {
  requestAnimationFrame((rafTime) => {
    // 算出当前帧的结束时间 这里就先按照16.66ms一帧来计算
    frameDeadline = rafTime + 16.66
    // 存储回调
    penddingCallback = callback
    // 这里发送消息，MessageChannel是一个宏任务，也就是说上面onmessage方法会在当前帧执行完成后才执行
    // 这样就可以计算出当前帧的剩余时间了
    channel.port1.postMessage('haha') // 发送内容随便写了
  })
}
```
