// js双指针
// 初始化左指针为0，右指针为1；
// 右指针r每向前移动一位，就和[l,r]内的所有字符比较，如果重复记录重复序号为i，将l更新为i+1；
// 更新最大值ans = r-l+1；

// 作者：mxx1jVtPGC
// 链接：https://leetcode.cn/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/solution/js-shuang-zhi-zhen-by-mxx1jvtpgc-ke4x/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    if(s.length==0) return 0
    if(s.length==1) return 1
    //if(s.length<=1) return s.length
    let l=0,r=1;
    let ans = 1;
    while(r<s.length){
        for(let i=l;i<r;i++){
            if(s[i]===s[r]){
                l = i+1;
                break
            }
        }
        ans = Math.max(ans, r-l+1);
        r++;
    }
    return ans
    
};