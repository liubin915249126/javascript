// 输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
// 输出: 8
// 解释: 能够达到的最大利润:  
// 在此处买入 prices[0] = 1
// 在此处卖出 prices[3] = 8
// 在此处买入 prices[4] = 4
// 在此处卖出 prices[5] = 9
// 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
// 注意:
// 0 < prices.length <= 50000.
// 0 < prices[i] < 50000.
// 0 <= fee < 50000.

var maxProfit = function(prices, fee) {
    let min = prices[0], r = 0, i = 1, t;
    while(prices.length > i) {
        if (prices[i] < min) {
            min = prices[i]
        } else if ((t = prices[i] - min - fee) > 0) {
            r += t
            min = prices[i] - fee
        }
        i++
    }
    return r
};
console.log(maxProfit([1, 3, 2, 8, 4, 9],2))
