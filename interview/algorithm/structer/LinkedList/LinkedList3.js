// 请判断一个链表是否为回文链表。
// 从头遍历链表，同时正向和反向拼接每个链表的数据，最后比对正向和反向得到的字符串是否相等。如果相等则是回文链表；否则不是。
const Node = function (data) {
  this.data = data;

  this.next = null;
};

const node1 = new Node("A");

const node2 = new Node("B");

const node3 = new Node("C");

const node4 = new Node("C");

const node5 = new Node("B");

const node6 = new Node("A");

node1.next = node2;

node2.next = node3;

node3.next = node4;

node4.next = node5;

node5.next = node6;

const isPalindrome = (head) => {
  let a = "",
    b = "";

  while (head !== null) {
    a = a + head.data;

    b = head.data + b;

    head = head.next;
  }

  return a === b;
};

console.log(isPalindrome(node1));
