// [2, 10, 3, 4, 5, 11, 10, 11, 20] -> [[2, 3, 4, 5], [10, 11], [20]]

// 得到一个两数之间的随机整数，包括两个数在内
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}
// 随机生成10个整数数组, 排序, 去重
let initArr = Array.from({ length: 10 }, (v) => { return getRandomIntInclusive(0, 99) });
initArr.sort((a,b) => { return a - b });
initArr = [...(new Set(initArr))];

// 放入hash表
let obj = {};
initArr.map((i) => {
    const intNum = Math.floor(i/10);
    if (!obj[intNum]) obj[intNum] = [];
    obj[intNum].push(i);
})

// 输出结果
const resArr = [];
for(let i in obj) {
    resArr.push(obj[i]);
}
console.log(resArr);
