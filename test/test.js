function getFirstIndex (str){
    if (!str) return -1
    const [firstStr, divideStr] = str.split('.')
    if (!divideStr) return -1;
    for (let i = divideStr.length; i--; i > 0){
        if (divideStr[i] != 0){
            // 第一个不为0
            return divideStr.length - 1 - i;
        }
    }
    return -1;
} 

console.log(getFirstIndex('0.0010'))