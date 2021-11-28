## js 相等比较算法

#### ==
[](../ES5/==.md)

#### ===
严格相等
```js
Boolean(NaN === NaN) // false
Boolean(+0 === -0) // true
```

#### SameValueZero

```js
const s = new Set();
s.add(0);
s.add(NaN);
s.has(-0); // true
s.has(NaN); // true
```

new Set
[].includes

#### SameValue Object.is

```js
Object.is(NaN, NaN); // true
Object.is(0, -0); // false
```

Object.is() 方法判断两个值是否为同一个值。如果满足以下条件则两个值相等:

都是 undefined
都是 null
都是 true 或 false
都是相同长度的字符串且相同字符按相同顺序排列
都是相同对象（意味着每个对象有同一个引用）
都是数字且
都是 +0
都是 -0
都是 NaN
或都是非零而且非 NaN 且为同一个值

与== (en-US) 运算不同。 == 运算符在判断相等前对两边的变量(如果它们不是同一类型) 进行强制转换 (这种行为的结果会将 "" == false 判断为 true), 而 Object.is 不会强制转换两边的值。

与=== (en-US) 运算也不相同。 === 运算符 (也包括 == 运算符) 将数字 -0 和 +0 视为相等 ，而将 Number.NaN 与 NaN 视为不相等.

```js
if (!Object.is) {
  Object.is = function (x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  };
}
```
