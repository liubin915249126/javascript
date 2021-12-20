#### 原型链

1、每一个函数对象都有一个prototype属性，但是普通对象是没有的；

　 prototype下面又有个construetor，指向这个函数。

2、每个对象都有一个名为_proto_的内部属性，指向它所对应的构造函数的原型对象，原型链基于_proto_;

3.每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。
4.当继承的函数被调用时，this 指向的是当前继承的对象，而不是继承的函数所在的原型对象。

Object.getPrototypeOf(person1) === Person.prototype

[prototype](../ES5/prototype.md)

#### 函数式编程
纯函数
闭包
高阶函数：接受或者返回一个函数的函数称为高阶函数
柯里化（Currying）  给定一个函数的部分参数，生成一个接受其他参数的新函数
函数组合

#### new 
创建一个新对象
将构造函数的作用域赋给新对象（this 指向新对象）
执行构造函数中的代码（为之添加属性）
返回新对象

若 A 通过 new 创建了 B,则 B.__proto__ = A.prototype

#### Instanceof
```js
   function myInstanceof(left,right){
      let rightProto = right.prototype;
      let leftValue = left.__proto__;
      while(true){
          if(leftValue === null){
              return false;
          }
          if(leftValue === rightProto){
              return true;
          }
          leftValue = leftValue.__proto__;
      }
  }
```