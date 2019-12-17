#### 安装
[mac](https://download.docker.com/mac/stable/Docker.dmg)
[windows](https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe)
[linux](https://get.docker.com/)

#### 概念
Dockerfile: 类似于“package.json”
 |
 V
Image: 类似于“Win7纯净版.rar”
 |
 V
Container: 一个完整操作系统

#### 命令
>bash
   docker image build ./ -t hello-docker:1.0.0 # 打包镜像
   // 基于路径./（当前路径）打包一个镜像，镜像的名字是hello-docker，版本号是1.0.0。该命令会自动寻找Dockerfile来打包出一个镜像
   docker images  //查看本机已有的镜像
   
   // 根据镜像创建容器
   docker container create -p 2333:80 hello-docker:1.0.0
   docker container start xxx # xxx 为上一条命令运行得到的结果
   //我们使用docker container create来创建基于hello-docker:1.0.0镜像的一个容器，使用-p来指定端口绑定——将容器中的80端口绑定在宿主机的2333端口。执行完该命令，会返回一个容器ID
   而第二个命令，则是启动这个容器
   
   //进入容器 
   docker container exec -it xxx /bin/bash # xxx 为容器ID
>