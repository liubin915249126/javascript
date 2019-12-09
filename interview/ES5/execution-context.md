## 执行上下文

可执行代码：全局代码、函数代码、eval 代码

## 执行上下文栈

当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出

```js
function fun3() {
  console.log("fun3");
}
function fun2() {
  fun3();
}
function fun1() {
  fun2();
}
fun1();
// 伪代码

// fun1()
ECStack.push(<fun1> functionContext);
// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);
// 擦，fun2还调用了fun3！
ECStack.push(<fun3> functionContext);
// fun3执行完毕
ECStack.pop();
// fun2执行完毕
ECStack.pop();
// fun1执行完毕
ECStack.pop();
// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```

## 执行上下文包含

变量对象(Variable object，VO)
[作用域链(Scope chain)](./scope-chain.md)
[this](./this.md)

#### 全局上下文 函数上下文

全局上下文中的变量对象就是全局对象呐！

只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，
而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。
活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。

#### 执行过程

进入执行上下文
代码执行

## 变量对象

##### 函数的所有形参 (如果是函数上下文)

由名称和对应值组成的一个变量对象的属性被创建
没有实参，属性值设为 undefined

##### 函数声明

由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
如果变量对象已经存在相同名称的属性，则完全替换这个属性

##### 变量声明

由名称和对应值（undefined）组成一个变量对象的属性被创建；
如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

```js
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;
}
foo(1);

AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}
```

#### 代码执行

```js
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

#### 思考题

```js
function foo() {
  console.log(a);
  a = 1;
}

foo(); // ???

function bar() {
  a = 1;
  console.log(a);
}
bar(); // ???
// 第一段会报错：Uncaught ReferenceError: a is not defined。
//   这是因为函数中的 "a" 并没有通过 var 关键字声明，所有不会被存放在 AO 中。全局也没有
// 第二段会打印：1。
//   当第二段执行 console 的时候，全局对象已经被赋予了 a 属性，这时候就可以从全局找到 a 的值，所以会打印 1。
```
