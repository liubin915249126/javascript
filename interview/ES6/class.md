## class

- 类不存在变量提升（hoist），这一点与 ES5 完全不同。
- 类方法不可枚举。 类定义将 "prototype" 中的所有方法的 enumerable 标志设置为 false。
  - 这很好，因为如果我们对一个对象调用 for..in 方法，我们通常不希望 class 方法出现。
- 类总是使用 use strict。 在类构造中的所有代码都将自动进入严格模式。
- class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
- 类的所有方法都定义在类的 prototype 属性上面。
- 实例的属性除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即定义在 class 上）。

```js
// Object.assign()方法可以很方便地一次向类添加多个方法
Object.assign(Point.prototype, {
  toString() {},
  toValue() {},
})
Point.prototype.constructor === Point // true

class B {}
const b = new B()
b.constructor === B.prototype.constructor // true
```

- 与 ES5 一样，类的所有实例共享一个原型对象。

```js
var p1 = new Point(2, 3)
var p2 = new Point(3, 2)

p1.__proto__ === p2.__proto__
```

- name 属性总是返回紧跟在 class 关键字后面的类名

#### 静态方法

- 如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
- 如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例

#### 私有属性

1、 class 内部不同方法间可以使用，因此 this 要指向实例化对象（必须）
2 、不能被外部访问，因此实例化对象 person.name 既不能获得值，也不能设定值，应该返回 undefined，甚至应该在实例化之后，并不知道有 name 这个属性存在，（必须）
3 不能被继承，因此 extends 后子类不具备该属性（必须）
4 方便的调用方式，比如类 this.\_name 形式（备选）

#### super

子类构造函数中必须调用 super 方法，否则在新建对象时报错。
子类构造函数中必须在使用 this 前调用 super,否则报错。
(先创建父类的实例对象，然后在构建子类的实例，再修改父类中的 this 对象)
super 是指向父类的 prototype 对象，即 Person.prototype，父类的方法是定义在父类的原型中，而属性是定义在父类对象上的，
如果父类的方式是静态的，表示类实例就可以访问，无需类对象，所以在子类调用时，也需要在静态的方法内。此时 super 表示是父类，即 Person，而不是其原型 Person.prototype

#### ES6 一共有 5 种方法可以遍历对象的属性。

（1）for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
（2）Object.keys 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）。
（3）Object.getOwnPropertyNames 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）。
（4）Object.getOwnPropertySymbols 返回一个数组，包含对象自身的所有 Symbol 属性。
（5）Reflect.ownKeys 返回一个数组，包含对象自身的所有属性，不管是属性名是 Symbol 或字符串，也不管是否可枚举。

#### for...of(es6)

不会遍历数组的私有属性(for...in 会)
for of 支持遍历数组、类数组（例如 DOM NodeList 对象）、字符串、Map 对象、Set 对象；
for of 不支持遍历普通对象，可通过与 Object.keys()搭配使用遍历
for of 遍历后的输出结果为数组元素的值；
搭配实例方法 entries()，同时输出数组内容和索引
