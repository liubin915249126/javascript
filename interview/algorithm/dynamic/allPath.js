// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
// 问总共有多少条不同的路径？
// 将整个方格扩展为**(m+1)*(n+1)**的方格

// 那么如果要走到（m,n），那么我们的上一步只能是（m-1,n）或者（m,n-1），所以走到（m,n）的所有走法就是走到（m-1,n）的所有走法+走到(m,n-1)的所有走法，即可以得到状态转换方程：
// ways[m][n] = ways[m-1][n] + ways[m][n-1]

//动态规划实现所有路径问题
function countPaths(m, n) {
    var ways = new Array(m+1);
    for (var i=0; i<=m; i++) {
        ways[i] = new Array(n+1);
    }

    //上方扩展一行，使其值为0
    for(var i=0; i<=n; i++){
        ways[0][i] = 0;
    }

    //边上扩展一列，使其值为0
    for(var j=0; j<=m; j++){
        ways[j][0] = 0;
    }

    //设置初始值，起点走法为1，只能一步一步走
    ways[1][1]=1;

    for (var a=1; a<=m; a++) {
        for (var b=1; b<=n; b++) {
            if (a===1 && b===1) {
                continue;
            }
            //套用状态转换方程
            ways[a][b] = ways[a][b-1] + ways[a-1][b];
        }
    }

    return ways[m][n];
}

console.log(countPaths(3,2));//3
console.log(countPaths(7,3));//28
