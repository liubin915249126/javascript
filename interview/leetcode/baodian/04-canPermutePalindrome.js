// 给定一个字符串，编写一个函数判定其是否为某个回文串的排列之一。
// 回文串是指正反两个方向都一样的单词或短语。排列是指字母的重新排列。

/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function (s) {
    const len = s.length;
    const sArr = s.split();
    let num = 0;
    for (let i = 0; i < len; i++) {
        if(!s.split().splice(i,1).includes(s.slice(i, i + 1))){
            num+=1;
            if(num>len%2) return false;
        }
    }
};

console.log(111, canPermutePalindrome('"code"'))