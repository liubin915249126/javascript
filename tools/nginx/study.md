## nginx 配置

#### 应用

- 静态资源服务器
- 动态匹配
- 反向代理
- Gzip 压缩
- 负载均衡

#### 主要配置

1.Global: nginx 运行相关

- 全局块：配置影响 nginx 全局的指令。一般有运行 nginx 服务器的用户组，nginx 进程 pid 存放路径，日志存放路径，配置文件引入，允许生成 worker process 数等。

2. events: 与用户的网络连接相关
   - events 块：配置影响 nginx 服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。
3. http
   - http 块：可以嵌套多个 server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type 定义，日志自定义，是否使用 sendfile 传输文件，连接超时时间，单连接请求数等。

#### server

了解了以上 Nginx 配置文件结构后，今天主要学习 http 块中的 server。server 块，用于配置虚拟主机的相关参数，一个 http 中可以有多个 server。

```conf
   server {
  # 配置网络监听
  # 监听所有的 80
  listen 80;

  # 基于名称的虚拟主机配置
  server_name design.luweitech.cn;

  # 配置请求的根目录
  # Web 服务器收到请求后，首先要在服务端指定的目录中寻找请求资源
  root /xxx/abc;

  # 设置网站的默认首页
  index index.html;

  location / {
    proxy_pass http://localhost:端口号;
  }

  location /favicon.ico {
    # 过期时间设置 12 小时
    expires 12h;
  }

  location ~ .*\.(js|css)?$ {
     # proxy_pass http://localhost:端口号;
     expires 12h;
  }
}

```
#### server_name
基于名称的虚拟主机配置、
server_name 是虚拟服务器的识别路径，不同的域名会通过请求头中的HOST字段，匹配到特定的server块，转发到对应的应用服务器中去。
```conf
   server {
  listen  80;
  server_name www.xxx.com;
  location / {
    proxy_pass http://localhost:6002;
  }
}
 
server {
  listen 80;
  server_name www.xxx.*;
  location / {
    proxy_pass http://localhost:6003;
}
  
```
访问 www.xxx.com Nginx会转发到 http://localhost:6002
访问 www.xxx.org Nginx会转发到 http://localhost:6003

#### index
设置网站的默认首页

index 指令主要有 2 个作用：
- 对请求地址没有指明首页的，指定默认首页
- 对一个请求，根据请求内容而设置不同的首页，比如：
```conf
   location ~ ^/luwei/(.+)/web/$ {
    index index.$1.html index.htm;
   }
```
#### location
- location   =   /uri         =开头表示精确前缀匹配，只有完全匹配才能生效。
- location   ^~   /uri        ^~开头表示普通字符串匹配上以后不再进行正则匹配。
- location   ~   pattern     ~开头表示区分大小写的正则匹配。
- location   ~*   pattern    ~*开头表示不区分大小写的正则匹配。
- location   /uri                  不带任何修饰符，表示前缀匹配。
- location   /                       通用匹配，任何未匹配到其他location的请求都会匹配到。

- alias
  ```conf
     location   /test/  {
        alias    /usr/local/;
    }
  ```
  请求/test/1.jpg（省略了协议和域名），将会返回文件/usr/local/1.jpg。
  ```conf
    location   ~*   /img/(.+\.(gif|png|jpeg)) {
       alias     /usr/local/images/$1;
    } 
  ```
  请求中只要能匹配到正则，比如/img/flower.png  或者  /resource/img/flower.png，都会转换为请求/usr/local/images/flower.png。
- root
  ```conf
    location   /test/  {
      root    /usr/local/;
    }
  ```
  请求/test/1.jpg，将会返回文件/usr/local/test/1.jpg。
- proxy_pass
  反向代理配置，用于代理请求，适用于前后端负载分离或多台机器、服务器负载分离的场景，
  在匹配到location配置的URL路径后，转发请求到proxy_pass配置额URL，
  是否会附加location配置路径与proxy_pass配置的路径后是否有"/"有关，有"/"则不附加，如：
  ```conf
    location   /test/  {
      proxy_pass    http://127.0.0.1:8080/;
    }
  ```
  请求/test/1.jpg，将会被nginx转发请求到http://127.0.0.1:8080/1.jpg（未附加/test/路径）