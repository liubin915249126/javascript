// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，
// 其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。


// 时间复杂度：O((m+n)log⁡(m+n))O((m+n)\log(m+n))O((m+n)log(m+n))。 排序序列长度为 m+nm+nm+n，套用快速排序的时间复杂度即可，平均情况为 O((m+n)log⁡(m+n))O((m+n)\log(m+n))O((m+n)log(m+n))。
// 空间复杂度：O(log⁡(m+n))O(\log(m+n))O(log(m+n))。 排序序列长度为 m+nm+nm+n，套用快速排序的空间复杂度即可，平均情况为 O(log⁡(m+n))O(\log(m+n))O(log(m+n))。
var merge = function(nums1, m, nums2, n) {
    nums1.splice(m, nums1.length - m, ...nums2);
    nums1.sort((a, b) => a - b);
};


// 时间复杂度：O(m+n)O(m+n)O(m+n)。 指针移动单调递增，最多移动 m+nm+nm+n 次，因此时间复杂度为 O(m+n)O(m+n)O(m+n)。
// 空间复杂度：O(m+n)O(m+n)O(m+n)。 需要建立长度为 m+nm+nm+n 的中间数组 sorted\textit{sorted}sorted。
var merge = function(nums1, m, nums2, n) {
    let p1 = 0, p2 = 0;
    const sorted = new Array(m + n).fill(0);
    var cur;
    while (p1 < m || p2 < n) {
        if (p1 === m) {
            cur = nums2[p2++];
        } else if (p2 === n) {
            cur = nums1[p1++];
        } else if (nums1[p1] < nums2[p2]) {
            cur = nums1[p1++];
        } else {
            cur = nums2[p2++];
        }
        sorted[p1 + p2 - 1] = cur;
    }
    for (let i = 0; i != m + n; ++i) {
        nums1[i] = sorted[i];
    }
};


// https://leetcode.cn/problems/merge-sorted-array/