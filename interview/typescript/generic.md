#### generic 范型

```ts
// 范型
type StringArray = Array<string>
type NumberArray = Array<number>
type ObjectWithNameArray = Array<{ name: string }>
```

```ts
// T 作为占位符，使函数具有通用性
function identity<T>(value: T): T {
  return value
}
console.log(identity<Number>(1)) // 1
```

#### 范型接口

多参数

```ts
interface Identities<V, M> {
  value: V
  message: M
}
function identity<T, U>(value: T, message: U): Identities<T, U> {
  console.log(value + ': ' + typeof value)
  console.log(message + ': ' + typeof message)
  let identities: Identities<T, U> = {
    value,
    message,
  }
  return identities
}

console.log(identity(68, 'Semlinker'))
```

#### 泛型类

```ts
type Props = {
  className?: string
   ...
};

type State = {
  submitted?: bool
   ...
};

class MyComponent extends React.Component<Props, State> {
   ...
}

```

#### 泛型约束

##### 确保属性存在

```ts
interface Length {
  length: number
}

function identity<T extends Length>(arg: T): T {
  console.log(arg.length) // 可以获取length属性
  return arg
}
```

##### 检查对象上的键是否存在

```ts
interface Person {
  name: string
  age: number
  location: string
}

type K1 = keyof Person // "name" | "age" | "location"
type K2 = keyof Person[] // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person } // string | number

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
```
