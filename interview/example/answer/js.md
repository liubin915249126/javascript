## native-js

#### new 一个构造函数，如果函数返回 return {} 、 return null ， return 1 ， return true 会发生什么情况？
#### 如何判断一个对象是不是空对象？
object.keys(obj).length === 0
#### <script src=’xxx’ ’xxx’/>外部js文件先加载还是onload先执行，为什么？
#### 如果一个构造函数，bind了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？
不会继承，因为根据 this 绑定四大规则，new 绑定的优先级高于 bind 显示绑定，通过 new 进行构造函数调用时，会创建一个新对象，这个新对象会代替 bind 的对象绑定，作为此函数的 this，并且在此函数没有返回对象的情况下，返回这个新建的对象
### js 的内存泄漏
[gc](../../ES5/gc.md)
