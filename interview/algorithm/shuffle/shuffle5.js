// 将数组一分为二，再穿插合并，再不断重复这样的操作；

// 生成 nums：
let nums=[]
for(let i=1;i<=54;i++){
    nums.push(i)
}
// 钻石洗牌算法：
const RShuffle = function (arr) {
    let radomNums = nums.slice(0);
    for(let i = 0;i < 7;i++){
        let randIndex = randOneIndex()
        let arr1 = radomNums.slice(0,randIndex)
        let arr2 = radomNums.slice(randIndex,55)
        radomNums = aryJoinAry(arr1 ,arr2)
    }
    return radomNums;
}

// 两个数组穿插合并
const aryJoinAry = function (ary,ary2) {
    var itemAry=[];
    var minLength;
    //先拿到两个数组中长度较短的那个数组的长度
    if(ary.length>ary2.length){
        minLength=ary2.length;
    }
    else{
        minLength=ary.length;
    }
    //将两个数组中较长的数组记录下来
    var longAry=arguments[0].length>arguments[1].length?arguments[0]:arguments[1];
    //循环范围为较短的那个数组的长度
    for (var i = 0; i < minLength; i++) {
        //将数组放入临时数组中
        itemAry.push(ary[i]);
        itemAry.push(ary2[i])
    }
    //itemAry和多余的新数组拼接起来并返回。
    return itemAry.concat(longAry.slice(minLength));
}


// 在 0 至 53 之间任意取一整数作数组下标；
const randOneIndex= function() {
    return Math.floor(Math.random() * 54);
}

console.log(RShuffle(nums))
// (54) [1, 4, 19, 2, 38, 51, 6, 37, 15, 9, 45, 43, 7, 52, 16, 21, 39, 53, 24, 26, 44, 54, 40, 5, 32, 10, 46, 22, 33, 27, 3, 11, 18, 28, 47, 12, 17, 29, 8, 13, 41, 30, 48, 14, 34, 31, 20, 23, 49, 35, 25, 42, 50, 36]
