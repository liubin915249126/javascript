[gitlab](http://10.36.2.115)(http://123.150.252.54:2000/) liubin@51youse.com
[readmine](http://10.36.2.115:81/redmine/) liub （http://123.150.252.54:81/redmine/my/page）
[swagger](http://10.36.2.114:8888/api/swagger/index.html#!/v1%2Forder/listAll)
[test](http://10.36.2.119:3000/buyerOrderPage)
[51](http://operate.51youse.com/)
[svn](svn://10.36.2.115/fr_dev_dept)
[svn-pro](svn://10.36.2.115/pro_des_dept/)

[swagger](http://10.36.2.115:9081/api/swagger/index.html#/)

[119](http://123.150.252.54:8000)91

http://123.150.252.54:2000/users/sign_in
http://123.150.252.54:2000/root/operate_manager/merge_requests/new

http://123.150.252.54:81/redmine/my/page

http://10.36.2.118 liubin 12345678 

#### 
>
商城
```
   MIDtiger
   ...aaa111
```
>
后台管理
youseadmin4           123456
xadmin51              123456


const youse = "http://123.150.252.54:8090/api/" 9001
const youseqz = "http://123.150.252.54:8001/api/"

const gengdan = "http://123.150.252.54:3000/api"
http://10.36.2.119:8080/api/


GDLG0020180530113811177	2018-05-30 11:38:11	2018-07-16 15:40:07	江苏五一互联电子商务有限公司


/v1/dict/manager/list
字典表通用查询

```js
   legalPersonName
   legalPersonCertificateType
   legalPersonCertificateNumber
   legalPersonMobile
```


```js 
  replace(new RegExp("_","gm"),"  ")
  let tes = /(?=.*[a-zA-Z])(?=.*\d)(?=.*[#@!~%^&*$`(){}+=_|;:'<>.,?-])[a-zA-Z\d#@!~%^&*$`(){}+=_|;:'<>.,?-]{8,16}/;
  pattern:/(?=.*[a-zA-Z])(?=.*\d)(?=.*[#@!~%^&*$`(){}+=_|;:'<>.,?-])[a-zA-Z\d#@!~%^&*$`(){}+=_|;:'<>.,?-]{8,16}/,message:'8-16位，必须包含符号、数字和字母'
  /^0\.\d{1,4}$|^[1-9]\d{0,7}(\.\d{1,4})?$/
  
   function commafy(num){
      return num && num
          .toString()
          .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }
``` 
```js
   // 订货状态
   const  = {
     130: '未订货',
     131: '订货中',
     132: '订货成功',
     133: '订单取消'
 }
```
```js
        SELECT("select", "下拉可选项"),
  
        METERAGE_SELECT("meterage_select", "计量单位下拉可选项"),
        
        TEXT("text", "文本输入框"),
        
        SELECT_TEXT("select_text", "下拉可选项文本输入框"),
        
        METERAGE_TEXT("meterage_text", "计量度量单位文本输入框"),
        
        CUBAGE_METERAGE_TEXT("cubage_meterage_text", "体积(长宽高[厚、深])计量度量单位文本输入框"),
        
        CHECKBOX("checkbox", "多选项"),
        
        SELECTMORE("select_more", "下拉可选项多级联动"),
        
        TEXTMORE("text_more", "文本框可选项多级联动"),
        
        RADIO("radio", "单选项");
```
```js
   crm/api/order/add-v1/order/crm/add //现货商品下单
```

svn://10.36.2.115/pro_des_dept/trunk/doc/03_产品设计/04.CRM/V1.3/02.功能设计/TP-CRM-代客下单V1.2/TP-CRM-代客下单V1.2.rp 

关键属性_销售_物流_地理_仓库_交易(不存在empty占位)

2926 2933 2942

orderType   value  market  seller  buyer  SELLER  BUYER
自营销售订单  53     20      20      10             -
自营采购订单  55     0       10      20     _
撮合订单     54     10      10       10    

queryOrderingList
v1/order/crm/logisticsinfo -> v1/order/logisticsinfo



#### url --> page
```js
   api/v1/order/pagelist -> /ordering/api/list ->  queryOrdering -> ordering/queryOrderingList
   -> /v1/order/crm/pagelist
```
```js
   /ordering/orderList/info -> 自营销售订单 -> Ordering/orderManagement.js -> ./OrderingManagementList
   /ordered/orderList/info

   /orderacc/customeracc/info  //废弃 
   
   /crmManager/customerOrder/info ->客户订单 -> Ordering/crmCustomerOrder.jsx -> ./OrderingManagementList
   
   /ordering/matchOrderList/info -> 撮合订单 -> Ordering/orderManagement1.js -> ./OrderingManagementList
   /ordered/matchOrderList/info

   /ordering/companyOrderList/info -> 亨通订单 -> Ordering/orderManagement2.js -> ./OrderingManagementList

   /orderacc/customeracc/info //废弃

   /ordering/riskacc/info ->订单审核 -> Risk/orderManagement2.js -> ./OrderingManagementList
   
   /orderacc/riskacc/info //废弃

   /orderacc/bdacc/info  //废弃

   /orderacc/merchacc/info //废弃 
```

#### /v1/order/crm/logisticsinfo
```js 
   /v1/order/crm/logisticsinfo -> /v1/order/logisticsinfo
```
#### /v1/order/updatecontract
```js 
   /v1/order/updatecontract -> /v1/econtract/attachment/upload
   ordering/contractUpdate
```
#### v1/item/batch/price/updates
```js
   v1/item/batch/price/updates 
   RESTINGPRICEUPDATES-> /lan360/pending/price/update
   /lan360/pending/list
```
#### /v1/item/spotresource/get/
```js
   ITEMDETAIL -> /item/spotresource/getItem
```
#### 订单关闭
```js
   /v1/order/close -> /order/api/close -> closeOrder -> ordering/closeOrderList ->/OrderCloseModule
```
#### /v1/order/batchupdate 批量更新客户经理
```js
   BATCHUPDATE->/order/api/manager/update
```
