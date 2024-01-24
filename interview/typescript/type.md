## type

#### 推断类型 Types by Inference

```ts
// let helloWorld: string
let helloWorld = 'Hello World'
```

#### type/interface 区别

- 都可以描述 Object 和 Function
- 二者都可以被继承

```ts
// type
type Point = { x: number; y: number }
type SetPoint = (x: number, y: number) => void
// interface
interface Point {
  x: number
  y: number
}
interface SetPoint {
  (x: number, y: number): void
}
```

- type 可以定义基本类型别名, 但是 interface 无法定义
- type 可以声明联合类型
- type 可以申明 元组类型

```ts
type Data = [number, string]
```

- interface 声明合并, 如果是 type 的话，重复使用 Person 是会报错的：

```ts
interface Person {
  name: string
}
interface Person {
  age: number
}

let user: Person = { name: 'Tolu', age: 0 }
```
