## fiber

React 中的 Concurrent Mode 是指在 Reconciler 中处理 long task 时，
可以不阻塞浏览器中的其他进程，并且 React 中的 render 任务 具有各自的优先级，
任务可以通过过时间分片 + 优先级调度的方式在执行和暂停之间切换状态。

作者：Moment
链接：https://juejin.cn/post/7258881840823844920

#### Reconciler 调和

#### Scheduler 调度
