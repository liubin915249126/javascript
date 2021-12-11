#### extensions

```js
    Chinese (Simplified) Language Pack for Visual Studio Code
    GitLens — Git supercharged
    GraphQL for VSCode
    Prettier - Code formatter
    Remote VSCode
    StandardJS - JavaScript Standard Style
    Dart
    Flutter
    Remote VSCode
    TabNine
    Debugger for Chrome
    REST Client
    CSS Peek
    Auto Rename Tag
    i18n Ally
    Git Graph
    Easy LESS
    Rainbow Brackets
    Live Server
    Copilot
    code Runner
    project-tree
    Lombok Annotations Support for VS Code
    Language Support for Java(TM) by Red Hat
    Debugger for Java
    Java Test Runner
    Maven for Java

```
#### code
启动 VS Code
打开命令面板 (shift + cmmand + P) ，输入 shell command’，找到: “Install ‘code’ command in PATH”，点击就可以了
or
vim ~/.bash_profile
alias vscode="你的安装目录/vscode.app/Contents/Resources/app/bin/code"
source ~/.bash_profile

#### remote development
[](https://zhuanlan.zhihu.com/p/82568294)
1.安装 SSH Client： 
   Get-WindowsCapability -Online | ? Name -like 'OpenSSH*'
   Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
2.配置 SSH key
   cd %USERPROFILE%/.ssh
   ssh-keygen -t rsa -b 4096

#### Easy LESS
    
    "less.compile": {
        "outExt": ".wxss"
    }

#### debugger

```js
   {
    // 使用 IntelliSense 了解相关属性。
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations":[


        {
            "name":"启动",
            "type": "node",
            "request": "launch",
            "program": "${workspaceFolder}/operate_manager/server.js"
        }
    ]
}
```

#### Debugger for Chrome

```js
   {
    // 使用 IntelliSense 了解相关属性。
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [

        {
            "type": "chrome",
            "request": "launch", //launch / attach 两种方式；这里使用launch
            "name": "Launch Chrome against localhost",//开心的设置个名字
            "url": "http://localhost:9000",//项目地址
            "webRoot": "${workspaceFolder}/react-demo/"
            //这一块设置时要注意！webRoot指定网络服务器根目录的工作区绝对路径。
            ${workspaceFolder}应该时表示编辑器里的根目录，我的项目是react-demo，
            所以选择webRoot修改如上，具体路径还跟webpack配置的资源根目录也有关系

        }
        //还有很多可以配置的属性，可以通过上面文档查看
    ]
}
```
#### iterm2
[iterm2](https://iterm2.com/)
```bash
ctrl + u 清除当前行输入
ctrl + a 快速切换到当前输入的文本头部
ctrl + e 快速切换到当前输入的文本尾部
cmd + d 垂直分屏
cmd + shift + d 水平分屏
cmd + r 清屏
cmd + t 打开一个新的 iterm2 Tab
cmd + 左右方向键 左右切换 Tab
cmd + n 打开一个新的 iterm2 窗口
cmd + 回车 全屏切换
cmd + w 关闭标签
cmd + f 查找
cmd + shift + h 查看剪贴板历史

cd ./Desktop/github
```

