#### 2.一般代码存储在计算机的哪个设备中？代码在 CPU 中是如何运行的？

答： 1)易失性执行之前，我们的代码主要存储在内存中。 ②CPU 读取内存中的数据并放在寄存器内，将寄存器中的数据写入内存并进行有序的四则运算、相关指令，在此过程中，寄存器主要用于存放计算数据，运算器负责操作寄存器中的数据。

#### 3.什么是指令和指令集？

答： 指令一般是指机器指令，是计算机可完成一个独立计算逻辑所要执行的的命令；一台常规的计算机的所有指令的集合，就是该计算机的指令集。

#### 4.JavaScript 是如何运行的？解释型语言和编译型语言的差异是什么？

答： ①JS 代码->解析成 AST (期间伴随词法分析、语法分析)->生成字节码（V8）->生成机器码（编译器）

#### 5.简单描述一下 Babel 的编译过程？

答：
首先，Babel 的作用是 从一种源码到另一种源码，充当转换编译器的作用，可以简述为
解析（解析 JS 代码）->转换（解析和修改 AST）->重建（将修改后的 AST 转换成另一种 JS 代码）

#### 6.JavaScript 中的数组和函数在内存中是如何存储的？

答：
① 数组，JS 里的数组主要就是 以连续内存形式存储的 FixedArray、以哈希表形式存储的 HashTable。
② 函数，函数属于引用数据类型，存储在堆中，在栈内存中只是存了一个地址来表示对堆内存中的引用。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

#### 7.浏览器和 Node.js 中的事件循环机制有什么区别？

答：
① 浏览器中的事件循环：
macrotasks(宏任务):

- script(整体代码)
- setTimeout
- setInterval
- setImmediate
- I/O
- UI rendering
- event listner
  microtasks(微任务):
- process.nextTick
- Promises
- Object.observe
- MutationObserver

JavaScript 引擎首先从宏任务队列（macrotask queue）中取出第一个任务；执行完毕后，再将微任务（microtask queue）中的所有任务取出，按照顺序分别全部执行（这里包括不仅指开始执行时队列里的微任务），如果在这一步过程中产生新的微任务，也需要执行；然后再从宏任务队列中取下一个，执行完毕后，再次将 microtask queue 中的全部取出，循环往复，直到两个 queue 中的任务都取完。
一次 Eventloop 循环会处理一个宏任务和所有这次循环中产生的微任务。

②NodeJs 中的事件循环：
timersj 阶段：这个阶段执行 timer（setTimeout、setInterval）的回调
I/O callbacks：执行一些系统调用错误，比如网络通信的错误回调
idle,prepare：仅 node 内部使用
poll：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
check：执行 setImmediate() 的回调
close callbacks：执行 socket 的 close 事件回调

③ 区别：
浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。如果是 node11 版本一旦执行一个阶段里的一个宏任务(setTimeout,setInterval 和 setImmediate)就立刻执行微任务队列，这就跟浏览器端运行一致。
setTimeout(()=>{
console.log('timer1')
Promise.resolve().then(function() {
console.log('promise1')
})
}, 0)
setTimeout(()=>{
console.log('timer2')
Promise.resolve().then(function() {
console.log('promise2')
})
}, 0)

// 浏览器环境：
timer1=>promise1=>timer2=>promise2

// node V11 之后
timer1=>promise1=>timer2=>promise2

// node 10 及其之前
timer1=>promise1=>timer2=>promise2 (如果是第二个定时器还未在完成队列中)
timer1=>timer2=>promise1=>promise2 (如果是第二个定时器已经在完成队列中)

#### 8.ES6 Modules 相对于 CommonJS 的优势是什么？

答：

CommonJS 和 ES6 Module 都可以对引入的对象进行赋值，即对对象内部属性的值进行改变；
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。即 ES6 Module 只存只读，不能改变其值，具体点就是指针指向不能变；
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。
import 的接口是 read-only（只读状态），不能修改其变量值。 即不能修改其变量的指针指向，但可以改变变量内部指针指向，可以对 commonJS 对重新赋值（改变指针指向），但是对 ES6 Module 赋值会编译报错。

优势：
CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 Modules 不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

#### 25.Hash 和 History 路由的区别和优缺点？

