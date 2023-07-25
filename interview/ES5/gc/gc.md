
不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。

#### 垃圾回收机制

最常使用的方法叫做"引用计数"（reference counting）：语言引擎有一张"引用表"，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是 0，就表示这个值不再用到了，因此可以将这块内存释放。

```js
let arr = [1, 2, 3, 4];
console.log("hello world");
arr = null;
```

#### 内存泄漏的情况
- 脱离 DOM 的引用
- 意外的全局变量
  - 严格模式
  - var = null
- 被遗忘的计时器
- 闭包
  - var = null
- 遗忘的监听者模式  
- 遗忘的Map、Set对象
```js
// 此例我们重写 obj 以后，{id: 1} 依然会存在于内存中，
// 因为 user 对象以及后面的 set/map 都强引用了它，Set/Map、对象、数组对象等都是强引用，
// 所以我们仍然可以获取到 {id: 1} ，我们想要清除那就只能重写所有引用将其置空了。
let obj = {id: 1}
let user = {info: obj}
let set = new Set([obj])
let map = new Map([[obj, 'hahaha']])
// 重写obj
obj = null 
console.log(user.info) // {id: 1}
console.log(set)
console.log(map)

```