#### React 是如何把对 Hook 的调用和组件联系起来的？

- 在 mount 阶段，每次执行 useXXXhook,其实就是创建了一个新的 hook 对象，用以保存这个 hook 的值和其他状态；这个对象会被添加到一个链表上。
- workInProgressHook 是一个指针，指向 hook 链表的尾部。
- 在 update 阶段，也是通过.next 遍历链表，得到当前 hook 对象来做更新操作

#### 为什么 Hook 不能写进 if 语句里？

- 由问题 1 得知，因为每一次数组重新渲染是通过遍历 hook 链表来拿到每一个 useXXX 对应的那个 hook 对象的；
- 如何遍历一个链表，就是 curNode=curNode.next；
- 所以，如果前一次渲染所遍历的那个 hook 链表和后一个不同，比如使用 if 之后个数就不一样了，那就不能得到正确的 hook 对象了。

#### 怎么做到多次调用同一个 setState 只有最后一个触发渲染的？

- 在每次 setState 的时候，会创建一个 update 对象用以储存 value，然后把这个 update 对象塞进这个 hook 持有的 queue 链表末尾；
- 在发生渲染时，调用 useState 会拿出 queue 链表遍历来依次调用 reducer 得到新的 value，
- 而这个新的 value 最终的值是这个链表末尾的那个 update 节点的值。
