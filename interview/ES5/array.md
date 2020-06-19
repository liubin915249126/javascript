## ES5 array api

#### forEach
用来循环一个数组,不会直接改变原数组。循环过程不能跳出。没有返回值。
[关于forEach不能使用break,return false不能跳出循环](https://github.com/liubin915249126/javascript/blob/master/interview/ES5/forEach.md)
forEach() 遍历的范围在第一次调用 callback 前就会确定。调用 forEach 后添加到数组中的项不会被 callback 访问到。如果已经存在的值被改变，则传递给 callback 的值是 forEach() 遍历到他们那一刻的值。已删除的项不会被遍历到。如果已访问的元素在迭代时被删除了（例如使用 shift()），之后的元素将被跳过
[MDN.js.array.froEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

- 用法:
  ```js
    [1,2,3].forEach((item,index,arr)=>{

    },{a:1})
  ```
- 参数:  
  - 参数一是一个函数，参数如下: 
    - item: 数组的每一项
    - index: 每一项所对应的的索引
    - arr: 数组本身
  - 参数二是一个对象
    - 没传的话，参数一内的 this 指向 windows
    - 否则指向参数二本身
- 实现:
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
  ```

#### map
映射，由一个数组映射为一个新的数组. 不改变原数组
[MDN.js.array.map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- 用法:
  ```js
    const newArr = [1,2,3].map((item,index,arr)=>{
      return item * item
    },{a:1})
    console.log(newArr) // [1,4,9]
  ```
- 参数:  
  - 参数一是一个函数，参数如下: 
    - item: 数组的每一项
    - index: 每一项所对应的的索引
    - arr: 数组本身
  - 参数二是一个对象
    - 没传的话，参数一内的 this 指向 windows
    - 否则指向参数二本身
- 实现
  ```js
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

#### filter
用来过滤数组
filter 不会改变原数组，它返回过滤后的新数组。
[MDN.js.array.filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- 用法:
  ```js
    const newArr = [1,2,3].filter((item,index,arr)=>{
      return item>=2
    },{a:1})
    console.log(newArr) // => [2,3]
  ```
- 参数:  
  - 参数一是一个函数，参数如下: 
    - item: 数组的每一项
    - index: 每一项所对应的的索引
    - arr: 数组本身
  - 参数二是一个对象
    - 没传的话，参数一内的 this 指向 windows
    - 否则指向参数二本身
- 实现
```js
    Array.prototype.myFilter=function (fn,obj) {
        var arr=[];
        for(var i=0;i<this.length;i++){
            if(typeof obj=="undefined"){
                if(fn(this[i],i,this)){
                  arr.push(this[i]);
                }
            }else {
                if(fn.call(obj,this[i],i,this)){
                    arr.push(this[i]);
                };
            }
        }
        return arr;
    };
  ```

#### reduce
对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
[MDN.js.array.indexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- 用法:
  ```js
    const result = [1,2,3].reduce((acc,item,index,arr)=>{
      return acc + item;
    },0)
    console.log(result) //6
  ```
- 参数:  
  - 参数一是一个函数，参数如下: 
    - acc: 累加器
    - item: 数组的每一项
    - index: 每一项所对应的的索引
    - arr: 数组本身
  - 参数二:初始值
- 实现
  ```js
    Array.prototype.myReduce = function(fn, value = 0) {
        for (let i = 0; i < this.length; i++) {
            value = fn(value, this[i], i, this);
        }
        return value;
    };
  ```  
#### indexOf
返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
[MDN.js.array.indexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
- 用法:
  ```js
    const index = [1,2,3].indexOf(2) //1
    const index = [1,2,3,2].indexOf(2,2) //3
  ```
- 参数:
  - 参数一:需要查找的元素
  - 参数二：可选，开始查找的下标。
    如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.
- 实现:
  ```js
    Array.prototype.myIndexOf = function(target,start = 0){
        let startInner = start;
        const len = this.length;
        if(start<0){
            startInner =  start + len
        }
        if(start>len){
          return -1
        }
        for (let i = startInner; i < len; i++) {
            if(this[i]===target) return i // ===判断
        }
        return -1
    }
  ```

#### every,some
every 数组每一项都满足条件才会返回 true
some 数组只要有满足条件的就会返回 true
[MDN.js.array.every](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
[MDN.js.array.some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

- 用法
  ```js
    const flag = [1,2,3].every((item,index,arr)=>item>2) //false
    const flag = [1,2,3].some((item,index,arr)=>item>2) //true
  ```
- 参数:  
  - 参数一是一个函数，参数如下: 
    - item: 数组的每一项
    - index: 每一项所对应的的索引
    - arr: 数组本身
  - 参数二是一个对象
    - 没传的话，参数一内的 this 指向 windows
    - 否则指向参数二本身

- 实现
  ```js
    Array.prototype.myEvery = function (fn,obj){
      const len = this.length;
      if(len===0){
          return true;
      }
      for(let i=0; i<len; i++){
        if(typeof obj=="undefined"){
          if(!fn(this[i],i,this)){
              return false
          }
        }else{
          if(fn.call(obj,this[i],i,this)){
              return false
          }
        }
      }
      return true
  }

    Array.prototype.mySome = function (fn,obj){
      const len = this.length;
      if(len===0){
          return true;
      }
      for(let i=0; i<len; i++){
        if(typeof obj=="undefined"){
          if(fn(this[i],i,this)){
            return true;
          }
        }else{
          if(fn.call(obj,this[i],i,this)){
            return true;
          }
        }
      }
      return false
  }
  ```
  - 原文地址 [ES5 数组 api 使用与实现](https://github.com/liubin915249126/javascript/blob/master/interview/ES5/array.md)

  - 另外我的博客地址 [blog](https://github.com/liubin915249126/javascript)会经常分享 最近的学习内容，项目中遇到的问题及解决方案