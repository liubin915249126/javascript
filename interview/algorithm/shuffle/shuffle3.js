// 随机的结果要能够覆盖所有的情况，并且随机结果出现的概率相等；
// 洗 54 张牌，随机结果需覆盖所有情况就应该是 54 张牌的排列方式，A5454，即 54!（54 的阶层）种随机结果。
// 两两对换：
// 洗 1 次，会得到 n 种可能的结果；
// 洗 2 次，会得到 n*(n-1) 种结果；
// 洗 3 次，会得到 n*(n-1)*(n-2) 种结果；
// ......
// 洗 n 次之后，我们才满足了：随机结果【覆盖所有情况】，并且所有随机结果【出现概率相等】。
// 所以，必须洗 54 次，才能达到目的。

// 生成 nums：
let nums=[]
for(let i=1;i<=54;i++){
    nums.push(i)
}

// 黄金洗牌算法：
const shuffle = function(nums) {

    // 高手都用 slice(0) 复制数组
    const radomNums = nums.slice(0);
    let n = radomNums.length;

    // 产生的结果有 n! 种可能
    for (let i = 0; i < n; i++) {

        // 从 i 到 n-1 随机选一个
        const rand = randOne(i, n - 1); 

        // 交换nums数组i和rand下标的两个元素
        [ radomNums[i], radomNums[rand] ] = [ radomNums[rand], radomNums[i] ];
    }

    return radomNums;
};

// 获取闭区间 [n, m] 内的一个随机整数
const randOne= function(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
};


console.log(shuffle(nums))
// (54) [39, 40, 11, 35, 1, 47, 33, 9, 44, 32, 31, 45, 41, 4, 51, 42, 8, 10, 16, 14, 18, 17, 13, 6, 34, 53, 48, 5, 15, 22, 38, 37, 49, 43, 3, 20, 26, 52, 30, 19, 7, 50, 12, 21, 46, 36, 23, 27, 28, 25, 2, 29, 24, 54]
