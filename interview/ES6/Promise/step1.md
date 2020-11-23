
#### step1
- 可以创建promise对象实例。
- promise实例传入的异步方法执行成功就执行注册的成功回调函数，失败就执行注册的失败回调函数。
```js
function MyPromise(fn) {
    let self = this; // 缓存当前promise实例
    self.value = null; //成功时的值
    self.error = null; //失败时的原因
    self.onFulfilled = null; //成功的回调函数
    self.onRejected = null; //失败的回调函数

    function resolve(value) {
        self.value = value;
        self.onFulfilled(self.value);//resolve时执行成功回调
    }

    function reject(error) {
        self.error = error;
        self.onRejected(self.error)//reject时执行失败回调
    }
    fn(resolve, reject);
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    //在这里给promise实例注册成功和失败回调
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
}
module.exports = MyPromise
```
#### 支持同步任务
- 因为是同步任务，所以当我们的promise实例reslove时，它的then方法还没执行到，所以回调函数还没注册上，这时reslove中调用成功回调肯定会报错的。
```js
function resolve(value) {
    //利用setTimeout特性将具体执行放到then之后
    setTimeout(() => {
        self.value = value;
        self.onFulfilled(self.value)
    })
}

function reject(error) {
    setTimeout(() => {
        self.error = error;
        self.onRejected(self.error)
    })
}
```