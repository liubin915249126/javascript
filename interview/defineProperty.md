#### 
```js
 modifyRequest(){
      const originRequest = wx.request;
      Object.defineProperty(wx, 'request', {
      configurable: true,
      enumerable: true,
      // writable: true,
      get(){
        return (option = {}) => {
          const {success} = option;
          Object.defineProperty(option,'success',{
            configurable: true,
            enumerable: true,
            writable: true,
            // get(){
            //   return (option = {})=>{
            //    console.log(222,option)  
            //   }
            // },
            value: function() {
              const config = arguments[0] || {};
              if(config.data.msg=="请先登录"){
                var {shopId} = option.header||{}
                var {pageType} = option.header||{};
                var {noJump} = option.header||{};
                if(!shopId){
                  var {shopId} = option.data||{}
                }
                if(!pageType){
                  var {pageType} =  option.data||{};
                }
                if(!noJump){
                  const pages = getCurrentPages();
                  if(Array.isArray(pages)&&pages[pages.length-1]){
                    console.log(pages,option)
                    if(pages[pages.length-1].route!=="pages/grant/grant"){
                      wx.navigateTo({
                        //登录成功跳转
                        url: '/pages/grant/grant?pageType=' + pageType+'&shopId=' + shopId,
                      })
                    }
                  }
                }
              }
              return success(config) 
            }
          })
          return originRequest({...option,...{header:{
              token: wx.getStorageSync('token'),
              memberId: wx.getStorageSync('userId'),
              shopId: wx.getStorageSync('shopId'),
              ...option.header,
          }}})
        }
      },
      // value: function() {
      //   const config = arguments[0] || {};
      //   const url = config.url;
      //   config.success=res=>{
      //     console.log(111,res)
      //   }
      //   return originRequest.apply(this, arguments);
      // }
    });
  },
```