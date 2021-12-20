## 原型

person.__proto__ = Person.prototype
Person.prototype.constructor = Person

#### prototype

```js
    function Person() {

    }
    // 虽然写在注释里，但是你要注意：
    // prototype是函数才会有的属性
    Person.prototype.name = 'Kevin';
    var person1 = new Person();
    var person2 = new Person();
    console.log(person1.name) // Kevin
    console.log(person2.name) // Kevin
```
每个函数都有一个 prototype 属性
函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型，也就是这个例子中的 person1 和 person2 的原型

####
```js
    function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
        var O = R.prototype;// 取 R 的显示原型
        L = L.__proto__;// 取 L 的隐式原型
        while (true) { 
            if (L === null) 
            return false; 
            if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true 
            return true; 
            L = L.__proto__; 
        } 
    }
```

## Object的_proto_指向什么
 
`Object` 是构造函数，所有的函数都是通过 `new Function` 创建了，因此 `Object` 相当于 `Function` 的实例，即 `Object.__proto__ --> Function.prototype`。
## Function的_proto_指向什么
`Function` 函数不通过任何东西创建，JS引擎启动时，添加到内存中。 `Function.__proto__ --> Function.prototype`

```js
// 一切皆对象
// 函数是一等公民
function t () {}
t.__proto__ === Function.prototype  // true
t.__proto__.__proto__ === Object.prototype // true
```
## 原型链图

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eafcee00dc21445cb9a9315fee57cb91~tplv-k3u1fbpfcp-watermark.awebp?)


参考链接: [JavaScript之彻底理解原型与原型链](https://juejin.cn/post/7018355953955241997)