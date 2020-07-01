/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 */
var twoSum = function (nums, target) {
    // 两层循环
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (nums[i] + nums[j] == target && i !== j) {
                return [i, j];
            }
        }
    }
};

console.log(twoSum([2, 7, 11, 15], 9))


