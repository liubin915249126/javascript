// 定义一个发送数据的函数
function sendData(data) {
    console.log('我才不要每次都触发呢',data);
    setTimeout(()=> {
      // 在这里，你可以使用AJAX、Fetch或其他方法将数据发送到服务器
      // 例如：
      // fetch('/api/track', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
    }, 10000)
  }
  
  // 监听页面加载事件
  window.addEventListener('load', function() {
    // 获取性能数据
    const [performanceData] = performance.getEntriesByType("navigation");
    // 即将废弃 推荐上面的PerformanceNavigationTiming写法
    // let performanceData = window.performance.timing;
    
    // 计算页面加载时间 （window.performance.timing使用这个）
    // let pageLoadTime = performanceData.domContentLoadedEventEnd - performanceData.navigationStart;
    
   // 计算页面加载时间 （performance.getEntriesByType("navigation")的时候使用这个）
       let pageLoadTime = performanceData.loadEventEnd - performanceData.domComplete;
  
    // 计算请求响应时间
    const requestResponseTime = performanceData.responseEnd - performanceData.requestStart;
  
    // 计算DNS查询时间
    let dnsLookupTime = performanceData.domainLookupEnd - performanceData.domainLookupStart;
  
    // 计算TCP连接时间
    let tcpConnectTime = performanceData.connectEnd - performanceData.connectStart;
  
    // 计算白屏时间 （老的）
     // var whiteScreenTime = performanceData.responseStart - performanceData.navigationStart;
     
     // 计算白屏时间 （当前的）
    var whiteScreenTime = performanceData.domInteractive - performanceData.responseStart;
    
    
    // 获取 FCP 时间
    let fcpTime = 0;
    const [fcpEntry] = performance.getEntriesByName("first-contentful-paint");
    if (fcpEntry) {
      fcpTime = fcpEntry.startTime;
    }
  
    // 获取 LCP 时间
    let lcpTime = 0;
    const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
    if (lcpEntries.length > 0) {
      lcpTime = lcpEntries[lcpEntries.length - 1].renderTime || lcpEntries[lcpEntries.length - 1].loadTime;
    }
    
    // Paint Timing
    const paintMetrics = performance.getEntriesByType('paint');
    paintMetrics.forEach((metric) => {
      console.log(metric.name + ': ' + metric.startTime + 'ms');
    });
   
      // 监听长任务
      let tti = 0;
      let tbt = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // 计算 TBT
          if (entry.duration > 50) {
            tbt += entry.duration - 50;
          }
        }
  
        // 计算 TTI
        if (tti === 0 && tbt < 50) {
          tti = performance.now();
        }
      });
      observer.observe({ entryTypes: ["longtask"] });
      
    // 构造要发送的性能数据
    let perfData = {
      type: 'performance',
      pageLoadTime: pageLoadTime,
      dnsLookupTime: dnsLookupTime,
      tcpConnectTime: tcpConnectTime,
      whiteScreenTime: whiteScreenTime,
      requestResponseTime: requestResponseTime,
      tbt：tbt,
      tti：tti
      // 其它你想要收集的信息
    };
    
    
  
    // 发送性能数据
    sendData(perfData);
    });
  });
  

// https://juejin.cn/post/7219669812158414903?searchId=202401080950352279F99ED5FD9714850D