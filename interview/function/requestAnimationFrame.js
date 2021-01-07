// setInterval实现
function setInterval(callback, interval) {
    let timer
    const now = Date.now
    let startTime = now()
    let endTime = startTime
    const loop = () => {
        timer = window.requestAnimationFrame(loop)
        endTime = now()
        if (endTime - startTime >= interval) {
            startTime = endTime = now()
            callback(timer)
        }
    }
    timer = window.requestAnimationFrame(loop)
    return timer
}

let a = 0
setInterval(timer => {
    console.log(a)
    a++
    if (a === 3) window.cancelAnimationFrame(timer)
}, 1000)
// 0
// 1
// 2


// setTimeout 实现
function setTimeout(callback, interval) {
    let timer
    const now = Date.now
    let startTime = now()
    let endTime = startTime
    const loop = () => {
        timer = window.requestAnimationFrame(loop)
        endTime = now()
        if (endTime - startTime >= interval) {
            callback(timer)
            window.cancelAnimationFrame(timer)
        }
    }
    timer = window.requestAnimationFrame(loop)
    return timer
}

let a = 0
setTimeout(timer => {
    console.log(a)
    a++
}, 1000)
// 0
