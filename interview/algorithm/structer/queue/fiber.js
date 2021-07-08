// 斐波那契数列（Fibonacci sequence），又称黄金分割数列，
// 因数学家莱昂纳多·斐波那契（Leonardoda Fibonacci）以兔子繁殖为例子而引入，故又称为“兔子数列”，
// 指的是这样一个数列：0、1、1、2、3、5、8、13、21、34、……在数学上，
// 斐波那契数列以如下被以递推的方法定义：F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)（n ≥ 2，n ∈ N*）。

function fiboSequence(num) {
  if (num < 2) return num;

  const queue = [];

  queue.push(0);

  queue.push(1);

  for (let i = 2; i < num; i++) {
    const len = queue.length;

    queue.push(queue[len - 2] + queue[len - 1]);
  }

  return queue;
}
