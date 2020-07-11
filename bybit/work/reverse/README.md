#### 
<!-- 修改保证金 -->
postSetAddMargin
<!-- 修改止盈止损 -->
postSetTakeProfit
<!-- 平仓 (限价/市价) -->
createOrder

symbols: {// 产品相关配置
    BTCUSD: {
      baseVal: 5,
      precision: 1,
      dividend: 2, // 默认被除数，关系到深度图的范围 x轴档位 / dividend 等于对应档位的价格范围， 如25
      decimal: 8, // 小数点位数
    },
    ETHUSD: {
      baseVal: 5,
      precision: 2,
      dividend: 20,
      decimal: 8,
    },
    EOSUSD: {
      baseVal: 1,
      precision: 3,
      dividend: 1000,
      decimal: 4,
    },
    XRPUSD: {
      baseVal: 1,
      precision: 4,
      dividend: 10000,
      decimal: 2,
    },
    // USDTUSD: {},
  },