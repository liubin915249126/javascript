## 支持支持串行异步任务

```js
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const self = this;
    let bridgePromise;
    //防止使用者不传成功或失败回调函数，所以成功失败回调都给了默认回调函数
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
    if (self.status === FULFILLED) {
        return bridgePromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        })
    }
    if (self.status === REJECTED) {
        return bridgePromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.error);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
    if (self.status === PENDING) {
        return bridgePromise = new MyPromise((resolve, reject) => {
            self.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            self.onRejectedCallbacks.push((error) => {
                try {
                    let x = onRejected(error);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
}
//catch方法其实是个语法糖，就是只传onRejected不传onFulfilled的then方法
MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}
//用来解析回调函数的返回值x，x可能是普通值也可能是个promise对象
function resolvePromise(bridgePromise, x, resolve, reject) {
   //如果x是一个promise
    if (x instanceof MyPromise) {
        //如果这个promise是pending状态，就在它的then方法里继续执行resolvePromise解析它的结果，直到返回值不是一个pending状态的promise为止
        if (x.status === PENDING) {
            x.then(y => {
                resolvePromise(bridgePromise, y, resolve, reject);
            }, error => {
                reject(error);
            });
        } else {
            x.then(resolve, reject);
        }
        //如果x是一个普通值，就让bridgePromise的状态fulfilled，并把这个值传递下去
    } else {
        resolve(x);
    }
}

```