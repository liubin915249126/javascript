// 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。
// 1 0 1 0 0
// 1 0 1 1 1
// 1 1 1 1 1
// 1 0 0 1 0

// 定义一个二维 dp 数组，其中dp[i][j] 表示以 (i, j) 为右下角的正方形， dp[i][j] = k,为边长为k的正方形
// 2、假设dp[i][j]为k 正上方dp[i-1][j] 斜上方dp[i-1][j-1] 左方dp[i][j-1],都得为最小值k-1，
// 3、那么dp[i][j]的取值 为matrix[i][j] === 1时候，正上方dp[i-1][j] 斜上方dp[i-1][j-1] 
// 左方dp[i][j-1] 的最小值 加上 此处matrix[i][j] === 1 的值
// 3、则 (i, j) 位置一定且最大可以构成一个边长为 k 的正方形。
// 4、状态转移方程dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1;

/**
 * @param {character[][]} matrix
 * @return {number}
 */
 var maximalSquare = function(matrix) {
    let n = matrix.length, m = matrix[0].length;
    let dp = Array.from({length:n}, ()=> new Array(m).fill(0));
    let max = 0;
    for(let i = 0; i < n; i++) {
        if(matrix[i][0] === '1') {
          dp[i][0] = 1;  
          max = 1;
        }
          
    }
    for(let i = 0; i < m; i++) {
        if(matrix[0][i] === '1') {
          dp[0][i] = 1; 
          max = 1; 
        }
          
    }
    for(let i = 1; i < n; i++) {
        for(let j = 1; j < m; j++) {
            if(matrix[i][j] === '1'){
               dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1;
               max = Math.max(dp[i][j], max); 
            }
              
        }
    }
    return max * max;
};
