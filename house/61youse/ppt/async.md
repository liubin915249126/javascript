## 浏览器事件循环

#### 浏览器多进程
  - 主进程
  - 多个渲染进程
  - 插件进程

#### 渲染进程
  - 包括GUI渲染线程、
       负责渲染页面
  - JavaScript引擎线程、Q:为什么js引擎单线程
    JavaScript 单线程中的任务分为同步任务和异步任务。
    同步任务会在调用栈中按照顺序排队等待主线程执行，
    异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待执行,
  - 事件触发线程、
  - 定时触发器线程、 Q:定时器指定的延时毫秒数其实并不准确
  - http异步请求线程等.

[loop](../../../assets/loop.png)  

#### js 异步发展简史
发展历程:
callback -> pub-sub -> promise -> generator -> async + await
async + await 实际就是 generator 自执行器
```js
   const test = async()=>{
       try{
          const res = await Promise.resolve();
          console.log(res);
       }catch(e){

       }
   }
```


*bold*
**bold**
***bold***