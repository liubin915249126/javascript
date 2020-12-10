## Reflect
- 将 Object 对象的一些明显属于语言内部的方法（如：Object.defineProperty ，放到 Reflect对象上）；
- 修改某些 Object 方法的返回结果，让其变得更合理；
- 让 Objecty 操作都变成函数行为；
- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。
也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。