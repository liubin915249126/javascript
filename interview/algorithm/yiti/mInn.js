// 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。

const S = 'bcadefg'
const T = 'cad'

// 因为 T 的 length 是一定的，所以在循环S的的时候 ，循环当前项 i 后面至少还有 T.length 个元素
const find = (S, T) => {
    if (S.length < T.length) return -1;
    for (let i = 0; i < S.length - T.length ; i++) {
        if (S.substr(i, T.length) === T) return i ;
    };
    return -1;
  };
  