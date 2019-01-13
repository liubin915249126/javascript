module.exports = {
    //...
    optimization: {
      splitChunks: {
        chunks: 'async', 
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  };

// chunks：表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks；
// minSize：表示抽取出来的文件在压缩前的最小大小，默认为 30000；
// maxSize：表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小；
// minChunks：表示被引用次数，默认为1；
// maxAsyncRequests：最大的按需(异步)加载次数，默认为 5；
// maxInitialRequests：最大的初始化加载次数，默认为 3；
// automaticNameDelimiter：抽取出来的文件的自动生成名字的分割符，默认为 ~；
// name：抽取出来文件的名字，默认为 true，表示自动生成文件名；
// cacheGroups: 缓存组。（这才是配置的关键）


// 下面我们把所有 node_modules 的模块被不同的 chunk 引入超过 1 次的抽取为 common。
cacheGroups: {
    common: {
      test: /[\\/]node_modules[\\/]/,
      name: 'common',
      chunks: 'initial',
      priority: 2,
      minChunks: 2,
    },
  }
  // test: 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中；
  // priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
  // reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。

  
 // 同样对于通过 MiniCssExtractPlugin 生成的 CSS 文件也可以通过 SplitChunks 来进行抽取公有样式等。
 //如下表示将所有 CSS 文件打包为一个（注意将权重设置为最高，不然可能其他的 cacheGroups 会提前打包一部分样式文件）：

  cacheGroups: {
    styles: {
      name: 'styles',
      test: /\.css$/,
      chunks: 'all',
      enforce: true,
      priority: 20, 
    }
  }  