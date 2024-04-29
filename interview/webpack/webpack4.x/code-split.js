splitChunks: {
    chunks: "all",
    cacheGroups: {
      libs: {
        name: "chunk-libs",
        test: /[\/]node_modules[\/]/,
        priority: 10,
        chunks: "initial" // 只打包初始时依赖的第三方
      },
      elementUI: {
        name: "chunk-elementUI", // 单独将 elementUI 拆包
        priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
        test: /[\/]node_modules[\/]element-ui[\/]/
      },
      commons: {
        name: "chunk-comomns",
        test: resolve("src/components"), // 可自定义拓展你的规则
        minChunks: 2, // 最小共用次数
        priority: 5,
        reuseExistingChunk: true
      }
    }
  };