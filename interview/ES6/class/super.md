## class

#### super
使用 super.method(...) 调用父方法。
  在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
使用 super(...) 调用父构造函数（仅在 constructor 函数中）。

#### constructor
继承类中的构造函数必须调用 super（...），(!)并且在使用 this 之前执行它。
在 constructor 中必须调用 super 方法，因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工,而 super 就代表了父类的构造函数。super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B，因此 super() 在这里相当于 
```js
A.prototype.constructor.call(this, props)
```
```js
class A {
  constructor() {
    console.log(new.target.name); // new.target 指向当前正在执行的函数
  }
}
class B extends A {
  constructor {
    super();
  }
}
new A(); // A
new B(); // B

```

链接：https://juejin.cn/post/6844903638674980872