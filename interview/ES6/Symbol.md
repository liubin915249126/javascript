## Symbol
对象的属性键只能是字符串类型或者 Symbol 类型

#### “Symbol” 值表示唯一的标识符。
```js
let id1 = Symbol("id");
let id2 = Symbol("id");
alert(id1 == id2); // false
```

- Symbol 不会被自动转换为字符串
  - id.toString();
  - id.description; // id
- 对象的隐藏属性，key不会重复  
- Symbol 属性不参与 for..in 循环  
- Object.keys(user) 也会忽略它们

- Object.getOwnPropertySymbols(obj) 
- Reflect.ownKeys(obj) 的方法可以返回一个对象的 所有 键，包括 Symbol

#### 全局 symbol
Symbol.for(key)
如果有一个描述为 key 的 Symbol，则返回该 Symbol，否则将创建一个新 Symbol（Symbol(key)），并通过给定的 key 将其存储在注册表中

#### symbol 有什么用处

主要用来提供遍历接口，布置了 symbol.iterator 的对象才可以使用 for···of 循环，可以统一处理数据结构。调用之后回返回一个遍历器对象，包含有一个 next 方法，使用 next 方法后有两个返回值 value 和 done 分别表示函数当前执行位置的值和是否遍历完毕。

Symbol.for() 可以在全局访问 symbol
