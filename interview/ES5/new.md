## new 
>
1.创建一个新对象 obj
2.obj的proto属性指向构造函数的prototype，形成原型链
3.构造函数的this作用域指向实例obj
4.如果该函数没有返回对象，则返回this。
>
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

#### 模拟实现
```js
   // 第一版代码
function objectFactory() {

    var obj = new Object(),

    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    Constructor.apply(obj, arguments);

    return obj;

};
用new Object() 的方式新建了一个对象 obj
取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
返回 obj
```

```js
   // 第二版的代码
   // 构造函数有返回值
function objectFactory() {

    var obj = new Object(),

    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;
};

// 构造函数返回一个对象
// 实例 person 中只能访问返回的对象中的属性
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined
// 构造函数返回一个基本类型
// 结果完全颠倒过来，这次尽管有返回值，但是相当于没有返回值进行处理。
// 所以我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。
```