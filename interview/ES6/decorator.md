## decorator

#### throttle
```js
/**
 * @param {number} ms 毫秒数
 * @description 节流装饰器
 * 使用方法： @throttle() 或者 @throttle(2000) 代表2s执行一次
 */
export function throttle(ms = 1000) {
    let prev = 0
    return function(target, name, descriptor) {
        const fn = descriptor.value
        descriptor.value = function(...args) {
            let now = Date.now()
            if (now - prev > ms) {
                fn.apply(this, args)
                prev = now
            }
        }
    }
}
```
#### 
```js
   /**
 * @description 装饰器, 用做权限判断
 */
export function authValid(target, name, descriptor) {
    const fn = descriptor.value
    descriptor.value = function(...args) {
        // 从localStorage中取出角色
        const type = window.localStorage.getItem('type')
        // 如果是 user类型的用户，提示用户。
        if (type === 'USER') {
            return message.warn('请联系管理员升级账户权限')
        }
        fn.call(this, ...args)
    }
}
```