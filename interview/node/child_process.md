## child_process

Nodejs 基于事件驱动来处理并发，本身是单线程模式运行的。Nodejs 通过使用 child_process 模块来生成多个子进程来处理其他事物。主要包括 4 个异步进程函数(
spawn,exec,execFile,fork
)和 3 个同步进程函数(
spawnSync,execFileSync,execSync
)
以异步函数中 spawn 是最基本的创建子进程的函数，其他三个异步函数都是对 spawn 不同程度的封装。
spawn 只能运行指定的程序，参数需要在列表中给出，而 exec 可以直接运行复杂的命令。

#### spawn

du -sh /disk1
spawn(‘du‘, [‘-sh ‘, ‘/disk1’])
exec(‘du -sh /disk1’)。exec 是会先进行 Shell 语法解析，因此用 exec 函数可以更方便的使用复杂的 Shell 命令，包括管道、重定向等。

child_process.spawn(command[, args][, options])

- command String 将要运行的命令。
- args Array 字符串参数数组。
- options 配置对象：
  - cwd String 子进程的当前工作目录。
  - env Object 环境变量键值对。
  - stdio Array|String 子进程的 stdio 配置。
  - detached Boolean 这个子进程将会变成进程组的领导。
  - uid Number 设置用户进程的 ID。
  - gid Number 设置进程组的 ID。
- 返回值: ChildProcess 对象
- 利用给定的命令以及参数执行一个新的进程，如果没有参数数组，那么 args 将默认是一个空数组。

#### exec

child_process.exec(command[, options], callback)

- command String 将要运行的命令，参数使用空格隔开。
- options 配置对象：
  cwd String 子进程的当前工作目录。
  env Object 环境变量键值对。
  encoding String 字符编码（默认： 'utf8'）。
  shell String 将要执行命令的 Shell（默认: 在 UNIX 中为/bin/sh， 在 Windows 中为 cmd.exe， Shell 应当能识别 -c 开关在 UNIX 中，或 /s /c 在 Windows 中。 在 Windows 中，命令行解析应当能兼容 cmd.exe）。
  timeout Number 超时时间（默认： 0）。
  maxBuffer Number 在 stdout 或 stderr 中允许存在的最大缓冲（二进制），如果超出那么子进程将会被杀死 （默认: 200\*1024）。
  killSignal String 结束信号（默认：'SIGTERM'）。
  detached Boolean 这个子进程将会变成进程组的领导。
  uid Number 设置用户进程的 ID。
  gid Number 设置进程组的 ID
- callback Function 当子进程执行完毕后将会执行的回调函数，参数有：
  error Error
  stdout Buffer
  stderr Buffer
- 返回值: ChildProcess 对象
- 在 Shell 中运行一个命令，并缓存命令的输出。

#### 相同点
1，它们都用于开一个子进程执行指定命令。
2，它们都可以自定义子进程的运行环境。
3，它们都返回一个ChildProcess对象，所以他们都可以取得子进程的标准输入流，标准输出流和标准错误流 。
#### 不同点
1，接受参数的方式： spawn使用了参数数组，而exec则直接接在命令后。

2，子进程返回给Node的数据量： spawn没有限制子进程可以返回给Node的数据大小，而exec则在options配置对象中有maxBuffer参数限制，且默认为200K，如果超出，那么子进程将会被杀死，并报错：Error：maxBuffer exceeded，虽然可以手动调大maxBuffer参数，但是并不被推荐。由此可窥见一番Node.js设置这两个API时的部分本意，spawn应用来运行返回大量数据的子进程，如图像处理，文件读取等。而exec则应用来运行只返回少量返回值的子进程，如只返回一个状态码。

3，调用对象： 虽然在官方文档中，两个方法接受的第一个参数标注的都是command，即要执行的命令，但其实不然。spawn接受的第一个参数为文件，而exec接受的第一个参数才是命令。在Node的源码中关于spawn的部分有如下一段：
```es6
var spawn = exports.spawn = function(file, args, options)
```
而在exec部分则有如下一段：
```es6
 if (process.platform === 'win32') {
file = 'cmd.exe';
args = ['/s', '/c', '"' + command + '"'];
// Make a shallow copy before patching so we don't clobber the user's
// options object.
options = util._extend({}, options);
options.windowsVerbatimArguments = true;
} else {
  file = '/bin/sh';
  args = ['-c', command];
}
```
所以在Windows下直接运行 require('child_process').spawn('dir') 会报异常说没有此文件，而使用exec则不会。若一定要使用spwan，则应写成require('child_process').spawn('cmd.exe',['\s', '\c', 'dir'])。

4，回调函数： exec方法相比spawn方法，多提供了一个回调函数，可以更便捷得获取子进程输出。这与为返回的ChildProcess对象的stdout或stderr监听data事件来获得输出的区别在于：data事件的方式，会在子进程一有数据时就触发，并把数据返回给Node。而回调函数，则会先将数据缓存在内存中（数据量小于maxBuffer参数），等待子进程运行完毕后，再调用回调函数，并把最终数据交给回调函数。