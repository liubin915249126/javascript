// 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
// 说明：每次只能向下或者向右移动一步。
// 示例: 输入:[ [1,3,1], [1,5,1], [4,2,1] ]
// 输出: 7
// 解释: 因为路径 1→3→1→1→1 的总和最小。
// 这个问题与问题二及其相似，但是其涉及到一个最优解的问题，现在每一个点都有一个类似权重的值，
// 我们要使这个值最小，其实用问题二的想法，我们很快就能得到答案：走到(m,n)只能从(m-1,n)和(m,n-1)两个地方走过来，
// 那么要保证(m,n)的权重最小，那么我们只需要选择走到(m-1,n)和（m，n-1）权重较小的那一边即可，那么我们就可以得到新的状态转移方程：

// sum[m][n] = MIN(sum[m-1][n], sum[m][n-1]) + table[m][n]


//动态规划实现最小路径和
function minPathSum(grid) {
    if (grid && grid.length) {
        //权重存储数组
        var sum = new Array(grid.length);
        for (var i=0; i<grid[0].length; i++) {
            sum[i] = new Array(grid[0].length);
        }

        //起点初始权重确定值
        sum[0][0]=grid[0][0];

        for (var i=0; i<grid.length; i++) {
            for (var j=0; j<grid[0].length; j++) {
                if (i===0 && j===0) {
                    continue;
                }
                //边上的权重处理
                if (i-1<0) {
                    sum[i][j] = sum[i][j-1] + grid[i][j];
                } else if(j-1<0) {
                    sum[i][j] = sum[i-1][j] + grid[i][j];
                } else {
                    sum[i][j] = Math.min(sum[i-1][j], sum[i][j-1]) + grid[i][j];
                }
            }
        }

        return sum[grid.length-1][grid[0].length-1];
    } else {
        throw new Error('Fuck!');
        return ;
    }
}

var grid = [
    [1,3,1],
    [1,5,1],
    [4,2,1]
]
console.log(minPathSum(grid));//7
