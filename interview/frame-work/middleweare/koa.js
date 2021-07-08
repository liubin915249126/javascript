function compose (middleware) {
    // 判断参数是否合法，middleware 要求为数组且其中每个数组元素都为 function
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
    for (const fn of middleware) {
      if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }
  
    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */
  
    return function (context, next) {
      // last called middleware #
      let index = -1
      // 递归返回一个函数 该函数返回一个 Promise 的对象
      return dispatch(0)
      function dispatch (i) {
        // 当 next 方法被多次调用时会出现
        if (i <= index) return Promise.reject(new Error('next() called multiple times'))
        index = i
        let fn = middleware[i]
        // 最后一个中间件
        if (i === middleware.length) fn = next
        if (!fn) return Promise.resolve()
        // Promise 封装中间件 进行递归调用
        try {
        //   return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
          return Promise.resolve(fn(context, function next(){
            return dispatch(i+1)
          }));
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
  }
  