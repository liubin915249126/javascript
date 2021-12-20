## Object.create(null)和直接创建一个{}有什么区别
```js
// {} 相当于 Object.create(Object.ptototype)
var obj1 = {};
// 要创建一个干净的空对象，应该使用Object.create(null)而不是剩下两种。
// 通过做Objist.create（NULL），我们显式指定NULL作为它的原型。所以它绝对没有属性，甚至没有构造函数、toString、hasOwnProperty属性，所以如果需要的话，可以在数据结构中使用这些键，而不需要通过hasOwnProperty进行判断。
var obj2 = Object.create(null);
// 相当于 var obj1 = {}; ？
var obj3 = new Object();
```
