#### 爬楼梯
```js
   var climbStairs = function (n) { 
        if (n === 1) {    return 1;  }
        if (n === 2) {    return 2;  }
        return climbStairs(n - 1) + climbStairs(n - 2);
    };
```

```js
   let dp = new Map();
   dp.set(1, 1).set(2, 2);
   var climbStairs = function (n) {
        if (dp.has(n)) {
            return dp.get(n);
            }
        let result = climbStairs(n - 1) + climbStairs(n - 2);
        dp.set(n, result);  return result;
    };
```
```js
   var climbStairs = function (n) {
       if (n === 1 || n === 2) {
          return n;
       }
       // 前一个值
       let pre = 2;  
       // 前一个的前一个的值
       let beforePre = 1;
       // 中间变量  
       let temp = null;
       for (let index = 3; index <= n; index++) {
           temp = pre;
           pre = pre + beforePre;
           beforePre = temp;
        }  return pre;
    };
```        
