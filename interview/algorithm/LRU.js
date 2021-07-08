// LRU 是 Least Recently Used 的缩写，即最近最少使用，是一种常用的页面置换算法，
// 将最近最久未使用的页面予以淘汰。
// 核心的思想就是“如果数据最近被访问，那么将来被访问的几率也就更高”。

// 选择合适的数据结构。
// 哈希表：O(1) 级别的时间复杂度，适合数据查找。但是元素无序，没办法判断元素访问的先后顺序。
// 数组：元素的插入和删除元素都是 O(n)。
// 单向链表：删除节点需要访问前驱节点，需要花 O(n)从前遍历查找。
// 双向链表：结点有前驱指针，删除和移动节点都是指针的变动，都是 O(1)。

// 结论：哈希表 + 双向链表。
// 使用哈希表的目的就是快速访问到存储在双向链表中的数据，存储双向链表的 key 和节点的引用；
// 使用双向链表的目的就是快速进行节点位置的移动和删除，存储 key 和对应的数据。
// 设置虚拟节点，方便快速的访问头尾节点。初始时没有添加真实的节点，所以需要将虚拟节点的前驱指针和后继指针指向自己。
// get 方法的实现。
// put 方法的实现。
// 写入新数据，需要先检查一下当前节点数量；如果节点数量达到容量的最大值，则需要先删除链表尾部的节点，然后创建新的节点，添加到链表头部，并写入到哈希表。
// 写入已存在的数据，则更新数据值，移动节点位置到链表头部。

function Node(key, value) {
  this.key = key;

  this.value = value;

  this.prev = null;

  this.next = null;
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity; // 容量

    this.hash = {}; // 哈希表

    this.count = 0; // 当前节点数量

    this.virtualNode = new Node(); // 虚拟结点

    // 相互引用

    this.virtualNode.next = this.virtualNode;

    this.virtualNode.prev = this.virtualNode;
  }

  get(key) {
    const node = this.hash[key];

    if (node) {
      this.moveToHead(node);

      return node.value;
    }
  }

  put(key, value) {
    const node = this.hash[key];

    if (node) {
      node.value = value;

      this.moveToHead(node);
    } else {
      if (this.count === this.capacity) {
        this.removeLRUItem();
      }

      const newNode = new Node(key, value);

      this.hash[key] = newNode;

      this.addToHead(newNode);

      this.count++;
    }
  }

  remove(key) {
    const node = this.hash[key];

    if (node) {
      this.removeFromList(node);

      Reflect.deleteProperty(this.hash, key);

      this.count--;
    }
  }

  isEmpty() {
    return this.count === 0;
  }

  moveToHead(node) {
    this.removeFromList(node);

    this.addToHead(node);
  }

  removeFromList(node) {
    const prevNode = node.prev;

    const nextNode = node.next;

    prevNode.next = nextNode;

    nextNode.prev = prevNode;

    node.prev = null;

    node.next = null;
  }

  addToHead(node) {
    const nextNode = this.virtualNode.next;

    this.virtualNode.next = node;

    nextNode.prev = node;

    node.prev = this.virtualNode;

    node.next = nextNode;
  }

  removeLRUItem() {
    const tailNode = this.virtualNode.prev;

    this.remove(tailNode.key);
  }
}

const cache = new LRUCache(5);

console.log(cache.isEmpty());

cache.put("A", "A");

cache.put("B", "B");

cache.put("C", "C");

cache.put("D", "D");

cache.put("E", "E");

console.log(cache.get("A"));

cache.put("F", "F");

console.log(cache.get("B"));

console.log(cache.isEmpty());

cache.remove("E");

cache.remove("F");

cache.remove("A");

cache.remove("C");

cache.remove("D");

console.log(cache.isEmpty());

console.log(cache);

// 历史浏览记录。
// 缓存淘汰策略。