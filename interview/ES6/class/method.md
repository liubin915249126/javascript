## class

```js
class A {
	print () {
    	console.log('print a');
    }
}
```
经过 babel 转换后
```js
var A = function () {
   function A() {
      _classCallCheck(this, A);
   }

   _createClass(A, [{
      key: 'print',
      value: function print() {
         console.log('print a');
      }
   }]);

   return A;
}();
// 可以看到，转换后的 class A 就是一个函数，所以理论上就可以把 A 当作函数调用，但 _classCallCheck 的作用就是禁止将类作为普通函数调用：
function _classCallCheck(instance, Constructor) { 
    if (!(instance instanceof Constructor)) { 
        throw new TypeError("Cannot call a class as a function"); 
    } 
}

A() // throw a error
const a = new A(); // work well
// _createClass 的功能主要是通过 Object.defineProperty 定义了类的普通属性和静态属性。需要注意的是普通属性是定义在了类的原型对象上，静态属性是定义在了类本身上。
var _createClass = function () { 
  function defineProperties(target, props) { 
    for (var i = 0; i < props.length; i++) { 
      var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; 
      descriptor.configurable = true; 
      if ("value" in descriptor) descriptor.writable = true; 
      Object.defineProperty(target, descriptor.key, descriptor); 
    } 
  } 
  return function (Constructor, protoProps, staticProps) { 
    if (protoProps) defineProperties(Constructor.prototype, protoProps); 
    if (staticProps) defineProperties(Constructor, staticProps); return Constructor; 
  }; 
}();
```
```js
// es6 class 等同于
function A () {}
A.prototype.print = function () {
    console.log('print a');
}

```

#### 两种 method

```js
// 方式一
class A {
  print() {
    console.log("print a");
  }
}
// 方式二
class B {
  print = () => {
    console.log("print b");
  };
}
const a = new A();
a.print(); // print a

const b = new B();
b.print(); // print b
```

#### 区别 1：this 的绑定

```js
// 当点击 div 元素时，会触发 testClick，该方法会输出当前的 this，而(严格模式下)此时输出的 this 值是 undefined，显然这不是我们要的结果。怎么修改呢？这里至少有三种修改方式，其中之一就是通过箭头函数来定义方式。

import React, { Component } from "react";
class Test extends Component {
  testClick() {
    console.log("testClick", this);
  }
  render() {
    return <div onClick={this.testClick}>Test</div>;
  }
}
```

#### 区别 2：继承

```js
class A {
  print() {
    console.log("print a");
  }
}

class C extends A {
  print() {
    super.print();
    console.log("print c");
  }
}

const c = new C();
c.print();
// print a
// print c
```
```js
// 类 D 继承 B，不仅会继承类 B 原型上的属性和方法，也会继承其实例上的属性和方法
class B {
    print = () => {
    	console.log('print b');
    }
}
class D extends B {
    print () {
	  super.print();
      console.log('print d');
    }
}
const d = new D();
d.print();
// ???
```
```js
// B 转换后的代码
var B = function B() {
   _classCallCheck(this, B);

   this.print = function () {
      console.log('print b');
   };
};

```
