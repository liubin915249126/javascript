## docker study

#### 基本概念
- 镜像 image
  Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。
- 容器 Container
  镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
- 仓库 repository  
  ubuntu:latest ubuntu:16.04
  [Docker Hub](https://hub.docker.com/)

#### 安装
mac 
brew cask install docker  

对于使用 macOS 的用户，在任务栏点击 Docker Desktop 应用图标 -> Perferences，
在左侧导航菜单选择 Docker Engine，在右侧像下边一样编辑 json 文件。修改完成之后，
点击 Apply & Restart 按钮，Docker 就会重启并应用配置的镜像地址了。

{
  "registry-mirrors": [
    "https://dockerhub.azk8s.cn",
    "https://hub-mirror.c.163.com"
  ]
}
docker info

#### 获取镜像
docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]
docker pull ubuntu:18.04
#### 运行镜像
docker run -it --rm \
    ubuntu:18.04 \
    bash
-it：这是两个参数，一个是 -i：交互式操作，一个是 -t 终端。我们这里打算进入 bash 执行一些命令并查看返回结果，因此我们需要交互式终端    

docker image ls
docker image rm [选项] <镜像1> [<镜像2> ...]

#### DockerFile

在 Dockerfile 文件所在目录执行：
docker build -t nginx:v3 .

- COPY
  COPY [--chown=<user>:<group>] <源路径>... <目标路径>
  COPY [--chown=<user>:<group>] ["<源路径1>",... "<目标路径>"]
  COPY package.json /usr/src/app/
  COPY hom* /mydir/
  COPY hom?.txt /mydir/


#### 启动容器
docker run -t -i ubuntu:18.04 /bin/bash
-t 选项让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上， -i 则让容器的标准输入保持打开

当利用 docker run 来创建容器时，Docker 在后台运行的标准操作包括：

- 检查本地是否存在指定的镜像，不存在就从公有仓库下载
- 利用镜像创建并启动一个容器
- 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
- 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
- 从地址池配置一个 ip 地址给容器
- 执行用户指定的应用程序
- 执行完毕后容器被终止

docker container start 命令，直接将一个已经终止的容器启动运行
docker container stop
docker exec -it 69d1 bash 进入容器
docker container rm 来删除一个处于终止状态的容器
docker container prune 删除所有处于终止状态的容器

#### 参考文献
[docker](https://yeasy.gitbooks.io/docker_practice/content/)