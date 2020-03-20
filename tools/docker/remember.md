## docker
### docker 部署 vue

#### 获取 nginx 镜像

docker pull nginx

#### nginx config
在项目根目录下创建nginx文件夹，该文件夹下新建文件default.conf
```conf
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

```
该配置文件定义了首页的指向为 /usr/share/nginx/html/index.html,
所以我们可以一会把构建出来的index.html文件和相关的静态资源放到/usr/share/nginx/html目录下

#### 创建 Dockerfile 文件
```dockerfile
    FROM nginx
    COPY dist/ /usr/share/nginx/html/
    COPY nginx/default.conf /etc/nginx/conf.d/default.conf
```
自定义构建镜像的时候基于Dockerfile来构建。
FROM nginx 命令的意思该镜像是基于 nginx:latest 镜像而构建的。
COPY dist/ /usr/share/nginx/html/ 命令的意思是将项目根目录下dist文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下。
COPY nginx/default.conf /etc/nginx/conf.d/default.conf 命令的意思是将nginx目录下的default.conf 复制到 etc/nginx/conf.d/default.conf，用本地的 default.conf 配置来替换nginx镜像里的默认配置。

#### 基于该Dockerfile构建vue应用镜像
```zsh
    docker build -t vuenginxcontainer .
    // -t 是给镜像命名 . 是基于当前目录的Dockerfile来构建镜像
    // 查看本地镜像，运行命令
    docker image ls | grep vuenginxcontainer
```
#### 启动 vue app 容器
镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，
镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等
```zsh
    docker run \
    -p 3000:80 \
    -d --name vueApp \
    vuenginxcontainer
```
- docker run 基于镜像启动一个容器
- -p 3000:80 端口映射，将宿主的3000端口映射到容器的80端口
- -d 后台方式运行
- --name 容器名 查看 docker 进程
```zsh
   docker ps
```
### docker 部署node

#### 获取 node 镜像
docker pull node
#### 编写 Dockerfile 将 express 应用 docker 化
```dockerfile
FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
```
构建镜像的时候 node_modules 的依赖直接通过 RUN npm install 来安装，
项目中创建一个 .dockerignore文件来忽略一些直接跳过的文件：
```dockerignor
node_modules
npm-debug.log
```
#### 构建 nodewebserver 镜像
```zsh
   docker build -t nodewebserver .
```
#### 启动 nodeserver 容器

基于刚刚构建的 nodewebserver 镜像 
启动一个名为 nodeserver 的容器来提供接口服务8080端口，并映射宿主的5000端口
```zsh
docker run \
-p 5000:8080 \
-d --name nodeserver \
nodewebserver
```
访问 http://localhost:5000/json 

#### 查看 nodeserver 容器的 ip 地址：
- 进入容器内部查看
    docker exect -it 02277acc3efc zsh
    cat /etc/hosts
- docker inspect [ containerId ] 直接查看容器信息    
    docker inspect 02277acc3efc

#### 修改 nginx 配置
```nginxconf
    location /api/ {
      rewrite  /api/(.*)  /$1  break;
      proxy_pass http://172.17.0.2:8080;  //node
    }

```
#### 改进
在构建镜像的时候 不把 Nginx 配置复制到镜像中，而是直接挂载到宿主机上，每次修改配置后，直接重启容器即可。

#### 重新运行vue应用容器
直接基于nginx镜像来启动容器 vuenginxnew ，运行命令
```zsh
docker run \
-p 3000:80 \
-d --name vuenginxnew \
--mount type=bind,source=$HOME/SelfWork/docker/vueclidemo/nginx,target=/etc/nginx/conf.d \
--mount type=bind,source=$HOME/SelfWork/docker/vueclidemo/dist,target=/usr/share/nginx/html \
nginx

```
- --mount type=bind,source={sourceDir},target={targetDir} 将宿主机的sourceDir 挂载到容器的 targetDir 目录上。
- 此处运行的命令较长，如果每次重新输入难免麻烦，我们可以将完整的命令保存到一个shell文件 vueapp.sh 中，然后直接执行 sh vueapp.sh。

#### 配置负载均衡
```nginxconf
   
  upstream backend {
      server 172.17.0.2:8080;
      server 172.17.0.3:8080;
  }

  ……

  location /api/ {
      rewrite  /api/(.*)  /$1  break;
      proxy_pass backend;
  }
 
```

#### 
不习惯命令行的同学可以选用 [Kitematic](https://docs.docker.com/kitematic/userguide/) 来管理docker容器的状态、数据目录和网络 


#### 参考链接
快狗打车
https://juejin.im/post/5cce4b1cf265da0373719819
