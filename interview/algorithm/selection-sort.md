## 选择排序

#### js 实现
```js
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

```