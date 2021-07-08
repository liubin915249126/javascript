笔试实践
笔试更多的是考验应聘者的逻辑思维能力和代码书写风格，主要包含以下几个方面：

正则表达式

算法

数据结构

设计模式

框架的部分原理实现

TypeScript 语法

模板解析
数据结构

使用 TypeScript 语法将没有层级的扁平数据转换成树形结构的数据

模板解析
实现一个简易的模板引擎
const template = '嗨，{{ info.name.value }}您好，今天是星期 {{ day.value }}';

const data = {
  info: {
    name: {
      value: '张三'
    }
  },
  day: {
    value: '三'
  }
};

render(template, data); // 嗨，张三您好，今天是星期三
设计模式
简单实现一个发布 / 订阅模式
正则表达式
匹配出字符串中 const a  = require('xxx') 中的 xxx