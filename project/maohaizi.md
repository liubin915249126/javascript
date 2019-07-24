https://derek@git.maohz.com/r/mhz.miniapps.git
mhz_dev   mhzgit

https://mhz_dev@git.maohz.com/r/mhz.web.admin.git
daily/0.0.1

https://www.maohz.com/mhzpage/admin/index.html#/home

https://mhz_dev@git.maohz.com/r/mhz.miniapps.git
special

欧尚星巴克

tcb-admin-node

https://shimo.im/docs/JxVwZgRBJrA0fZQx/ 

主机地址：maohz.com  端口：21  加密：选择  只使用普通ftp
登录类型：选择 正常 用户名:mhzpage 密码：ftppage0827
fileZilla

https://manage.maohz.com
'/mhzpage/admin'

https://webtest.maohz.com:8444

http://mhz.mzd1893.com/mhz/swagger-ui.html
http://mhz.mzd1893.com/mhz/open/dict/mainlist

admin4
123
superadmin  123

#### 小程序

https://mhzxcx.mzd1893.com/mhz/swagger-ui.html

1、用户访问多家店的兼容
  https://shimo.im/docs/n4TXiyMY3NA13zJU/ 
2、 商品详情页链接规则，shopid改为从接口获取，不从链接里截取了
3、 商品图片太大了，很有可能加载不出来

#### 老接口
https://www.maohz.com/mhzapi/api/UserApi/GetUserId getOpenIdbywxlogin

https://www.maohz.com/mhzapi/api/UserApi/UserPhoneLogin CommongetPhoneNumber1
加入购物车
app.globalData.WebUrl + '/cart/getItems'
商品详情
https://www.maohz.com/mhzapi/api/ShopApi/GetGoodsSpecDetailInfo /open/goods/view/{id}

```js 
    $('#tailoringImg').cropper({  
        aspectRatio : 1 / 1,// 默认比例  
        preview : '.previewImg',// 预览视图  
        guides : false, // 裁剪框的虚线(九宫格)  
        autoCropArea : 0.5, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8  
        movable : false, // 是否允许移动图片  
        dragCrop : true, // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域  
        movable : true, // 是否允许移动剪裁框  
        resizable : true, // 是否允许改变裁剪框的大小  
        zoomable : false, // 是否允许缩放图片大小  
        mouseWheelZoom : false, // 是否允许通过鼠标滚轮来缩放图片  
        touchDragZoom : true, // 是否允许通过触摸移动来缩放图片  
        rotatable : true, // 是否允许旋转图片  
        crop : function(e) {  
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


优惠券：已用 beautyCount
余额：以扣 balanceAmount
spa：已用 showerCount
会员：vipLevel,vipDiscount

sort:"updateTime",
order:"desc",
苏州前端交流群 634410637        

1.工作台 待办列表 宠物 ownerName 没返回
2.工作台 待办列表 memberId 没返回

充值扣款 	散客消费