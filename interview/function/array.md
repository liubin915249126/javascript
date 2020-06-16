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
#### forEach Map
```js
    Array.prototype.myForEach=function (fn,obj) {
        for(var i=0;i<this.length;i++){
            if(typeof obj=="undefined"){
                //obj没有传
                fn(this[i],i,this);
            }else {
                fn.call(obj,this[i],i,this);
            }
        }
    };
    Array.prototype.myMap=function (fn,obj) {
        var arr=[];
        for(var i=0;i<this.length;i++){
            if(typeof obj=="undefined"){
                arr.push(fn(this[i],i,this));
            }else {
                arr.push(fn.call(obj,this[i],i,this));
            }
        }
        return arr;
    };
```