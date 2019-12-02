## 冒泡排序（Bubble Sort）

#### 原理
比较相邻的元素。如果第一个比第二个大，就交换他们两个。
对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
针对所有的元素重复以上的步骤，除了最后一个。
持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

#### js 实现

```js
    function swap(arr,i,j){
        [arr[i],arr[j]]=[arr[j],arr[i]];
        return arr;
    } 
    function BubbleSort(arr){
    if( !arr || !arr instanceof Array || arr.length <= 0 ){
        return; 
    }
    let len = arr.length;
    for( let i = 0 ; i< len; i++){
        for (let j = 0;j< len - i - 1 ; j++ ){
            if( arr[j + 1] < arr[j] ){
                swap(arr,i,j);
            }
            
        }
    }
    return arr;
}
console.log( BubbleSort([3,992,135,234,231]) );
```