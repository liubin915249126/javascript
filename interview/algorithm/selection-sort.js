// 选择排序
// 平均复杂度：o(n^2)    空间复杂度：o(1)    稳定性：不稳定

// 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置；
// 然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
// 以此类推，直到所有元素均排序完毕。


   function selectionSort(arr){
    if( !arr || !arr instanceof Array || arr.length <= 0 ){
        return;
    }
    let len = arr.length;
    let currentMinIndex,currentMin;
    for(let i = 0 ; i < len ; i++){
        currentMin = arr[i];
        currentMinIndex = i;
        for( let j = i ; j < len ; j++){
            if( arr[j] < currentMin ){
                currentMin = arr[j];
                currentMinIndex = j;
            }
        }
        if(currentMinIndex !== i ){
            swap(arr,i,currentMinIndex);
        }
        
    }

    return arr;
}

console.log( selectionSort([999,231,324,552,35,1]) );