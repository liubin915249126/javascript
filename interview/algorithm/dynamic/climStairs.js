 //爬楼梯问题
 function climbStairs(n) {
    if (n === 1 || n === 2) {
        return n;
    }

    var ways = [];
    ways[0] = 1;
    ways[1] = 2;

    for(var i=2; i<n; i++){
        ways[i]=ways[i-1] + ways[i-2];
    }

    return ways[n-1];
}
console.log(climbStairs(3));//3
