## generator

```js
// 分析一个简单例子
function* helloGenerator() {
  yield "hello";
  yield "generator";
  return;
}

var h = helloGenerator(); //返回一个遍历器
// 第一次调用next()，执行到"yield hello"，暂缓执行,并返回了"hello"
console.log(h.next()); //{ value: 'hello', done: false }
// 第二次调用next()，继续上一次的执行，执行到"yield generator",暂缓执行，并返回了"generator"。
console.log(h.next()); //{ value: 'generator', done: false }
// 第三次调用next(),直接执行return，并返回done:true，表明结束
console.log(h.next()); //{ value: 'undefined', done: true }
//  yield实际就是暂缓执行的标示，每执行一次next()，相当于指针移动到下一个yield位置
```

#### 应用

```js
//准备
function prepare(sucess) {
  setTimeout(function () {
    console.log("prepare chicken");
    sucess();
  }, 500);
}
//流程控制
function run(fn) {
  const gen = fn();
  function next() {
    //返回工序函数的句柄给result
    const result = gen.next();
    if (result.done) return; //结束
    // result.value就是yield返回的值，是各个工序的函数
    result.value(next); //next作为入参，即本工序成功后，执行下一工序
  }
  next();
}
//工序
function* task() {
  yield prepare;
  yield prepare;
  yield prepare;
  yield prepare;
  yield prepare;
}
run(task); //开始执行
```
