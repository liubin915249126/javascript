```bash
   # 软链接指向到node npm
   ln -s /usr/local/node/node10.13.0/bin/node  /usr/local/bin/node
   ln -s /usr/local/node/node10.13.0/bin/npm  /usr/local/bin/npm 
```

#### write cli
https://www.jianshu.com/p/30cf8cb86ab3
https://github.com/CavinHuang/node-cli-demo
(create-react-app)[https://zhuanlan.zhihu.com/p/69633878]

####  debugger 
--inspect-brk
chrome://inspect

#### 
>
   ~2.2.1 // 接受2.2.1，不接受2.3.0
   ^2.2.1 // 接受2.2.1和2.3.0

   ~2.2 // 接受2.2.0和2.2.1，不接受2.3.0
   ^2.2 // 接受2.2.0、2.2.1和2.3.0

   ~2 // 接受2.0.0、2.1.0、2.2.0、2.2.1和2.3.0
   ^2 // 接受2.0.0、2.1.0、2.2.0、2.2.1和2.3.0
>
#### nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

nvm ls-remote：列出所有可以安装的node版本号
nvm install v10.4.0：安装指定版本号的node
nvm use v10.3.0：切换node的版本，这个是全局的
nvm current：当前node版本
nvm ls：列出所有已经安装的node版本