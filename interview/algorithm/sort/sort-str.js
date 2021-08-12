// [0,1,2,4,5,7,13,15,16] -> ["0->2",”4->5“,"7","13","15->16"]
const arr = [0,1,2,4,5,7,13,15,16]
function Arr(arr) {
  var len = arr.length,
    j,
    newArr = [],
    str = "";
  for (var i = 0; i < len; i++) {
    j = i;
    if (arr[i] + 1 === arr[j + 1]) {
      while (arr[j] + 1 === arr[j + 1]) {
        str = "->" + arr[j + 1];
        j++;
      }
      str = arr[i] + str;
      newArr.push(str);
      i = j;
    } else {
      newArr.push(arr[i].toString());
    }
  }
  return newArr;
}
console.log(Arr(arr))