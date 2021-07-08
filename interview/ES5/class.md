## es6 class es5 prototype

- class类必须new调用，不能直接执行。
- class类不存在变量提升
- class类无法遍历它实例原型链上的属性和方法
- new.target属性
  它会返回new命令作用于的那个构造函数。如果不是通过new调用或Reflect.construct()调用的，new.target会返回undefined
- class类有static静态方法  