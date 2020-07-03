#### 差异

take_profit -> takeProfitE4
stop_loss -> stopLossE4
trailing_stop -> trailingStopE4
leverage -> leverageE2
position_margin-> positionMarginE8
liq_price -> liqPriceE4
bust_price -> bustPriceE4
entry_price -> entryPriceE8
size -> sizeX

position_value
auto_add_margin
occ_closing_fee
occ_funding_fee
trailing_active 
position_status
deleverage_indicator
oc_calc_data
order_margin
wallet_balance
realised_pnl
cum_realised_pnl
cum_commission
cross_seq
position_seq
created_at
updated_at
ext_fields
unrealised_pnl -> unrealisedPnlE8
effective_leverage


#### 用到的 key
side
symbol
 - isIsolated
leverage
 - freeQty
 - entryPrice
liqPrice
 - positionBalance
unRealisedPnlByLp
positionValue
todayRealisedPnl //
takeProfit
stopLoss
trailingStop

showTakeProfit()
   <PositionTakeProfit>
    sellValueToCost
    buyValueToCost
    <ByTakeProfit>
      slTriggerBy?
      tpTriggerBy?
showModalFunc()
  price
  qty

<SetAutoMargin>
  isAutoAddMargin