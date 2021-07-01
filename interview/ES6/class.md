## class
- 类不存在变量提升（hoist），这一点与 ES5 完全不同。
- 类方法不可枚举。 类定义将 "prototype" 中的所有方法的 enumerable 标志设置为 false。
    - 这很好，因为如果我们对一个对象调用 for..in 方法，我们通常不希望 class 方法出现。
- 类总是使用 use strict。 在类构造中的所有代码都将自动进入严格模式。
- 类的所有方法都定义在类的prototype属性上面。
  - 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

```js
// Object.assign()方法可以很方便地一次向类添加多个方法
Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
Point.prototype.constructor === Point // true

class B {}
const b = new B();
b.constructor === B.prototype.constructor // true
```
- 与 ES5 一样，类的所有实例共享一个原型对象。
```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
```

- name属性总是返回紧跟在class关键字后面的类名

#### 静态方法
- 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
- 如果静态方法包含this关键字，这个this指的是类，而不是实例

#### 私有属性

#### 