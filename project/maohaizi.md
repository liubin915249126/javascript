https://derek@git.maohz.com/r/mhz.miniapps.git
mhz_dev mhzgit

https://liubin@git.maohz.com/r/mhz.web.admin.git
daily/0.0.1

https://www.maohz.com/mhzpage/admin/index.html#/home https://web.maohz.com

https://liubin@git.maohz.com/r/mhz.miniapps.git
special

欧尚星巴克

tcb-admin-node

https://shimo.im/docs/JxVwZgRBJrA0fZQx/

<!-- 需求池 -->
https://shimo.im/sheets/QCJc9QJTc63C6CcP/MODOC
http://v61.chonglaoban.cn/#/login

主机地址：maohz.com 端口：21 加密：选择 只使用普通 ftp
登录类型：选择 正常 用户名:mhzpage 密码：ftppage0827
fileZilla

https://manage.maohz.com
'/mhzpage/admin'

https://webtest.maohz.com:8444

http://mhz.mzd1893.com/mhz/swagger-ui.html
http://mhz.mzd1893.com/mhz/open/dict/mainlist

admin4
123
superadmin 123

/project/alipay
/project/mhzpage/admin

15298865207

#### 支付宝

alipay https://git.maohz.com/summary/mhz-alipay.git https://liubin@git.maohz.com/r/mhz-alipay.git
https://m.maohz.com/alipay/
https://m.maohz.com/malipay/pay?state=2
http://localhost:8081/malipay/pay?auth_code=123&state=2

#### 小程序 1.8.9

https://mp.weixin.qq.com/wxamp/index/index?lang=zh_CN&token=908282692
1518080054@qq.com 910407F
https://mhzxcx.mzd1893.com/swagger-ui.html
https://shimo.im/docs/ffjyMZY9xrMaUqAb/read

1、用户访问多家店的兼容
https://shimo.im/docs/n4TXiyMY3NA13zJU/
2、 商品详情页链接规则，shopid 改为从接口获取，不从链接里截取了
3、 商品图片太大了，很有可能加载不出来

#### 老接口

https://www.maohz.com/mhzapi/api/UserApi/GetUserId getOpenIdbywxlogin

https://www.maohz.com/mhzapi/api/UserApi/UserPhoneLogin CommongetPhoneNumber1 https://mhzxcx.mzd1893.com/mhz/open/member/phoneLogin
open/wx/unshop/phoneLogin
加入购物车
app.globalData.WebUrl + '/cart/getItems'
商品详情
https://www.maohz.com/mhzapi/api/ShopApi/GetGoodsSpecDetailInfo
https://www.maohz.com/mhzapi/api/ShopApi/GetShopDetailInfo?goodsId=` + goodsId + `&userId=` + userId, /open/goods/view/{id}
个人详情
https://www.maohz.com/mhzapi/api/UserApi/GetUserBaseInfo /member/getMemberInfo
https://www.maohz.com/mhzapi/api/UserApi/GetUserInfo?userId=
用户余额 https://www.maohz.com/mhzapi/api/UserApi/GetAmount
购物车购买 https://www.maohz.com/mhzapi/api/UserApi/GoodsSecShopping /order/cartBuy /order/directBuy
订单列表 `https://www.maohz.com/mhzapi/api/UserApi/GetOrderInfoList?userId=` + wx.getStorageSync("userId")+`&shopId=`+shopId,
套餐列表 https://www.maohz.com/mhzapi/api/ShopApi/GetShopPackageList?shopId=' + shopId /member/listPackage
充值流水 `https://www.maohz.com/mhzapi/api/UserApi/GetCapitalFlowList?userId=`+wx.getStorageSync("userId") /member/listBill
订单详情 https://www.maohz.com/mhzapi/api/UserApi/GetOrderDetailInfo /order/view/{orderId}
购物车数量 app.globalData.WebUrl + '/cart/getItemSize'  
签到分享 app.globalData.WebUrl + "/signIn/addShare", /member/signinShare
手机号验证么登录 https://www.maohz.com/mhzapi/api/UserApi/UserLogin /open/mobileCodeLogin/{mobile}/{code}

isDiscount

goodsId,goodsName,goodsImage

#### 后台 

ServiceTime
3.4.2
goods,service



## 支付宝

#### 老接口

/mhzapi/api/ShopApi/GetShopPackageList open/shop/getPackageList
/mhzapi/api/ShopApi/GetShopBaseInfo /open/shop/view/
/alipay/getBargainAmount /open/unshop/alipay/cutAmount
/mhzapi/api/Common/SendSms /open/unshop/sms/sendVerifyCode/{mobile}
/alipay/doOrder /open/unshop/alipay/pay

```js
$("#tailoringImg").cropper({
  aspectRatio: 1 / 1, // 默认比例
  preview: ".previewImg", // 预览视图
  guides: false, // 裁剪框的虚线(九宫格)
  autoCropArea: 0.5, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
  movable: false, // 是否允许移动图片
  dragCrop: true, // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
  movable: true, // 是否允许移动剪裁框
  resizable: true, // 是否允许改变裁剪框的大小
  zoomable: false, // 是否允许缩放图片大小
  mouseWheelZoom: false, // 是否允许通过鼠标滚轮来缩放图片
  touchDragZoom: true, // 是否允许通过触摸移动来缩放图片
  rotatable: true, // 是否允许旋转图片
  crop: function(e) {
    // 输出结果数据裁剪图像。
  }
});
```

```js
downImg(url){
     const image = new Image();
     // 解决跨域 canvas 污染问题
     image.setAttribute("crossOrigin", "anonymous");
     image.onload = function() {
       const canvas = document.createElement("canvas");
       canvas.width = image.width;
       canvas.height = image.height;
       const context = canvas.getContext("2d");
       context.drawImage(image, 0, 0, image.width, image.height);
       //得到图片的base64编码数据
       const url = canvas.toDataURL("image/png");
       // 生成一个 a 标签
       const a = document.createElement("a");
       // 创建一个点击事件
       const event = new MouseEvent("click");
       // 将 a 的 download 属性设置为我们想要下载的图片的名称，若 name 不存在则使用'图片'作为默认名称
       a.download = name || "图片";
       // 将生成的 URL 设置为 a.href 属性
       a.href = url;
       // 触发 a 的点击事件
       a.dispatchEvent(event);
       // return a;
     };
     image.src = url;
   },
```

```js
let file = this.$refs.cropper.getCroppedCanvas().toDataURL();
const blob = this.convertBase64ToBlob(file);
const baseData = this.$refs.cropper.getData();
this.loading = true;

let canvas = document.createElement("canvas");
let sourceImg = document.createElement("img");
let context = canvas.getContext("2d");
const scale = blob.size / (100 * 1024);
sourceImg.setAttribute("src", base64); //原来的图片
sourceImg.onload = function(e) {
  context.drawImage(this, 0, 0, width / sqrt, height / sqrt);
  let dataUrl = canvas.toDataURL(blob.type || "image/png", 0.92); //压缩后的图片
};
```

优惠券：已用 beautyCount
余额：以扣 balanceAmount
spa：已用 showerCount
会员：vipLevel,vipDiscount

sort:"updateTime",
order:"desc",
苏州前端交流群 634410637

1.工作台 待办列表 宠物 ownerName 没返回 2.工作台 待办列表 memberId 没返回

充值扣款 散客消费

商品详情接口
realAmount,saleAmount,promotionRatio,stock,priceDesc,address
goodsSpecList goodsSpecData

#### object.defineProperty

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
              return success(config)
            }
          })
          return originRequest(option)
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
