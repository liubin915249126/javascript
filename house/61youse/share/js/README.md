## js 分享

#### 作用域

作用域是指程序源代码中定义变量的区域。
作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

```js
var value = 1;
function foo() {
  console.log(value);
}
function bar() {
  var value = 2;
  foo();
}
bar();
```

JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了

#### 变量对象

JavaScript 代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)
对于每个执行上下文，都有三个重要属性：

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this

变量对象
执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明

- 全局上下文
  全局对象
- 函数上下文
  函数执行过程
  - 进入执行上下文
  - 代码执行

```js
    function foo(a) {
        var b = 2;
        function c() {}
        var d = function() {};

        b = 3;
    }
    foo(1);
```
```js
VO = {
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
- function 的「创建」「初始化」和「赋值」都被提升了。
- var 的「创建」和「初始化」都被提升了。 //undefined
- let 的「创建」过程被提升了，但是初始化没有提升。 // 暂时性死区

#### 作用域链
函数的作用域在函数定义的时候就决定了。
函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中

```js
function foo() {
    function bar() {
        ...
    }
}
```
```js
foo.[[scope]] = [
  globalContext.VO
];

bar.[[scope]] = [
    fooContext.AO,
    globalContext.VO
];
```
当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。
```js
   Scope = [VO].concat([[Scope]]);
```
#### 闭包
```js
    const op = document.querySelectorAll("p");
    // 
    for (var j = 0; j < op.length; j++) {
      op[j].onclick = function() {
        alert(j);
      };
    }
    // 
    for (var j = 0; j < op.length; j++) {
    op[j].onclick = (function() {
        var temp = j;
        return function() {
          alert(j);
        };
    })();
    }
```
[perIterationBindings](http://www.ecma-international.org/ecma-262/6.0/#sec-createperiterationenvironment)

每次迭代会新建运行环境记录拷贝最后迭代内容，所以每一次都是声明在一个独立的作用域

let for 
create a new lexical environment with those names for a) the initialiser expression b) each iteration (previosly to evaluating the increment expression)
copy the values from all variables with those names from one to the next environment
