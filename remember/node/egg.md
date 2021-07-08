## 跨域多个设置

app.config.coreMiddleware.push('origin');
```js
module.exports = options => {
  /**
     * 如果传入的不是数组，直接抛出错误
     *  */
  // if (!Array.isArray(domainWhiteList)) {
  //   throw Error('---------跨域白名单必须设置为数组----------');
  // }
  return async function setOrigin(ctx, next) {
    // 当前访问的域名
    const {method} = ctx.request
    if(method=='OPTIONS') {
      ctx.status=201;
      // return res.json({});   //直接返回空数据，结束此次请求
    }
    ctx.response.set('Access-Control-Allow-Credentials', true);
    let { referer,origin } = ctx.request.header;
    if(!origin) {
      origin = referer
    }
    ctx.response.set("Access-Control-Allow-Headers", "appid,authorization,content-type,Content-Type");
    console.log('ctx.request.header',ctx.request)
    // if(ctx.log.info){
    //   ctx.log.info('ctx.request.header',ctx.request.header)
    // }
    // 如果设置成 '*'，就给访问的域名设置允许跨域
    if (domainWhiteList.indexOf('*') > -1) {
      ctx.response.set('Access-Control-Allow-Origin', origin);
    } else{
      if(origin){
        const currentIndex = domainWhiteList.findIndex(item => item.includes(origin))
        if(currentIndex>-1){
          ctx.response.set('Access-Control-Allow-Origin', domainWhiteList[currentIndex]);
        }
      }
    }
    await next();
  };
};
```