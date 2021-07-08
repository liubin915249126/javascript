// 实现一个算法，确定一个字符串 s 的所有字符是否全都不同
/**
 * @param {string} astr
 * @return {boolean}
 */
const isUnique = (astr) => {
  const len = astr.length;
  let res = true;
  for (let i = 0;i < len; i++) {
    if (astr.includes(astr.slice(i, i + 1))) {
      res = false;
    }
  }
  return res;
};

console.log(isUnique("leetcode"));
