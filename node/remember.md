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