### Set 集合

> ES6 新增的一种新的数据结构，类似于数组，但成员是唯一且无序的，没有重复的值。

向 Set 加入值的时候，不会发生类型转换，所以 5 和"5"是两个不同的值。Set 内部判断两个值是否不同，
使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），
主要的区别是** Set 认为 NaN 等于自身，而精确相等运算符认为 NaN 不等于自身。**

#### [SameValue](./SameValue.md)

>

```js
    add(value)：新增，相当于 array里的push
    delete(value)：存在即删除集合中value
    has(value)：判断集合中是否存在 value
    clear()：清空集合
```

### WeakSet

> WeakSet 对象允许你将弱引用对象储存在一个集合中

### Map

> 只有对同一个对象的引用，Map 结构才将其视为同一个键
> 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，
> Map 将其视为一个键，比如 0 和-0 就是一个键，布尔值 true 和字符串 true 则是两个不同的键。
> 另外，undefined 和 null 也是两个不同的键。虽然 NaN 不严格相等于自身，但 Map 将其视为同一个键。

### WeakMap

> WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意

#### map set 区别

(1) 这两种方法具有极快的查找速度
(2) 初始化需要的值不一样，Map 需要的是一个二维数组，而 Set 需要的是一维 Array 数组

(3) Map 和 Set 都不允许键重复

(4) Map 的键是不能修改，但是键对应的值是可以修改的；Set 不能通过迭代器来改变 Set 的值，因为 Set 的值就是键。

(5) Map 是键值对的存在，值也不作为健；而 Set 没有 value 只有 key，value 就是 key；
