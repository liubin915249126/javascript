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
