## pip
管道操作
```js
const addTen = pipe(
  addOne,
  addTwo,
  addThree,
  addFour
)
```
```js
const pipe = ...args => x => 
  args.reduce(
    (outputValue, currentFunction) => currentFunction(outputValue),
    x
  )
```

#### Pipe和Prototype
```js
// todo
// 基于prototype的这种链式操作
[1, 2, 3, 3, 5]
  .map(i => i * 2)
  .filter(i => i !== 10)
  .reduce((acc, cur) => acc + cur)
```
#### js Proposal-pipeline-operator
a |> b // b(a)
```js
{
  "plugins": [["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]]
}
```
```js
import * as R from 'ramda'
[1, 2, 3, 4, 5]
  |> R.map(i => i * 2)
  |> R.uniq
  |> R.filter(i => i !== 10)
  |> R.reduce(R.add, 0)
  // 是的，我们还可以写arrow function,
  |> (_ => 'done, result is ' + _)
  |> console.log
```