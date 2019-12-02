## 迭代器

```js
function createIterator(items) {
  var i = 0;
  return {
    next: function() {
      var done = i >= items.length;
      var value = !done ? items[i++] : undefined;
      return {
        done: done,
        value: value
      };
    }
  };
}
var iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 2, done: false }"
console.log(iterator.next()); // "{ value: 3, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
// 之后的所有调用
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

#### 默认部署 Symbol.iterator 属性
>
数组
Set
Map
类数组对象，如 arguments 对象、DOM NodeList 对象
Generator 对象
字符串
>
#### for of 的实现

```js
function forOf(obj, cb) {
  let iterable, result;

  if (typeof obj[Symbol.iterator] !== "function")
    throw new TypeError(result + " is not iterable");
  if (typeof cb !== "function") throw new TypeError("cb must be callable");

  iterable = obj[Symbol.iterator]();

  result = iterable.next();
  while (!result.done) {
    cb(result.value);
    result = iterable.next();
  }
}
```
#### 内建迭代器
entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值。
keys() 返回一个遍历器对象，用来遍历所有的键名。
values() 返回一个遍历器对象，用来遍历所有的键值。