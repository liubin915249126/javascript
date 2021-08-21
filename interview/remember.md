[js](https://github.com/yeyan1996/JavaScript)
[colltion](https://juejin.im/post/5aae076d6fb9a028cc6100a9)
[native-js](https://juejin.cn/user/430664257382462/posts)


#### event loop
1.一开始整段脚本作为第一个宏任务执行
2.执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
3.当前宏任务执行完出队，检查微任务队列，如果有则依次执行，直到微任务队列为空
4.执行浏览器 UI 线程的渲染工作
5.检查是否有Web worker任务，有则执行
6.执行队首新的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空
