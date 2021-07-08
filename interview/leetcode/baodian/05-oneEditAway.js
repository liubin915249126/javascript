// 字符串有三种编辑操作:插入一个字符、删除一个字符或者替换一个字符。
// 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。

/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
var oneEditAway = function (first, second) {
  let num = 0;
  const obj1 = {}
  const obj2 = {}
  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      if (!second.includes(first.slice(i, i + 1)) && !obj1[i]) {
        num +=1;
        obj1[i] = true;
        if(num>1) return false;
      }
      if(!first.includes(second.slice(j, j + 1)) && !obj2[j]){
        num +=1;
        obj2[j] = true;
        if(num>1) return false;
      }
    }
  }
  return true;
};
console.log(111, oneEditAway("horse", "ors"))
console.log(111, oneEditAway("abcd", "abce"))