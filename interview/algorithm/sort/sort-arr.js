// [0,1,2,4,5,7,13,15,16] -> [ [ 0, 1, 2 ], [ 4, 5 ], 7, 13, [ 15, 16 ] ]
let arr = [0,1,2,4,5,7,13,15,16]
function sortArr(arr) {
  var len = arr.length,
    j,
    newArr = []
  for (var i = 0; i < len; i++) {
    let temp = [arr[i]];  
    j = i;
    if (arr[i] + 1 === arr[j + 1]) {
      while (arr[j] + 1 === arr[j + 1]) {
        temp.push(arr[j + 1]);
        j++;
      }
      newArr.push(temp);
      i = j;
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function arr2(arr){
   const temp = arr.reduce((prev,cur) => {
      if(cur - (prev[prev.length-1]||0) !==1){
        prev.push('/')
      }
      prev.push(cur)
      return prev;
   }, []) 
   return temp.join(',').split('/').map(item=>item.split(',').filter(Boolean))
}

console.log(111, arr2(arr))