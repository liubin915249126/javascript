// 给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var CheckPermutation = function (s1, s2) {
  let res = true;
  for (let i = 0; i < s1.length; i++) {
    for (let j = 0; j < s2.length; j++) {
      if (
        !s2.includes(s1.slice(i, i + 1)) ||
        !s1.includes(s2.slice(j, j + 1))
      ) {
        res = false;
      }
    }
  }
  return res;
};
console.log(CheckPermutation("abc", "bca"));
