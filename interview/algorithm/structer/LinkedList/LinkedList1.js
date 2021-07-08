// 给定一个链表，如何判断链表中是否有环？
// 思路分析：
// 1. 首先创建两个指针 1 和 2，同时指向这个链表的头节点。然后开始一个大循环，在循环体中，让指针 1 每次向下移动一个节点，
//    让指针 2 每次向下移动两个节点，然后比较两个指针指向的节点是否相同。如果相同，则判断出链表有环，如果不同，则继续下一次循环。
// 2. 例如链表 A->B->C->D->B->C->D，两个指针最初都指向节点 A，进入第一轮循环，指针 1 移动到了节点 B，指针 2 移动到了 C。
//    第二轮循环，指针 1 移动到了节点 C，指针 2 移动到了节点 B。第三轮循环，指针 1 移动到了节点 D，指针 2 移动到了节点 D，
//    此时两指针指向同一节点，判断出链表有环。
// 3. 假设从链表头节点到入环点的距离是 D，链表的环长是 S。那么循环会进行 S 次，可以简单理解为 O（N）。
//    除了两个指针以外，没有使用任何额外存储空间，所以空间复杂度是 O（1）。

const Node = function (data) {
  this.data = data;

  this.next = null;
};

const nodeA = new Node("A");

const nodeB = new Node("B");

const nodeC = new Node("C");

const nodeD = new Node("D");

const nodeE = new Node("E");

nodeA.next = nodeB;

nodeB.next = nodeC;

nodeC.next = nodeD;

nodeD.next = nodeE;

nodeE.next = nodeC;

function isCircularLinkedList(head) {
  if (head === null || head.next === null) {
    return false;
  }

  let point1 = head;

  let point2 = head;

  do {
    point1 = point1.next;

    point2 = point2.next && point2.next.next;
  } while (point1 && point2 && point1 !== point2);

  if (point1 === point2) {
    return true;
  }

  return false;
}

console.log(isCircularLinkedList(nodeA));
