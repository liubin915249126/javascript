##  正向计算器

https://confluence.bybit.com/pages/viewpage.action?pageId=1213073

qty 数量
leverage 杠杆
entryPrice  开仓价格
exitPrice  平仓价格

qty * entryPrice  开仓价值
(qty * entryPrice) / leverage 保证金 IM

收益 与反向计算相反



#### 强平价格
https://confluence.bybit.com/pages/viewpage.action?pageId=16777967

https://confluence-by.go.akamai-access.com/pages/viewpage.action?pageId=1213\73


const getContainerStats = () => {
    console.log(111, containerRef.current)
    if (containerRef.current) {
      const style = window.getComputedStyle(containerRef.current, null);
      const containerWidth = parseInt(style.getPropertyValue('width')) ?? 0
      const containerHeight = parseInt(style.getPropertyValue('height')) ?? 0
      setDefaultPosition({
        x: 0 - containerWidth / 2,
        y: 0 - containerHeight / 2
      })
    }
  }