#### 函数是第一等公民

这一点，JavaScript 没有问题，在 JavaScript 的世界里，
函数可以作为参数传递，函数可以赋值给一个变量，一个函数的执行结果也可以是一个函数，
因为在 JavaScript 里面，函数也是对象，第一等公民的地位妥妥的。

#### 数据是不可变的(Immutable)

- 在 React 中，强调一个组件不能去修改传入的 prop 值，也是遵循 Immutable 的原则。
- 在 Redux 中，更是强调 Immutable 的作用，每个 reducer 不能够修改 state，只能返回一个新的 state。
