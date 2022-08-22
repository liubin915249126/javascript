####
请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。例如，输入abcabcbb，那么无重复字符的最长子串是 abc，长度为 3。
```js
/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
     let l = 0;     //子串左边界位置
     let res = 0;   //最长连续无重复子串长
     const map = new Map();
     for(let r = 0; r < s.length ; r++) {
         //该字符存在map中并且在字串中 注意 abbcdea 这种情况
         if (map.has(s[r]) && map.get(s[r]) >= l) { 
             l = map.get(s[r]) + 1; //移动左边界至重复字符的下一个位置
         }
         res = Math.max(res, r-l+1);  //更新最长子串
         map.set(s[r], r);  //将该字符放入map
     }
     return res;
 };
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

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
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
写一个防抖。你现在写的是非立即执行的版本，可以再写一个立即执行的版本吗？
算法题：将对象的属性全部提升到第一层。
```js
function transfor(obj,stack,result) {
    for(let key in obj) {
        if(parseInt(key).toString() == 'NaN') {
            stack.push(key);
        } else {  
            stack.push(`[${key}]`);
        }
        if(typeof obj[key] == 'object' && obj[key] !== null) {
            transfor(obj[key],stack,result);
        } else {
            let stackStr = stack.join('.');
            console.log(result)
            result[stackStr] = obj[key];
            stack.pop();
        }
    }
    return result;
}

let testObj = {
    a: {
        b: 1,
        c: [0, {d: 1}]
    }
}

console.log(transfor(testObj,[],{}))
```

代码题：实现一个compose函数
一维数组构建树结构
```js
function getTree() {
  let map = new Map();
  arr.forEach(item => {
    map.set(item.id,item);
  })
  let tree;
  arr.forEach(node => {
    let parent = map.get(node.parentId);
    if(parent) {
      if(!parent.children) {
        parent.children = [];
      }
      parent.children.push(node);
    } else {
      tree.push(node)
    }
  })
  return tree;
}
```
逆转链表
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(!head) {
        return null;
    }
    if(head && !head.next) {
        return head;
    }
    const pre = head;
    const cur = head.next;
    const newHead = reverseList(head.next);
    cur.next = pre;
    pre.next = null;
    return newHead;
};
```
