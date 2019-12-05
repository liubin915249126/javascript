## js 继承

#### 原型链继承

```js
function Parent() {
  this.name = "kevin";
}
Parent.prototype.getName = function() {
  console.log(this.name);
};
function Child() {}
Child.prototype = new Parent();
var child1 = new Child();
console.log(child1.getName()); // kevin
// 1.引用类型的属性被所有实例共享
// 2.在创建 Child 的实例时，不能向Parent传参
```

#### 借用构造函数(经典继承)

```js
function Parent() {
  this.names = ["kevin", "daisy"];
}
function Child() {
  Parent.call(this);
}
var child1 = new Child();
child1.names.push("yayu");
console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child();
console.log(child2.names); // ["kevin", "daisy"]
// 1.避免了引用类型的属性被所有实例共享
// 2.可以在 Child 中向 Parent 传参
// 方法都在构造函数中定义，每次创建实例都会创建一遍方法。
```

#### 组合继承

原型链继承和经典继承双剑合璧。

```js
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
Parent.prototype.getName = function() {
  console.log(this.name);
};
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
var child1 = new Child("kevin", "18");
child1.colors.push("black");
console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child("daisy", "20");

console.log(child2.name); // daisy
console.log(child2.age); // 20
```

#### 原型式继承

```js
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
var person = {
  name: "kevin",
  friends: ["daisy", "kelly"]
};

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = "person1";
console.log(person2.name); // kevin

person1.firends.push("taylor");
console.log(person2.friends); // ["daisy", "kelly", "taylor"]
```

#### 寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
```js
function createObj(o) {
  var clone = Object.create(o);
  clone.sayName = function() {
    console.log("hi");
  };
  return clone;
}
```
#### 寄生组合式继承
这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 
上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；
因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```

[参考文献](https://github.com/mqyqingfeng/Blog/issues/16)