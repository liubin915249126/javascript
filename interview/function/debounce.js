function debounce(func, wait) {
    let timeout;
    return function() {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
  // 使用
  window.onscroll = debounce(function() {
    console.log('debounce');
  }, 1000);
function throttle(fn, delay) {
  var prevTime = Date.now();
  return function() {
    var curTime = Date.now();
    if (curTime - prevTime > delay) {
      fn.apply(this, arguments);
      prevTime = curTime;
    }
  };
}
// 使用
var throtteScroll = throttle(function() {
  console.log('throtte');
}, 1000);
window.onscroll = throtteScroll;

function throttle1(func, deley) {
  let run = true;
  return function() {
    if (!run) {
      return; // 如果开关关闭了，那就直接不执行下边的代码
    }
    run = false; // 持续触发的话，run一直是false，就会停在上边的判断那里
    setTimeout(() => {
      func.apply(this, arguments);
      run = true; // 定时器到时间之后，会把开关打开，我们的函数就会被执行
    }, deley);
  };
}