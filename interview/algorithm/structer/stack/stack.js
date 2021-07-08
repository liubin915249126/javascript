// 栈是一种特殊的线性表。它的特点是，只能在表的一端操作。
// 可以操作的端称为栈顶，不可以操作的另一端称为栈底。栈的特性：先进后出。
// 生活中的例子：蒸馒头的笼屉、羽毛球筒。

class Stack {
  constructor() {
    // 存储数据

    this.items = [];
  }

  push(item) {
    // 入栈

    this.items.push(item);
  }

  pop() {
    // 出栈

    return this.items.pop();
  }

  top() {
    // 获取栈顶元素

    return this.items[this.items.length - 1];
  }

  clear() {
    // 清空栈

    this.items = [];
  }

  size() {
    // 获取栈的大小

    return this.items.length;
  }

  isEmpty() {
    // 判断栈是否为空

    return this.items.length === 0;
  }
}
