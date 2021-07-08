// 二叉树的实现

function Node(data) {
  this.data = data;

  this.left = null;

  this.right = null;
}

const nodeA = new Node("A");

const nodeB = new Node("B");

const nodeC = new Node("C");

const nodeD = new Node("D");

const nodeE = new Node("E");

const nodeF = new Node("F");

const nodeG = new Node("G");

nodeA.left = nodeB;

nodeA.right = nodeC;

nodeB.left = nodeD;

nodeB.right = nodeE;

nodeC.left = nodeF;

nodeC.right = nodeG;
