// 输入：strs = ["flower","flow","flight"]
// 输出："fl"

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length == 0) return "";
    let ans = strs[0];
    for(let i =1;i<strs.length;i++) {
        let j=0;
        for(j < ans.length && j < strs[i].length; j++) {
            if(ans[j] != strs[i][j]) break;
        }
        ans = ans.substr(0, j);
        if(ans === "") return ans;
    }
    return ans;
};

// https://leetcode.cn/problems/longest-common-prefix/