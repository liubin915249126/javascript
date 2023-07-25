// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。


// 时间复杂度：O(n)O(n)O(n)，其中 nnn 是链表的长度。需要遍历链表一次。
// 空间复杂度：O(1)O(1)O(1)。
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};

// 时间复杂度：O(n)O(n)O(n)，其中 nnn 是链表的长度。需要对链表的每个节点进行反转操作。

// 空间复杂度：O(n)O(n)O(n)，其中 nnn 是链表的长度。空间复杂度主要取决于递归调用的栈空间，最多为 nnn 层。
var reverseList = function(head) {
    if (head == null || head.next == null) {
        return head;
    }
    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
};


// https//leetcode.cn/problems/reverse-linked-list/