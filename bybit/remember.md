#### 前端组排期
https://docs.google.com/spreadsheets/d/17nYSpsiPKjYleROHYjaid6LHgcVqhWD36Fw5_ABMH-Q/edit#gid=478162514

https://alidocs.dingtalk.com/spreadsheet/edit?dentryKey=RyQVNBZ7Gtyl5DyW

#### 发布方案
https://confluence.bybit.com/pages/viewpage.action?pageId=1212894

#### confluence
https://confluence.bybit.com/display/FE/Frontend

const exec = require('child_process').exec

dayjs(date).isBefore(date)
dayjs(date).isAfter(date)
dayjs(date).isBetween(date,date)

Electron 
1920*1080 2560 x 1600

#### node 自动部署
webhook
shelljs js中执行shell命令 
node-ssh ssh2 连接服务器
archiver 压缩代码

precommit postbuild
lru-cache

#### node 部署到服务器
ssh root@公网IP 
ftp(filezilla)
#### 开发组件库
[](https://juejin.im/post/5e60a75e6fb9a07cdb467e02#heading-6)
verdaccio

#### hosts
/etc/hosts
3.0.70.134   api2.polo.bybit.com
API2_HOST = "//api2.test-2.bybit.com"
API2_HOST = "//api2.polo.bybit.com"

#### 
IntersectionObserver 检测元素是否可见

MessageChannel


顺序 kalel lucky sean talen king len mango vincent



```js
var u = navigator.userAgent, app = navigator.appVersion;
  var type =  {// 移动终端浏览器版本信息
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    iPad: u.indexOf('iPad') > -1, //是否iPad
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
  };
```