答：
hash 路由模式的实现主要是基于下面几个特性：

URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制 hash 的切换；
可以通过  a  标签，并设置  href  属性，当用户点击这个标签后，URL  的 hash 值会发生改变；或者使用  JavaScript 来对  loaction.hash  进行赋值，改变 URL 的 hash 值；
我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

history 路由模式的实现主要基于存在下面几个特性：

pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

#### 31.Object.defineProperty 和 ES6 的 Proxy 有什么区别？

答：
Proxy 的优势如下

Proxy 可以直接监听整个对象而非属性。
Proxy 可以直接监听数组的变化。
Proxy 有 13 中拦截方法，如 ownKeys、deleteProperty、has 等是 Object.defineProperty 不具备的。
Proxy 返回的是一个新对象，我们可以只操作新的对象达到目的，而 Object.defineProperty 只能遍历对象属性直接修改;
Proxy 做为新标准将受到浏览器产商重点持续的性能优化,也就是传说中的新标准的性能红利。

Object.defineProperty 的优势如下

兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平。

Object.defineProperty 不足在于：

Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。
Object.defineProperty 不能监听数组。是通过重写数据的那 7 个可以改变数据的方法来对数组进行监听的。
Object.defineProperty 也不能对 es6 新产生的 Map,Set 这些数据结构做出监听。
Object.defineProperty 也不能监听新增和删除操作，通过 Vue.set()和 Vue.delete 来实现响应式的。

#### 61.React Hook 和闭包有什么关联关系？

答：
首先闭包是由函数以及创建该函数的词法环境组合而成。这个词法环境包含了该闭包创建时所能访问的所有局部变量。划重点是闭包创建时的变量值，闭包创建之后即使这些变量值改变了也不会影响到闭包内保存的这个变量。
而 useEffect、useMemo、useCallback 都是自带闭包的。每一次组件的渲染，它们都会捕获当前组件函数上下文中的状态(state, props)，所以每一次这三种 hooks 的执行，反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。
对 Hook 过时闭包的解决办法：

添加依赖项

注意依赖项为空和不传依赖项是两个概念，前者是传了依赖项但它是一个空数组，后者是直接不传这个参数。前者只有依赖项改变时才会执行函数，后者只要组件数据改变了就执行。

以函数的形式更新 state

以函数的形式更新 state，同 react 的 setState 一样，useState Hook 也可以通过函数的形式来修改 state，并且使用当前的 state 值作为函数参数。

使用 useRef

通过 useRef 生成的对象来绑定 state，这样更新 state 的时候就可以不用依赖于该 state，而是直接在该绑定对象上的基础上更新即可。

使用 useReducer

useReducer 可以达到和使用函数形式更新的 useState 一样的效果，也是在更新时在当前的 state 基础上进行操作。

#### 113.你所知道的测试框架有哪些？
答：
Selenium、cypress、Appium 、Requests、Jmeter、Mitmproxy
114.什么是 e2e 测试？有哪些 e2e 的测试框架？
答：
端到端测试；
cypress 、Selenium 、puppeteer、nightwatch

#### 120.什么是正向代理？什么是反向代理？
答：
代理其本质上可以理解为中介。当A和B不方便进行交互时，往往会引入一个中间角色C，那么C便是中介，便是代理。
正向代理服务器通常位于客户端和服务器之间，类似一个跳板机，通过代理服务器可以访问到目标服务器。
正向代理时，通常，客户端发送对目标服务器的请求，代理服务器在中间将请求转发给目标服务器，并将结果返回给客户端。
反向代理与正向代理恰好相反，代理服务位于服务器端。
对客户端来说，反向代理服务器就好像是目标服务器。反向代理服务器接收客户端发来的请求，然后将其分发到内网的服务器，并将内网服务器返回的结果返回给客户端。
整个过程客户端并不会感知到反向代理后面的服务，也不需要客户端做任何设置，只需要把反向代理服务器当成真正的服务器就行。

#### 137.如何在 Mac 的终端中设置一个命令的别名？
答：

打开编辑.bash_profile
配置别名
alias dev="npm run dev"
复制代码
保存之后重新打开terminal或者执行

作者：程序员思语
链接：https://juejin.cn/post/6987070062490288165
