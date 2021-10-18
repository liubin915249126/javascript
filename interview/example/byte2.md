Vue 的父子组件传值有哪些方法？详细谈谈。

手写 EventEmitter，实现 on/emit/off 方法。

Vue 的响应式原理。

既然刚刚聊到响应式原理，那么下面的代码中，一开始 foo=true，接着 foo=false，这之后再修改 a=123，页面会不会重新 render？

```js
<template>
    <div v-if=foo>
    {{ a }}
    </div>
    <div v-else>
    {{ b }}
    </div>
</tempate>

```
了解预检请求preflight吗？展开谈谈。

webpack的工作流程了解吗？

刚刚提到了plugin，现在有两个plugin，plugin1可以派发事件让plugin2监听吗？

算法题：请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。例如，输入abcabcbb，那么无重复字符的最长子串是 abc，长度为 3。

介绍一下https。


知道https中的http请求怎么处理吗？


了解http2的特性吗？


刚刚提到http2有服务器推送功能。http2与websocet都有服务器推送的功能，那么websocket会被http2取代吗？为什么？


使用Array的reduce方法实现map。
```js
Array.prototype.myMap(fn,_this) {
   let result = [];
   this.reduce((prev,cur,index,arr) => {
       result[index] = fn.call(_this,arr[index],index,arr);
   },0)
   return result;
}

//arr.map((item,index,arr) => fn(item),_this);
//arr.reduce((prev,cur,index,arr) => {},start);
```
给定一个二进制数组, 找到含有相同数量的0和1的最长连续子数组的长度，例如[0,0,0,1,1,0,1,0,0]=>6
```js
//前缀和
function test(arr) {
    let len = arr.length;
    let map = new Map();
    let count = 0;
    let res = 0;
    //[0] -> 0
    for(let i=0; i<len; i++) {
        count += arr[i] == 1 ? 1 : -1;
        if(map.has(count)) {
            res = Math.max(res,i-map.get(count));
        }else {
            map.set(count,i);
        }
     }
    return res;
 }
console.log(test([0, 0, 0,1, 1, 0,1, 0, 0]));
```
算法题：给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
```js
var maxSubArray = function(nums) {
    // let res = nums[0];
    // let sum = 0;
    // for(let num of nums) {
    //     if(sum > 0) {
    //         sum += num;
    //     } else {
    //         sum = num;
    //     }
    //     res = Math.max(res,sum);
    // }
    // return res;
    // let res = nums[0];
    // let tep = 0;
    // nums.forEach(num => {
    //     tep = Math.max(num+tep,num);
    //     res = Math.max(res,tep);
    // })
    // return res;

    let n = nums.length;
    if(n == 0) return 0;
    let dp = new Array(n);
    dp[0] = nums[0];
    for(let i = 1; i < n; i++) {
        dp[i] = Math.max(nums[i], dp[i-1]+nums[i]);
    }
    let res = dp[0];
    for(let i = 0; i < dp.length; i++) {
        res = Math.max(res,dp[i]);
    }
    return res;
};

```

[referer](https://juejin.cn/post/7017655711291146253)