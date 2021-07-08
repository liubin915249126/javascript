// 判断两个单链表是否相交并求出相交的第一结点。
// 1. 两个没有环的链表如果是相交于某一结点，如上图所示，这个结点后面都是共有的。
//    所以如果两个链表相交，那么两个链表的尾结点的地址也是一样的。程序实现时分别遍历两个单链表，
//    直到尾结点。判断尾结点地址是否相等即可。时间复杂度为 O(L1+L2)。
// 2. 如何找到第一个相交结点？判断是否相交的时候，记录下两个链表的长度，算出长度差 len，
//    接着先让较长的链表遍历 len 个长度，然后两个链表同时遍历，判断是否相等，如果相等，就是第一个相交的结点。

function intersectNode(head1, head2) {
  if (head1 && head2) {
    // 计算链表的长度

    let len1 = 0,
      p = head1;

    let len2 = 0,
      q = head2;

    while (p.next) {
      len1++;

      p = p.next;
    }

    while (q.next) {
      len2++;

      q = q.next;
    }

    if (p === q) {
      // p指向短链，q指向长链

      let len = 0;

      if (len1 > len2) {
        len = len1 - len2;

        p = head2;

        q = head1;
      } else {
        len = len2 - len1;

        p = head1;

        q = head2;
      }

      while (len > 0) {
        len--;

        q = q.next;
      }

      while (p && q && p !== q) {
        p = p.next;

        q = q.next;
      }

      return p;
    }
  }

  return null;
}

const Node = function (data) {
  this.data = data;

  this.next = null;
};

const nodeA = new Node("A");

const nodeB = new Node("B");

const nodeC = new Node("C");

const node1 = new Node("1");

const node2 = new Node("2");

const node3 = new Node("3");

const nodeD4 = new Node("D4");

const nodeE5 = new Node("E5");

nodeA.next = nodeB;

nodeB.next = nodeC;

nodeC.next = nodeD4;

node1.next = node2;

node2.next = node3;

node3.next = nodeD4;

nodeD4.next = nodeE5;

console.log(intersectNode(nodeA, node1));
