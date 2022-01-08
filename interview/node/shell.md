## shell

Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。
Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

#### shell script

Shell 脚本（shell script），是一种为 shell 编写的脚本程序。
分类：

- Bourne Shell（/usr/bin/sh 或/bin/sh）
- Bourne Again Shell（/bin/bash）
- C Shell（/usr/bin/csh）
- K Shell（/usr/bin/ksh）
- Shell for Root（/sbin/sh）
  所以，像 #!/bin/sh，它同样也可以改为 #!/bin/bash。
  #! 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。

#### 运行 Shell 脚本有两种方法：

1、作为可执行程序
cd 到对应目录

```sh
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
# 一定要写成 ./test.sh，而不是 test.sh，运行其它二进制的程序也一样，直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的，而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 test.sh 是会找不到命令的，要用 ./test.sh 告诉系统说，就在当前目录找。
```

2、作为解释器参数
这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，如：

```sh
/bin/sh test.sh
/bin/php test.php
```

#### shell 变量

```sh
your_name="qinjx"
echo $your_name
echo ${your_name}
```

...

#### Shell 传递参数

向脚本传递参数，脚本内获取参数的格式为：$n
./test.sh 1 2 3

```sh
#!/bin/bash
echo "Shell 传递参数实例！"; # Shell 传递参数实例！
echo "执行的文件名：$0"; # 执行的文件名：./test.sh
echo "第一个参数为：$1"; # `$1` 的值为 1
echo "第二个参数为：$2"; # `$2` 的值为 2
echo "第三个参数为：$3"; # `$3` 的值为 3
```

#### Shell 文件包含

```sh
#使用 . 号来引用test1.sh 文件
. ./test1.sh

# 或者使用以下包含文件代码
source ./test1.sh
```

#### Shell 输入/输出重定向

- command > file 将输出重定向到 file。
- command < file 将输入重定向到 file。
- command >> file 将输出以追加的方式重定向到 file。
- n > file 将文件描述符为 n 的文件重定向到 file。
- n >> file 将文件描述符为 n 的文件以追加的方式重定向到 file。
- n >& m 将输出文件 m 和 n 合并。
- n <& m 将输入文件 m 和 n 合并。
- << tag 将开始标记 tag 和结束标记 tag 之间的内容作为输入。

```sh
# 执行下面的 who 命令，它将命令的完整的输出重定向在用户文件中(users):
$ who > users
```

一般情况下，每个 Unix/Linux 命令运行时都会打开三个文件：
标准输入文件(stdin)：stdin 的文件描述符为 0，Unix 程序默认从 stdin 读取数据。
标准输出文件(stdout)：stdout 的文件描述符为 1，Unix 程序默认向 stdout 输出数据。
标准错误文件(stderr)：stderr 的文件描述符为 2，Unix 程序会向 stderr 流中写入错误信息。

```sh
# stderr 重定向到 file，可以这样写：
$ command 2>file
```

#### node && shell
package.json配置里 scripts 
```sh
#!/usr/bin/env sh
# 当发生错误时中止脚本
set -e
# 构建
npm run build
# cd 到构建输出的目录
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@bitbucket.org:<USERNAME>/<USERNAME>.bitbucket.io.git master
cd -
```
#### shelljs
```js
shell.exec('git add .');
shell.exec("git commit -m 'autocommit'")
shell.exec('git push')
```

