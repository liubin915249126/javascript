// 目标：将 54 张牌打乱后，抽到区间 [1,10] 的概率为 40%，抽到区间 [11,20] 的概率为 20%，
// 抽到区间 [21,30] 的概率为 20%，抽到区间 [31,40] 的概率为 15%，剩下的抽到 [41,54] 的概率为 5%；

// radomNums = [21,43,12,3,...,8,6,33] // 共 54 项
// probabilityNums = [0.02,0.015,...,0.04,0.04,0.15] // 共 54 项，和为 1


function randomProbability(arr1, arr2) {
    var sum = 0,
    factor = 0,
    random = Math.random();
    for(let i = arr2.length - 1; i >= 0; i--) {
      sum += arr2[i]; // 统计概率总和
    };
    random *= sum; // 生成概率随机数
    for(let i = arr2.length - 1; i >= 0; i--) {
      factor += arr2[i];
      if(random <= factor) return arr1[i]; // 如果在当前的概率范围内，得到的就是当前概率，返回输出
    };
    return null;
}

const yourCard = randomProbability(radomNums, probabilityNums)

console.log(yourCard)

