## JS原型链继承与Class继承

## es6 class es5 prototype

- class类必须new调用，不能直接执行。
- class类不存在变量提升
- class类无法遍历它实例原型链上的属性和方法
- new.target属性
  它会返回new命令作用于的那个构造函数。如果不是通过new调用或Reflect.construct()调用的，new.target会返回undefined
- class类有static静态方法  

#### 基于原型继承
原型实现继承的核心在于通过子类的构造函数中通过Parent.call(this)继承父类的属性，然后改变子类的原型为new Parent() 来继承父类的函数。
```js
//ES5原型链构造对象
//父类
function People(name, age) {
    this.name = name || 'pray'
    this.age = age || 27
}
//父类方法
People.prototype.sayHi = function () {
    console.log(this.name + ' of ' + this.age + ' sayHi')
}
//ES5原型链继承对象
//子类
function Student(name, age) {
    //继承父类属性
    People.call(this, name, age)
}
//继承父类方法
(function () {
    // 创建空类
    let Super = function () { };
    Super.prototype = People.prototype;
    //父类的实例作为子类的原型
    Student.prototype = new Super();
})();
//修复构造函数指向问题
Student.prototype.constructor = Student;
let studentObj = new Student();
studentObj.sayHi()
```

#### 基于Class继承
class实现继承的核心在于使用extends表明继承自哪个父类，并且在子类构造函数中必须调用super继承父类属性和方法。
```js
// ES6 Class构造对象
class People {
    constructor(name = 'pray', age = 18) {
        this.name = name;
        this.age = age;
    }
    sayHi() {
        console.log(this.name + ' of ' + this.age + ' says Hi!')
    }
}
//ES6 extends 继承父类
class Student extends People {
    constructor(name = 'student1', age = '22', score = 90) {
        //继承父类属性
        super(name, age);
        //自身属性
        this.score = score;
    }
    sayHi() {
        //继承父类属性方法
        super.sayHi()
        //自身方法
        console.log('score：' + this.score)
    }
}
let person = new Student()
person.sayHi()

```