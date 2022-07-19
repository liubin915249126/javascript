var permuteUnique = function(s) {
    const nums = s.slice('')
    const ans = [];
    const vis = new Array(nums.length).fill(false);
    const backtrack = (idx, perm) => {
        if (idx === nums.length) {
            ans.push(perm.slice());
            return;
        }
        for (let i = 0; i < nums.length; ++i) {
            if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
                continue;
            }
            perm.push(nums[i]);
            vis[i] = true;
            backtrack(idx + 1, perm);
            vis[i] = false;
            perm.pop();
        }
    }
    nums.sort((x, y) => x - y);
    backtrack(0, []);
    return ans;
};

var permuteUnique = function(nums) {
    if (nums.length === 1) {
        return [nums];
    }
    var results = [];
    nums.forEach(function(v, i) {
        if (nums.indexOf(v) === i) {
            var subs = [...nums];
            subs.splice(i, 1);
            results = results.concat(permuteUnique(subs).map(function(v2) {
                return [v, ...v2];
            }));
        }
    });
    return results;
};

作者：ityou-o
链接：https://leetcode.cn/problems/permutations-ii/solution/javascriptban-jie-ti-si-lu-by-ityou-o-fqxq/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。