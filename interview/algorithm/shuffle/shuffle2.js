// 将牌随机分成两堆，让它们交换，然后再随机分成两堆，再让它们交换，然后再随机分出两堆......这样重复洗十几、二十次后，完成洗牌。


// 生成 nums：
let nums=[]
for(let i=1;i<=54;i++){
    nums.push(i)
}

// 白银洗牌算法：
const shuffle = function(nums){
    let radomNums = JSON.parse(JSON.stringify(nums))
    for(let i = 0;i < 20;i++){
        let randIndex1 = randOneIndex()
        let randIndex2 = randOneIndex()

        if(randIndex2 < randIndex1){ // 若 rand2<rand1，二者替换
            randIndex1 = randIndex1 + randIndex2
            randIndex2 = randIndex1 - randIndex2 
            randIndex1 = randIndex1 - randIndex2
        }

        let radomBlock = radomNums.slice(randIndex1,randIndex2 + 1)
        radomNums = radomNums.slice(0,randIndex1).concat(radomNums.slice(randIndex2,53)).concat(radomBlock)
    }
    return radomNums
}

// 在 0 至 53 之间任意取一整数作数组下标；
const randOneIndex= function() {
    return Math.floor(Math.random() * 54);
}

console.log(shuffle(nums))
// (54) [30, 9, 7, 28, 29, 39, 45, 46, 47, 48, 49, 50, 51, 52, 24, 25, 26, 27, 40, 42, 43, 44, 38, 31, 14, 8, 41, 22, 32, 19, 20, 1, 2, 10, 11, 12, 13, 16, 15, 53, 23, 3, 4, 5, 6, 21, 17, 18, 33, 34, 35, 36, 37, 42]
