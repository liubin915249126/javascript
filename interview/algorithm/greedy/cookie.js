// 输入: g = [1,2], s = [1,2,3]
// 输出: 2
// 解释: 
// 你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
// 你拥有的饼干数量和尺寸都足以让所有孩子满足。
// 所以你应该输出2.


var findContentChildren = function(g, s) {
    g.sort(asc);
    s.sort(asc);
    let gp = 0,
        sp = 0;
    while (sp < s.length && gp < g.length) {
        // 发现满足条件的饼干，喂饱一个孩子
        if (s[sp] >= g[gp]) {
            gp++;
        }
        // 继续找下一块饼干
        sp++;
    }
    return gp;
    function asc(a, b) {
        return a - b;
    }
};
console.log(findContentChildren([1,2,2,4,6,7,8,8,8,9,9], [1,3,4,4,5,8,9]))//6
