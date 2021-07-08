class Queue {
  constructor() {
    // 存储数据

    this.items = [];
  }

  enqueue(item) {
    // 入队

    this.items.push(item);
  }

  dequeue() {
    // 出队

    return this.items.shift();
  }

  head() {
    // 获取队首的元素

    return this.items[0];
  }

  tail() {
    // 获取队尾的元素

    return this.items[this.items.length - 1];
  }

  clear() {
    // 清空队列

    this.items = [];
  }

  size() {
    // 获取队列的长度

    return this.items.length;
  }

  isEmpty() {
    // 判断队列是否为空

    return this.items.length === 0;
  }
}
