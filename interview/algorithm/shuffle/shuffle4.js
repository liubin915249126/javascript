// 随机生成 1 至 54 之间的整数，将它和数组的最后一位替换；
// 然后再在 1 至 53 之间随机生成一位整数，将它和数组的倒数第二位替换；
// 然后再 1 至 52 之间随机生成一位整数，将它和数组的倒数第三位替换；
// ......
// 直至在 1 至 1 之间随机生成一位整数（即 1），将它和数组第 1 位替换（即替换自身）；
// 这样做，时间复杂度为 O(n)，且任意一张牌出现的概率都是 1/52，满足：随机结果覆盖所有情况，随机结果出现概率相等！
// 数学证明：一张牌被放到第 i 个位置的机率为 P，则 P 会等于前 i-1 个位置都未选到这张牌且第 i 个位置选到这张牌。

// 生成 nums：
let nums=[]
for(let i=1;i<=54;i++){
    nums.push(i)
}

// 铂金洗牌算法：
const FYShuffle = function (nums) {

    const radomNums = nums.slice(0);
    let len = radomNums.length;
    
    while (len > 1) {
        let rand = Math.floor(Math.random() * len);
        len--;
        let temp = radomNums[len];
        radomNums[len] = radomNums[rand];
        radomNums[rand] = temp;
    }

    return radomNums;
}

console.log(FYShuffle(nums))
// (54) [47, 17, 33, 13, 37, 26, 20, 39, 45, 44, 25, 40, 49, 7, 36, 38, 6, 15, 31, 18, 52, 46, 28, 11, 43, 1, 22, 19, 53, 9, 14, 27, 35, 8, 51, 42, 50, 2, 23, 5, 30, 54, 4, 21, 29, 16, 10, 24, 48, 34, 32, 12, 41, 3]
