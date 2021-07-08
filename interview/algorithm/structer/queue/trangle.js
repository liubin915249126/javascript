// 思路分析：

// 通过观察发现，三角中的每一行数据都依赖于上一行的数据；
// 我们首先创建队列 queue，用于存储每一行的数据，供下一行数据使用；
// 然后初始化第一行的数据 1 入队，这里需要两个 for 循环嵌套，外层的 for 循环决定最终打印的总行数，内层的 for 循环生成每行的数据；
// 在生成当前行的数据时，将队列中的数据源依次出队，然后将新生成的数据入队；并记录当前出队的数据，供生成新数据使用

function printYangHui(num) {
  const queue = [];

  // 存储第一行数据

  queue.push(1);

  for (let i = 1; i <= num; i++) {
    let rowArr = [];

    // 填充空格

    for (let j = 0; j < Math.floor((num - i) / 2); j++) {
      rowArr.push("");
    }

    let prev = 0;

    for (let j = 0; j < i; j++) {
      const num = queue.shift();

      queue.push(prev + num);

      rowArr.push(num);

      prev = num;
    }

    queue.push(1);

    console.log(rowArr.join(" "));
  }
}

printYangHui(10);
