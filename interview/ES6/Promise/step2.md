## 支持三种状态
- 实现promise的三种状态。
- 实现promise对象的状态改变，改变只有两种可能：从pending变为fulfilled和从pending变为rejected。
- 实现一旦promise状态改变，再对promise对象添加回调函数，也会立即得到这个结果。
```js
   //定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(fn) {
    let self = this;
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onFulfilled = null;
    self.onRejected = null;

    function resolve(value) {
        //如果状态是pending才去修改状态为fulfilled并执行成功逻辑
        if (self.status === PENDING) {
            setTimeout(function() {
                self.status = FULFILLED;
                self.value = value;
                self.onFulfilled(self.value);
            })
        }
    }

    function reject(error) {
        //如果状态是pending才去修改状态为rejected并执行失败逻辑
        if (self.status === PENDING) {
            setTimeout(function() {
                self.status = REJECTED;
                self.error = error;
                self.onRejected(self.error);
            })
        }
    }
    fn(resolve, reject);
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === PENDING) {
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;
    } else if (this.status === FULFILLED) {
        //如果状态是fulfilled，直接执行成功回调，并将成功值传入
        onFulfilled(this.value)
    } else {
        //如果状态是rejected，直接执行失败回调，并将失败原因传入
        onRejected(this.error)
    }
    return this;
}
module.exports = MyPromise
```

#### 支持链式操作
```js
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
    } else if (this.status === FULFILLED) {
        onFulfilled(this.value)
    } else {
        onRejected(this.error)
    }
    return this;
}
```
[step2.js](./step2.js)