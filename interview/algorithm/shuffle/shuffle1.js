// 在 1 至 54 之前随机生成一个整数，然后把它放到新数组里，
// 然后再随机生成一个整数，如果和之前生成的没重复，直接放入新数组，
// 如果和之前重复了，那再随机生成一个......
// 这样直至数组中所有数字都被抽取放到新数组，最终得解！

// 生成 nums：
let nums=[]
for(let i=1;i<=54;i++){
    nums.push(i)
}

// 青铜洗牌算法：
let count = 0 
const shuffle = function(nums) {
    let radomNums = []
    while (radomNums.length < nums.length) {
        count++; // count 计数洗牌次数
        let rand = randOne()
        if(radomNums.includes(rand)){ // 随机数重复
            rand = randOne() // 再次生成
        }else{
            radomNums.push(rand)
        }
    }
    return radomNums
}

// 在 1 至 54 之间任意取一整数；
const randOne= function() {
    return Math.floor(Math.random() * 54) + 1;
}

console.log(shuffle(nums))
console.log(count)
// (54) [22, 48, 13, 23, 15, 12, 18, 50, 5, 28, 27, 52, 46, 16, 40, 6, 33, 9, 41, 30, 54, 14, 36, 53, 17, 2, 11, 37, 42, 3, 8, 21, 25, 20, 34, 32, 35, 4, 43, 26, 38, 24, 10, 45, 31, 49, 44, 19, 51, 7, 1, 39, 47, 29]
// 271
