## requestAnimationFrame


一般浏览器的刷新率为60HZ，即1秒钟刷新60次。1000ms / 60hz = 16.6 ，大概每过16.6ms浏览器会渲染一帧画面。
在这段时间内，浏览器大体会做两件事：task与render。
task被称为宏任务，包括 setTimeout，setInterval，setImmediate，postMessage，requestAnimationFrame，I/O，DOM 事件 等。
render是指渲染页面。

task执行过程中如果调用 Promise、MutationObserver、process.nextTick 会将其作为 微任务 保存在microTask queue中。
每当执行完task，在执行下一个task前，都需要检查 microTask queue，执行并清空里面的microTask。在当前的微任务没有执行完成时，是不会执行下一个宏任务的。


#### setTimeout
setTimeout的真正作用是，在“任务队列”的现有事件的后面再添加一个事件，规定在指定时间执行某段代码。setTimeout添加的事件，会在下一次Event Loop执行。 setTimeout(f,0)将第二个参数设为0，作用是让f在现有的任务（脚本的同步任务和“任务队列”中已有的事件）一结束就立刻执行。也就是说，setTimeout(f,0)的作用是，尽可能早地执行指定的任务。

#### 浏览器一帧
- 接受输入事件
- 执行事件回调
- 开始一帧
- 执行 RAF (RequestAnimationFrame) 但此刻执行的是上一帧注册的（动画）事件！
- 页面布局，样式计算
  - parse html css js -> dom tree
    如果JS中调用了 requestAnimationFrame()，此时只会注册该事件，放在下一帧执行。之所以不立即执行，且在页面解析之前再执行上一帧设置的事件，是为了避免（动画）事件的执行导致页面反复的重排重绘。当然，也正是因为每一帧的图像不同，才有了一个动画交互的效果。
    遇到JS就调用（交给）V8引擎处理，所以V8引擎和JS的执行是在 渲染主线程 中完成的。另外JS可能会操作DOM、修改CSS，从而导致页面重排，所以 JS的执行是同步的，即 会阻塞页面渲染！
  - Recalc Styles 重新计算样式，生成 CSS Tree
  - Layout 合并 DOM Tree 和 CSS Tree，生成 Layer Tree
    当然，Layer Tree与 DOM Tree 不一定是一一对应的，比如对某个DOM元素设置了隐藏，使用CSS伪元素。
  - Update Layer Tree 更新Layer Tree，生成 层叠上下文
  - Paint 遍历层级，计算层叠上下文，形成一个层级记录表，记录图层绘制的先后顺序。
- 绘制渲染
  update rendering（视图渲染）发生在本轮事件循环的microtask队列被执行完之后
- 执行 RIC (requestIdleCallback)

#### requestAnimationFrame 比起 setTimeout、setInterval的优势主要有两点：
- 1、requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，
  并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
- 2、在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，
  这当然就意味着更少的的cpu，gpu和内存使用量。

#### 改变 interval
```js
//requestAnimationFrame效果
    (function animloop() {
        //记录当前时间
        nowTime = Date.now()
        // 当前时间-上次执行时间如果大于diffTime，那么执行动画，并更新上次执行时间
        if(nowTime-lastTime > diffTime){
            lastTime = nowTime
            render();
        }
        requestAnimationFrame(animloop);

    })()
```
