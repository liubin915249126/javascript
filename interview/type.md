## 检验数据类型

#### typeof
number、boolean、string、symbol、object、undefined、function等7种数据类型，但不能判断null,array,new RegExp(),new Date()

#### instanceof
instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性
>
  对于基本数据类型来说，字面量方式创建出来的结果和实例方式创建的是有一定的区别的
    
    console.log(1 instanceof Number)//false
    console.log(new Number(1) instanceof Number)//true
    
  只要在当前实例的原型链上，我们用其检测出来的结果都是true。在类的原型继承中，我们最后检测出来的结果未必准确。
    var arr = [1, 2, 3];
    console.log(arr instanceof Array) // true
    console.log(arr instanceof Object);  // true
    function fn(){}
    console.log(fn instanceof Function)// true
    console.log(fn instanceof Object)// true 
  不能检测null 和 undefined  
>