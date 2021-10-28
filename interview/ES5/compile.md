## 预编译

在学习`JavaScript`预编译之前，先了解一下`JavaScript`从编译到执行的过程，大致可分为四步：
1. 词法分析
2. 语法分析：检查代码是否存在错误，若有错误，引擎会抛出语法错误。同时会构建一颗抽象语法树(`AST`)。
3. 预编译
4. 解释执行

## 预编译
> `JavaScript`是解释性语言，也就是说，编译一行，执行一行，但`js`并非上来就进入编译环节，它在编译之前存在预编译过程。

`js`中预编译一般有两种：全局的预编译和函数的预编译，分别发生在`script`内代码执行前和函数的执行前。

## 函数预编译
首先来看一个例子：
```js
function test(a) {
    console.log(a);       
    var a = 123;
    console.log(a);       
    function a() {}
    console.log(a);       
    var b = function() {}
    console.log(b);       
    function d() {}
}
test(1)
```
就以上述例子中的`a`为例，有形参`a`，变量`a`，函数`a`，那`test`函数执行时，此时的`a`到底是什么呢？

输出结果：
```js
ƒ a() {}
123
123
ƒ () {}
```

要想弄明白最终的输出结果，就不得不好好学习一下预编译的详细过程。

在预编译学习中，经常听到一句话：**函数声明整体提升，变量声明提升**。

这句话可以解决大多数场景下的预编译面试题，但光凭这句话无法吃透预编译的，因此接下来我们来一起捋一下函数预编译的详细流程。

### 函数预编译四部曲
1. 预编译开始，会建立`AO(Activation Object)`对象
2. 找形参和变量声明，使其作为`AO`的属性名，值赋予`undefined`
3. 实参和形参相统一(将实参值赋值给形参)
4. 找函数声明，函数名作为`AO`属性名，值赋予函数体
### 案例分析
学习了函数的预编译过程，就可以回头细细的品味一下上面的案例：
1. 先建立`AO`，并找形参和变量声明，值赋予`undefined`
    ```js
    AO :{
        a: undefined,
        b: undefined
    }
    ```
2. 形参实参相统一
    ```js
    AO :{
        a: 1,
        b: undefined
    }
    ```
3. 找函数声明，值赋予函数体
    ```js
    AO :{
        a: function a() {},
        b: undefined,
        d: function d() {}
    }
    ```
4. 预编译过程结束，挨着分析一下`console`的打印结果：
    ```js
    第一个console.log(a); // 此时AO中a的值为function a() {} 
    执行赋值操作：
        a = 123 // AO中的a值修改为123
        第二个console.log(a) // 123
        第三个console.log(a) // 123
        b = function() {} // AO中的b值修改为function b(){}
        console.log(b) // function b(){}
    ```

## 全局预编译
全局中不存在形参和实参，所以全局预编译只需处理变量声明和函数声明。
### 全局预编译三部曲
1. 生成`GO(Global Object)`
2. 找变量声明，由于全局变量默认挂载在`window`之上，若`window`当前已存在当前属性，忽略当前操作，若没有，变量作为属性名，值赋予`undefined`。
3. 找函数声明，函数与变量类似，先去`window`上查看，不存在，函数作为函数名，值为函数体
### 案例分析
将函数预编译案例稍微修改，如下：
    
```js
// test部分的结果与函数部分相同，再次只分析全局部分
console.log(a);
var a = 1;
console.log(a);
function test(a) {
    console.log(a);
    var a = 123;
    console.log(a);
    function a() {}
    console.log(a);
    console.log(b);
    var b = function() {}
    console.log(b);
}
test(2);
```
1. 生成`GO`，变量提升，函数提升，得到`GO`如下:
    ```js
    GO/window: {
        a: undefined,
        test: function() {}
    }
    ```
2. 因此第一个`a`的值为`undefined`，随后`a`赋值为`1`，所以第二个`a`的值为`1`

> test中定义了变量a，因此打印的a为自身AO中的值。如果test中没有定义a，就会沿着作用域链，当GO中查找a。

## 注意事项
**1. 当函数中出现同样名称的函数名和变量名，编译器真的会先做变量提升再去函数提升吗？这个问题暂时无法验证，如果有大佬知道，希望可以评论告诉一下，谢谢**

**2. let/const声明的变量应当同样进行了变量提升，只不过它与var声明的变量做了一定的区分**

## 常见面试题分析
### 题目一

```js
function test() {
console.log(b);
if (a) {
    var b = 100;
}
console.log(b);
c = 234;
console.log(c);
}
var a;
test();
a = 10;
console.log(c);
```
1. 生成`GO`
    ```js
    GO: {
        a: undefined,
        test: function test() {},
        c: undefined
    }
    ```
    > JavaScript中变量如果未经声明就赋值，会默认将变量挂载到window对象上，这也就是所谓的`imply global`。`c`就是`imply global`。
2. `test`执行，生成`test`的`AO`
    ```js
    // AO还会存储[[scope]]属性，存储AO的作用域链

    AO: {
        b: undefined,
        [[scope]]: [TestAO, GO]
    }
    ```
    > 有同学会问，`if(a)`为false，if内部不会执行，那test的AO中为什么还会有b啊？预编译并不是执行，它只不过把变量、函数等进行提升，只有在执行时，才会设计代码逻辑的判断。
3. 分析`test`函数执行
    ```js
    console.log(b) // AO中b为undefined
    if (a) // AO中无a，沿[[scope]]找到GO中的a，值为undefined
    b = 100; // 不执行
    console.log(b) // undefined
    c = 234; // AO中没有c属性，沿[[scope]]找到GO中的c修改为234
    console.log(c) // 打印的是GO中的c，234
    // test执行完毕，AO销毁
    ```
4. 分析剩余代码：
   ```js
   a = 10; // GO中的a修改为10
   console.log(c) // GO中c值为234，234
   ```

### 题目二
```js
var foo = 1;
function bar() {
    console.log(foo);  
    if (!foo) {
        var foo = 10;
    }
    console.log(foo); 
}

bar();
```

#### 答案
```js
undefined
10
```

### 题目三
```js
var a = 1;
function b() {
    console.log(a);  
    a = 10;
    return;
    function a() { }
}
b();
console.log(a); 
```
**return; 与上面案例的if一样，预编译环节不会处理**

#### 答案
```js
function a() { }
1
```

### 题目四
```js
console.log(foo); 
var foo = "A";
console.log(foo)  
var foo = function () {
    console.log("B");
}
console.log(foo); 
foo(); 
function foo(){
    console.log("C");
}
console.log(foo)  
foo(); 
```

#### 答案
```js
ƒ foo(){
    console.log("C");
}
A
ƒ () {
    console.log("B");
}
B
ƒ () {
    console.log("B");
}
B
```

### 题目五
```js
var foo = 1;


function bar(a) {
    var a1 = a;
    var a = foo;
    function a() {
        console.log(a); 
    }
    a1();
}

bar(3);
```

#### 答案
```1```

## 总结
预编译的题目多数情况下就可以采用以下原则：
   + 函数声明，**整体**提升
   + 变量声明，**声明**提升

如果遇到复杂的情况，就要按照全局预编译的三部曲和函数预编译的四部曲一步一步推导。

**最后，在预编译时一定要注意**：`return、if`等代码逻辑判断是在执行时候做的，预编译不管这些，预编译只管变量、形参、函数等。