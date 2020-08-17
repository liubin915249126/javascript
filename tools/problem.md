## Problem

#### Array

```js
  new Array(10).map(item=>1) // empty*10 => empty*10  空位跳过
  [...new Array(10)].map(item=>1) //empty*10 => undefined*10 => 1*10
  // map会跳过 empty
  // [...new Array(10)] empty*10 => undefined*10
```