1. 为什么选择前端
2. 项目问题
3. 聊到了缓存, 问了 sessionStorage 是什么
4. 了解 cookie 吗, 如何设置禁止脚本操作 cookie
5. http 状态码
6. 304 是做什么的, 这个状态码涉及到的操作是什么
7. http 如何维持持久的连接
8. TCP 为什么可靠
9. Vue3 相比 Vue2 的区别
10. 为什么 Vue2 和 Vue3 响应式原理不同
11. Vue2 如何对数组设置响应式
12. 选项式 API 和组合式 API 的区别
13. 说结果:
    async functio async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
    }
    async function async2() {
    console.log('async2')
    }

console.log('script start')

setTimeout(function () {
console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve){
console.log('promise1')
resolve()
}).then(function() {
console.log('promise2')
})

console.log('script end')

14. 手写 Promise.all

作者：牛客 993212781 号
链接：https://www.nowcoder.com/feed/main/detail/f98d2122c50a4cca983ec0d5740bd98d
来源：牛客网
