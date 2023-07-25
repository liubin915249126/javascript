#### React 合成事件

React 并不是将 click 事件直接绑定在 dom 上面，而是采用事件冒泡的形式冒泡到 document 上面，然后 React 将事件封装给正式的函数处理运行和处理。

#### 合成事件原因

如果 DOM 上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。
React 为了避免这类 DOM 事件滥用，同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层——SyntheticEvent。

当用户在为 onClick 添加函数时，React 并没有将 Click 时间绑定在 DOM 上面。
而是在 document 处监听所有支持的事件，当事件发生并冒泡至 document 处时，React 将事件内容封装交给中间层 SyntheticEvent（负责所有事件合成）
所以当事件触发的时候，对使用统一的分发函数 dispatchEvent 将指定函数执行。

链接：https://www.jianshu.com/p/8d8f9aa4b033
