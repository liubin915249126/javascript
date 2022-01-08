## bin
全局安装vue-cli之后,就能在任何目录使用vue create xxx来创建项目
其实是用到了bin字段+符号链接。

bin 里的文件都会被 npm/scripts 捕获

#### bin
```json
// 安装npm包的时候，把可执行的脚本文件也安装下来，就会用到这个bin字段。
{
    "bin":{
        "jest": "./bin/jest.js"
    }
}
```
#### 再看符号链接（软链接）

符号链接是一种特殊的文件，包含指定文件的路径引用，类似于桌面的快捷打开方式。
在项目中局部安装jest包后，npm会在项目中的node_modules/.bin目录下创建一条符号链接，点击这个文件，就会链接到bin字段中定义的jest.js文件：