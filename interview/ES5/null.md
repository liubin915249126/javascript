## null 与 undefined 的区别

+ null表示一个"无"的对象，也就是该处不应该有值；而undefined表示未定义。
+ 在转换为数字时结果不同，Number(null)为0，而undefined为NaN。

### 使用场景上：
1. null：
   + 作为函数的参数，表示该函数的参数不是对象
   + 作为对象原型链的终点

2. undefined:

   + 变量声明未赋值，等于undefined
   + 调用函数时，未提供参数值，该参数等于undefined
   + 对象没有赋值属性，该属性的值为undefined
   + 函数没有返回值时，默认返回undefined