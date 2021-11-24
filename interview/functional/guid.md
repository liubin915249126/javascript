## 函数式编程

#### 保持 Function Pure 的第一步 - Immutable
所有講 Functional Programming 的文章或書籍都會提到 Immutable Data Structure，
所謂的 immutable data 就是一旦建立後就不會再改變的資料，所有對於 immutable data 
的操作都只是回傳一個新的 immutable data，但很可惜的是 JavaScript 原生的資料結構都是 mutable 的，如下
```js
var a = {
  name: 'Jerry',
  age: 18
};

var b = a;
b.age = 19;

console.log(a); // { name: 'Jerry', age: 19 }
console.log(a === b); // true
// 修改 b 的數據其實同時修改了 a
// `b.age = 19` 是一個 mutable 的操作
```
1. immutable.js
2. 使用原生 Immutable 的資料操作
```js
var a = {
  name: 'Jerry',
  age: 18
};

// ES6
var b = { ...a, age: 19 };
// ES5
// var b = Object.assign({}, a, { age: 19 });

console.log(a); // { name: 'Jerry', age: 18 }
console.log(a === b); // false
```
3.使用 Ramda 來操作複雜的資料
```js
import * as R from 'ramda';

var a = {
  name: 'Jerry',
  age: 18,
  job: {
    company: 'Branch8',
    title: 'RD'
  }
};

// 較複雜的資料結構用 spread operator 會有點麻煩
var b = {
  ...a,
  job: {
    ...a.job,
    title: 'Tech Lead',
  }
};

// 可以改用 Ramda 的 assocPath
var b = R.assocPath(['job', 'title'], 'Tech Lead', a);
```
4. 確保團隊不會使用 mutable 的方式操作資料
eslint-plugin-immutable
```js
no-let
no-this
no-mutation
no-var
no-param-reassign
```


[referer](https://blog.jerry-hong.com/series/fp/think-in-fp-03/)