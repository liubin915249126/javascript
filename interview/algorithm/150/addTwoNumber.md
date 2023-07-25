```js
const addTwoNumbers = (l1, l2) => {
  let head = null,
    tail = null
  let carry = 0
  while (l1 || l2) {
    const n1 = l1 ? l1.val : 0
    const n2 = l2 ? l2.val : 0
    const sum = n1 + n2 + carry
    if (!head) {
      head = tail = new ListNode(sum % 10)
    } else {
      tail.next = new ListNode(sum % 10)
      tail = tail.next
    }
    carry = Math.floor(sum / 10)
    if (l1) {
      l1 = l1.next
    }
    if (l2) {
      l2 = l2.next
    }
  }
  if (carry > 0) {
    tail.next = new ListNode(carry)
  }
  return head
}
```

作者：力扣官方题解
链接：https://leetcode.cn/problems/add-two-numbers/

- 时间复杂度：O(max⁡(m,n))O(\max(m,n))O(max(m,n))，其中 mmm 和 nnn 分别为两个链表的长度。我们要遍历两个链表的全部位置，而处理每个位置只需要 O(1)O(1)O(1) 的时间。

- 空间复杂度：O(1)O(1)O(1)。注意返回值不计入空间复杂度。
