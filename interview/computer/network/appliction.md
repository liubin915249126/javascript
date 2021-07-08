## 网络应用层

#### history

- 1962 基于 分组交换 排队论: 对于突发网络的优势
- 1972-1980 解决网络互联
  极简/自治/尽力服务/无状态路由器/分散控制
- 以太网
- 1983 部署 TCP/IP DNS
- 1990-2000 网络应用 web
  - ISOC 因特网协会成立
  - 浏览器 HTML/HTTP
  - P2P 文件共享/即时通信
- 2005-至今
  - 2000 初 互联网泡沫
  - 宽带/无线接入
  - 社交/购物
  - 网络服务商
  - 云 aws EC2

### 网络应用

eg: search/qq/email/wechat

- c/s web
  - service 7\*24 提供服务、永久性域名/地址、大量服务器/可扩展
  - client 间歇性、动态 IP、客户机之间不通信
- p2p file-share
  - 客户机之间通信
  - 高度可伸缩/难于管理
- hybrid
  - Napster

#### 网络应用进程间通信

消息交换 客户机进程->socket->服务器进程

- 寻址 【主机/进程 IP/端口号】HTTP:80 Mail:25
- 应用层协议
  - 公开协议 eg:HTTP/SMTP 允许互操作/RFC 定义
  - 私有协议 p2p 文件共享应用
  - 消息类型、消息语法/格式、字段语义、规则(何时、如何响应消息)

#### 网络通信需求

数据丢失/可靠性、时间/延迟、带宽、安全

- TCP 建立连接、可靠的数据传输、流量控制、拥塞控制、不提供时延/最小带宽保证
- UDP 无连接、不可靠的数据传输、无流量/拥塞控制、无延迟/带宽保证

### Web 应用

World Wide Web 万维网 1990

- 网页
  - 对象: HTML、pic、vidoe、动态脚本
  - 对象寻址: url/统一资源定位器 Scheme://host:port/path
- 网页互相链接
- Scheme: HTTP: HyperText Transfer protocol(超文本传输协议)
  - TCP 连接
  - 无状态连接 服务器不维护客户端过去行为的信息
    - 需要维护状态
    - 状态不一致的维护

#### Web 应用 -> HTTP 连接类型

- 非持久连接 http1.0 每个 TCP 连接只能传输一个对象
  - 耗时: 2 \* RTT + 文件传输时间
  - 客户端并行建立多个 TCP，服务器建立 TCP 开销资源
- 持久性连接 http1.1 每个 TCP 连接可传输多个对象
  - 无流水的持久性连接 客户端收到前一个响应才发送新的请求 每个 1RTT
  - 有流水持久性连接 遇到资源尽快发起请求 总计 1RTT

#### Web 应用 -> HTTP 消息格式

ASCII
HRAD server 不将请求对象放进响应消息中

- req
  - 请求头
    - 请求行 GET、URL、HTTP1.1(HTTP version)
    - 头部行
  - 消息体
- rep
  - 状态行 HTTP1.1(HTTP version)、http code
  - 消息体

#### Web 应用 -> cookie
网站用来辨认用户身份、存储在 客户端、通常经过加密
req/res 增加 cookie 头部行
隐私问题

#### Web 应用  -> web 缓存
web 缓存/代理服务器技术
- 不访问服务器前提下满足客户端的HTTP请求
- 缩短请求响应时间、减少流量、在大范围内实现有效的内容分发

### 网络应用 -> email 应用
TCP 可靠连接 25
客户端 -> SMTP simple mail transfer protocol -> 邮件服务器
- 邮箱
- 消息队列
- 命令/响应 模式
  - 命令 ASCII 七种 ASCII
  - 响应 状态代码、语句 
【telnet】
【todo】

### DNS Domain Name System
【q1】: 我国没有根域名服务器是否会影响网络安全问题?
【q2】: TCP/UDP ?
【q3】: 其他的应用层服务
- 域名解析系统: IP 地址与域名映射
  - 主机别名
  - 负载均衡
- 应用层协议  
- 分布式数据库
  - 单点失败问题
  - 流量问题
  - 距离问题
  - 维护性问题   
- root -> com/org/edu -> xx.com/xx.org/xx.edu
  本地域名服务器 -> root -> 权威域名服务器
- 顶级域名服务器/国家顶级域名服务器 > 权威域名服务器 > 本地域名服务器(代理)
- 迭代查询 / 递归查询 交给root请求结果
- 本地DNS缓存 缓存顶级域名映射 一段时间缓存失效
- DNS 记录/格式 
  - name value type ttl
    - type A : name: host, value: IP
    - type NS: name: 域edu.cn, value: 域的解析服务器的主机名
    - type CNAME : name: 真实域名的别名 www.ibm.com, value: 真实域名
    - type MX: value 是与 name 对应的邮件服务器 
- DNS 协议/消息
  - 查询回复 消息格式一致    
### p2p 应用
【todo】
### socket 编程
【todo】