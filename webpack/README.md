#### 
[learn](https://github.com/wlx200510/webpack4.x-learn)
[learn](https://blog.csdn.net/qq_16339527/article/details/80641245)
[learn](https://github.com/frontend9/fe9-library/issues/242)

默认为async，表示只会提取异步加载模块的公共代码，initial表示只会提取初始入口模块的公共代码，all表示同时提取前两者的代码

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000, // chunk只有超过这个大小才会被分割
      maxSize: 0, // 大于这个体积的chunk会被自动分割为更小的chunk
      minChunks: 1, // 一个模块被共享的chunk数量大于minChunks时，才会被分割出来
      maxAsyncRequests: 5, // 按需加载最大的并行数
      maxInitialRequests: 3, // 初始加载最大的并行数
      automaticNameDelimiter: '~', // name为true时，新chunk的文件名由cacheGroups的key加上chunks属性的一些信息生成，automaticNameDelimiter是分隔符
      name: true,
      cacheGroups: {  // 配置拆分规则，会继承splitChunks所有的配置项，所有splitChunks配置项都可以在这里重写覆盖，test、prioprity、reuseExistingChunk是cacheGroups独有的属性
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 模块匹配规则，可以是正则表达式或者函数，不写默认选择所有模块
          priority: -10 // 优先级，当同一个模块同时包含在不同cacheGroup中，该模块将被划分到优先级高的组中
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true  // 如果该chunk包含的modules都已经另一个被分割的chunk中存在，那么直接引用已存在的chunk，不会再重新产生一个
        }
      }
    }
  }
};

vueEdior: {
  name: 'vueEdior',
  test: /[\\/]node_modules[\\/]vue2-editor[\\/]/,
  priority: 10  // 优先级要大于 vendors 不然会被打包进 vendors
},