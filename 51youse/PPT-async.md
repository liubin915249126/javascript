## js 异步发展简史

发展历程:
callback -> pub-sub -> promise -> generator -> async + await

#### callback

>

```js
ajax(url, () => {
  // 处理逻辑
  ajax(url1, () => {
    // 处理逻辑
    ajax(url2, () => {
      // 处理逻辑
    });
  });
});
```

回调地狱，代码难以维护

>

#### pub-sub 发布订阅

```js
export default class PubSub {
  constructor() {
    // events里存放的是所有的具名事件
    this.events = {};
  }

  //  提供订阅功能
  subscribe(event, callback) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }
    // 没有做去重
    return self.events[event].push(callback);
  }
  // 提供发布功能
  publish(event, data) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      return [];
    }

    return self.events[event].map(callback => callback(data));
  }
}
```

参考另一个工程：
[pub-sub](https://github.com/liubin915249126/react-study/tree/dva/src/pub-sub)

#### promise

>

- 由[asap](https://github.com/kriskowal/asap)源码可以看出
  浏览器 Promise 事件调度走的是 MutationObserver,node 走的是 process.nextTick
- Promise 存在三种状态:
  由 Pending 可以变为 Fulfilled 或者 Rejected，切一旦变化就不会再更改

```js
    Pending----Promise对象实例创建时候的初始状态
    Fulfilled----可以理解为成功的状态
    Rejected----可以理解为失败的状态
```

```js
Promise.resolve(1) //每次调用返回的都是一个新的Promise实例(这就是then可用链式调用的原因)
  .then(x => x + 1)
  .then(x => {
    throw new Error("My Error"); //如果then中出现异常,会走下一个then的失败回调
  })
  .catch(() => 1) //return -> 包装成 Promise.resolve(1)
  .then(x => x + 1)
  .then() //参数穿透
  .then(x => console.log(x)) //2
  .catch(console.error); //catch 会捕获到没有捕获的异常
```

手写 [Promise](https://github.com/liubin915249126/javascript/blob/master/interview/function/promise.js)

缺点：
  - 无法取消 Promise
  - 当处于pending状态时，无法得知目前进展到哪一个阶段
  - 错误不能被 try catch
>

#### 生成器 Generators/ yield

[迭代器](https://github.com/liubin915249126/javascript/blob/master/interview/RN/iterator.js)

Generator 可以中断函数的执行，这就为我们用同步方式写异步提供了可能

```js
function* foo(x) {
  let y = 2 * (yield x + 1); //yield可暂停，next方法可启动，每次返回的是yield后的表达式结果
  let z = yield y / 3; //yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
  return x + y + z;
}
let it = foo(5);
console.log(it.next()); // => {value: 6, done: false}
console.log(it.next(12)); // => {value: 8, done: false}
console.log(it.next(13)); // => {value: 42, done: true}
```

```js
var fetch = require("node-fetch");
function* gen() {
  var r1 = yield fetch("https://api.github.com/users/github");
  var r2 = yield fetch("https://api.github.com/users/github/followers");
  var r3 = yield fetch("https://api.github.com/users/github/repos");

  console.log([json1.bio, json2[0].login, json3[0].full_name].join("\n"));
}
```

对于上面三个请求我们可以这样写

```js
var g = gen();
var result1 = g.next();

result1.value
  .then(function(data) {
    return data.json();
  })
  .then(function(data) {
    return g.next(data).value;
  })
  .then(function(data) {
    return data.json();
  })
  .then(function(data) {
    return g.next(data).value;
  })
  .then(function(data) {
    return data.json();
  })
  .then(function(data) {
    g.next(data);
  });
```

更好的办法是使用递归

##### 递归

```js
function run(gen) {
  var g = gen();
  function next(data) {
    var result = g.next(data);
    result.value
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        next(data);
      });
  }

  next();
}

run(gen);
```

[co](https://github.com/tj/co)这个库所做的事情
co(gen)即自执行 generator

参考文献 [Generators](https://github.com/mqyqingfeng/Blog/issues/99)

#### async await

自带 generator 执行器

```js
  async //返回一个Promise
  await //后面跟一个Promise
```

```js
function fetch() {
  return fetchData()
    .then(value1 => {
      return fetchMoreData(value1);
    })
    .then(value2 => {
      return fetchMoreData2(value2);
    });
}

async function fetch() {
  const value1 = await fetchData();
  const value2 = await fetchMoreData(value1);
  return fetchMoreData2(value2);
}
```

```js
const fetchData = data =>
  new Promise(resolve => setTimeout(resolve, 1000, data + 1));
const fetchValue = async function() {
  var value1 = await fetchData(1);
  var value2 = await fetchData(value1);
  var value3 = await fetchData(value2);
  console.log(value3);
};
fetchValue();
```
[手写async函数](https://github.com/liubin915249126/javascript/blob/master/interview/function/Promise.md)

实际应用:
[“异步的” setState 如何同步获取 state](https://github.com/liubin915249126/javascript/blob/master/interview/react-vue/setStateSync.md)
这篇文章有详细的说明

```js
  setStateAsync(state){
   return new Promise (resolve =>{
      this.setState(state,resolve)
    })
  }
```

[babel](https://github.com/liubin915249126/javascript/blob/master/interview/RN/babel.js)编译的结果

测试题 2

```js
async function test1() {
  await new Promise(resolve => {
    setTimeout(() => resolve(), 0);
  }).then(() => console.log(1));
  setTimeout(() => console.log(2), 0);
  new Promise(resolve => {
    console.log(3);
    resolve();
  }).then(() => {
    console.log(4);
  });
  console.log(5);
}
test1().then(() => {
  console.log(7);
});
console.log(6);
// 6135472
```

- [原文地址](https://github.com/liubin915249126/javascript/blob/master/51youse/PPT-async.md) js 异步发展简史
- 另外我的博客地址 [blog](https://github.com/liubin915249126/javascript)会经常分享 最近的学习内容，项目中遇到的问题及解决方案
