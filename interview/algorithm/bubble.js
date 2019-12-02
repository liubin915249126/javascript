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