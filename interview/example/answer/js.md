## native-js

#### new 一个构造函数，如果函数返回 return {} 、 return null ， return 1 ， return true 会发生什么情况？
#### 如何判断一个对象是不是空对象？
object.keys(obj).length === 0
#### <script src=’xxx’ ’xxx’/>外部js文件先加载还是onload先执行，为什么？
onload
- defer 特性告诉浏览器不要等待脚本。相反，浏览器将继续处理 HTML，构建 DOM。脚本会“在后台”下载，然后等 DOM 构建完成后，脚本才会执行。
    具有 defer 特性的脚本不会阻塞页面。
    具有 defer 特性的脚本总是要等到 DOM 解析完毕，但在 DOMContentLoaded 事件之前执行。
    具有 defer 特性的脚本保持其相对顺序，就像常规脚本一样。
    defer 特性仅适用于外部脚本
- 浏览器不会因 async 脚本而阻塞（与 defer 类似）。
    其他脚本不会等待 async 脚本加载完成，同样，async 脚本也不会等待其他脚本。
    DOMContentLoaded 和异步脚本不会彼此等待：
    DOMContentLoaded 可能会发生在异步脚本之前（如果异步脚本在页面完成后才加载完成）
    DOMContentLoaded 也可能发生在异步脚本之后（如果异步脚本很短，或者是从 HTTP 缓存中加载的）    
#### 如果一个构造函数，bind了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？
不会继承，因为根据 this 绑定四大规则，new 绑定的优先级高于 bind 显示绑定，
通过 new 进行构造函数调用时，会创建一个新对象，这个新对象会代替 bind 的对象绑定，
作为此函数的 this，并且在此函数没有返回对象的情况下，返回这个新建的对象
### js 的内存泄漏
[gc](../../ES5/gc.md)

#### WeakMap 、 WeakSet、 map、 set 的区别跟使用场景。
