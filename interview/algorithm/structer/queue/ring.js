// 约瑟夫环问题

// 有一个数组存放了 100 个数据 0-99，要求每隔两个数删除一个数，到末尾时再循环至开头继续进行，求最后一个被删除的数字。
// 思路分析

// 创建队列，将 0 到 99 的数字入队；
// 循环队列，依次出列队列中的数字，对当前出队的数字进行计数 index + 1；
// 判断当前出列的 index % 3 是否等于 0，如果不等于 0 则入队；
// 直到队列的长度为 1，退出循环，返回队列中的数字。

function ring(arr) {
  const queue = new Queue();

  arr.forEach((v) => queue.enqueue(v));

  let index = 0;

  while (queue.size() > 1) {
    const item = queue.dequeue();

    if (++index % 3 !== 0) {
      queue.enqueue(item);
    }
  }

  return queue.head();
}
