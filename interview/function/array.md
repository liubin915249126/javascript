#### reduce

```js
Array.prototype.myReduce = function(f, value = 0) {
  for (let i = 0; i < this.length; i++) {
    value = f(this[i], value);
  }
  return value;
};
```
#### 数组乱序 shuffle
```js
// 著名的Fisher–Yates shuffle 洗牌算法
function shuffle(arr){
    let m = arr.length;
    while(m > 1){
        let index = parseInt(Math.random() * m--);
        [arr[index],arr[m]] = [arr[m],arr[index]];
    }
    return arr;
}
```