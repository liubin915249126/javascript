#### 前端组排期
https://docs.google.com/spreadsheets/d/17nYSpsiPKjYleROHYjaid6LHgcVqhWD36Fw5_ABMH-Q/edit#gid=478162514

https://alidocs.dingtalk.com/spreadsheet/edit?dentryKey=RyQVNBZ7Gtyl5DyW

#### 发布方案
https://confluence.bybit.com/pages/viewpage.action?pageId=1212894

#### confluence
https://confluence.bybit.com/display/FE/Frontend

#### 蓝湖
https://lanhuapp.com/url/5O4Cq-g0BqY

#### jenkins
https://jks.bybit.com/jenkins/login

#### 翻译工具
https://confluence.bybit.com/pages/viewpage.action?pageId=3637477

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

sanitized-a

顺序 kalel lucky sean talen king len mango vincent




## Git 规范

使用 [commitlint](https://github.com/conventional-changelog/commitlint) 工具，常用有以下几种类型：

- feat ：新功能
- fix ：修复 bug
- chore ：对构建或者辅助工具的更改
- refactor ：既不是修复 bug 也不是添加新功能的代码更改
- style ：不影响代码含义的更改 (例如空格、格式化、少了分号)
- docs ：只是文档的更改
- perf ：提高性能的代码更改
- revert ：撤回提交
- test ：添加或修正测试

举例
git commit -m 'feat: add list'