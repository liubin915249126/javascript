// 美国面额硬币有：1，5，10，25
// 我们给36美分的零钱，看能得怎样的结果？

function MinCoinChange(coins) {
  var coins = coins;

  var cache = {};

  this.makeChange = function (amount) {
    var change = [],
      total = 0;

    for (var i = coins.length; i >= 0; i--) {
      var coin = coins[i];
      while (total + coin <= amount) {
        change.push(coin);
        total += coin;
      }
    }

    return change;
  };
}

var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
minCoinChange.makeChange(36);
//一个25, 一个10, 一个1
