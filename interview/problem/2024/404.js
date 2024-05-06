console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function () {
  console.log('setTimeout')
}, 0)

new Promise((resolve) => {
  console.log('Promise')
  resolve()
}).then(function () {
  console.log('promise1')
})

console.log('script end')

// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// setTimeout