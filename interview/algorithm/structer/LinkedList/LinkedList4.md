```js
// 定义两个指针P，Q；
// Q是P的next；
// 贯穿的思想是将P后面的一个插入到Head之后，后面的连接起来；
// 前提是P的后一个非空
function reverse(list) {
  var p = list.head,
    q = null
  while (p.next !== null) {
    q = p.next
    p.next = q.next
    q.next = list.head.next
    list.head.next = q
  }
  return list
}
```

#### 对称交换

// 特判如果链表为空或者链表只有一个节点，那么直接返回原链表即可
// 定义一个 pre 指针指向链表头节点
// 定义一个 next 初始化指向头节点，然后让 next 指针向后走，在向后走的过程中，将下一个节点的 pre 属性指向前一个节点，直到走到链表末尾
// 交换 head 指针和 next 指针的值，并让 head 指针向后走，next 指针向前走，再次交换两个节点的值，直到两个指针相遇
// 返回头节点即可
![示意图](https://github.com/liubin915249126/javascript/blob/master/assets/interview/reverseLinkedList1.webp)

```js
var reverseList = function (head) {
  // 特判
  if (head === null || head.next === null) return head
  let pre = head,
    next = head
  // 让next走到链表末尾并记录节点的pre属性指向前一个节点
  while (next.next) {
    next.next.pre = next
    next = next.next
  }
  // 当两个指针不想交的时候，交换两个指针的值，并让两个指针向中间走
  while (pre !== next && next.next !== pre) {
    const nextVal = next.val
    next.val = pre.val
    pre.val = nextVal
    pre = pre.next
    next = next.pre
  }
  return head
}
```

#### 转为双向链表

// 特判如果链表为空或者链表只有一个节点，那么直接返回原链表即可
// 定义一个 pre 指针指向链表头节点
// 定义一个 next 指针初始化指向 head.next,当 next 指针不为空的时候，将 next 的 pre 属性指向 pre,然后 pre 指针、next 指针一起向后走
// 当 next 指针指向 null 的时候，pre 指针指向链表最后一个节点，更新 next = pre
// 当 next.pre 不为空时，修改 next.next 指针指向 next.pre,达到反转链表的目的
// 当 next.pre 为空时， next 指向头节点，将头节点的 next 指向 null
// 最后 pre 指针指向的之前链表的最后一个节点即为反转后链表的头节点
![示意图](https://github.com/liubin915249126/javascript/blob/master/assets/interview/reverseLinkedList2.webp)

```js
var reverseList = function (head) {
  // 特判
  if (head === null || head.next === null) return head
  let pre = head,
    next = head.next
  // 转为双向链表
  while (next) {
    next.pre = pre
    pre = pre.next
    next = next.next
  }
  // 从后向前修改next指针，完成链表反转
  next = pre
  while (next.pre) {
    next.next = next.pre
    next = next.next
  }
  // 将头节点的next指向null
  next.next = null
  // 之前链表的尾节点即为反转后链表的头节点
  return pre
}
```

#### 双向链表还可以做进一步优化，做到一次遍历即可完成链表反转

解题思路如下：

特判如果链表为空或者链表只有一个节点，那么直接返回原链表即可
定义 pre 指针指向头节点， next 指针指向 head.next
将头节点的 next 修改为 null
将 next 的 next 指针指向 pre,然后 pre 和 next 一起向后走一步，直到 next 指向链表最后一个节点，此时，该节点即位反转后链表的头节点，返回该节点即可
![示意图](https://github.com/liubin915249126/javascript/blob/master/assets/interview/reverseLinkedList3.webp)

```js
var reverseList = function (head) {
  // 特判
  if (head === null || head.next === null) return head
  // 定义两个指针遍历链表
  let pre = head,
    next = head.next
  // 将头节点的next指向null 因为头节点是反转后链表的尾节点
  head.next = null
  // 当next不为空的时候，让下一个节点的next指针指向前一个节点
  while (next) {
    const next_next = next.next
    next.next = pre
    pre = next
    next = next_next
  }
  // 返回原始链表的尾节点，即为反转后链表的头节点
  return pre
}
```

[referer](https://juejin.cn/post/7034558169913229342)
