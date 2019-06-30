#### let var function
>
  let 的创建过程被提升，初始化没被提升
  var 创建和初始化被提升
  function 创建，初始化和赋值被提升
  ```js
       console.log(111,a) // function a(){console.log('a1')}
       a() // a1
       var a = function(){
           console.log('a2')
       }
       console.log(222,a) //a1
       function a(){
           console.log('a1')
       }
       console.log(333,a) //a1
  ```
>

#### 作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性
>
  作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突
  ```js
     var outVariable = "我是最外层变量"; //最外层变量
      function outFun() {
        //最外层函数
        var inVariable = "内层变量";
        function innerFun() {
          //内层函数
          console.log(inVariable);
        }
        innerFun();
      }
      console.log(outVariable); //我是最外层变量
      outFun(); //内层变量
      console.log(inVariable); //inVariable is not defined
      innerFun(); //innerFun is not defined
  ```
>

####  作用域范围
>
  全局作用域:
  函数作用域:函数声明体内 不包含块语句（大括号“｛｝”中间的语句）
  块级作用域:块语句（大括号“｛｝”中间的语句）
>