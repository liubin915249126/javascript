## commander.js

```js
#!/usr/bin/env node
// require('commander')  会 new一个commander 内部的单例对象并返回，program 已经是一个实例
const program =require('commander');
program
// usage  仅仅描述了参数规则，会在 --help 中打印出来。
.usage('[option]', '--type required')
// .option 定义了一个参数名和描述，  parse 会解析命令之中的参数，
.option('--type [typeName]', 'type: dev && build')
// 代码定义了 option 类型的参数 --type，执行 .parse 的时候，parse 根据 process.argv 之中的参数，获取到 --type，并把参数命和参数值存储在内部 commander 实例的属性之中，因此后面的代码就能从 program 之中取到 type，如果 type 不存在或者不是我们约定的值，最后我们打印参数错误，并执行help方法打印了 --help
.parse(process.argv);

const {type} = program;
if(type == 'dev'){
    console.log('do something', type)
}else if(type == 'build'){
    console.log('do something', type)
}else{
    console.log('params error');
    program.help();
}
```

#### api/option
示例：.option('-n, --name <items1> [items2]', 'name description', 'default value')
参数解析：
自定义标志<必须>：分为长短标识，中间用逗号、竖线或者空格分割；标志后面可跟必须参数或可选参数，前者用 <> 包含，后者用 [] 包含
选项描述<省略不报错>：在使用 --help 命令时显示标志描述
默认值<可省略>
短标志可以作为单独的参数传递。像 -abc 等于 -a -b -c。多词组成的选项，像“--template-engine”会变成 program.templateEngine 等。

#### api/command
作用：添加命令名称，
示例：`.command('add <num>
参数解析：
命令名称<必须>：命令后面可跟用 <> 或 [] 包含的参数；命令的最后一个参数可以是可变的，像实例中那样在数组后面加入 ... 标志；在命令后面传入的参数会被传入到 action 的回调函数以及 program.args 数组中
命令描述<可省略>：如果存在，且没有显示调用action(fn)，就会启动子命令程序，否则会报错
配置选项<可省略>：可配置noHelp、isDefault等

#### api/alias description usage
定义命令的别名 描述和用法
```js
.alias('r')
.usage('[options] <file ...>')
.description('run setup commands for all envs')
```
#### api/action
定义命令的回调函数 用法示例：.action(fn)