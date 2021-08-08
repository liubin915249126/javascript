// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

function zeroMove(array) {
    let len = array.length;
    let j = 0;
    for(let i=0;i<len-j;i++){
        if(array[i]===0){
            array.push(0);
            array.splice(i,1);
            i --;
            j ++;
        }
    }
    return array;
}