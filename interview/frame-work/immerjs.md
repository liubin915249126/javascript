## immerjs

#### 用法

```js
const produce = require("immer");
const state = {
  done: false,
  val: "string",
};
const newState = produce(state, (draft) => {
  draft.done = true;
});
console.log(state.done); // false
console.log(newState.done); // true
```

#### immerjs
modifing​ 这个函数，如果触发了 setter 并且之前没有改动过的话，
就会手动将 ​modified​ 这个 flag 设置为 ​true​，并且手动通过原生的 API 实现一层 immutable
[immer.js](./immer.js)
