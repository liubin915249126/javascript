// 打印出 1 - 10000 之间的所有对称数

[...Array(10000).keys()].filter((x) => { 
    return x.toString().length > 1 && x === Number(x.toString().split('').reverse().join('')) 
  })
  