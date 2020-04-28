const isFunction = variable => typeof variable === 'function';

// 定义Promise的三种状态常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  // 构造函数，new 时触发
  constructor(handle: Function) {
    try {
      handle(this._resolve, this._reject);
    } catch (err) {
      this._reject(err);
    }
  }
  // 状态 pending fulfilled rejected
  private _status: string = PENDING;
  // 储存 value，用于 then 返回
  private _value: string | undefined = undefined;
  // 失败队列，在 then 时注入，resolve 时触发
  private _rejectedQueues: any = [];
  // 成功队列，在 then 时注入，resolve 时触发
  private _fulfilledQueues: any = [];
  // resovle 时执行的函数
  private _resolve = val => {
    const run = () => {
      if (this._status !== PENDING) return;
      this._status = FULFILLED;
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = value => {
        let cb;
        while ((cb = this._fulfilledQueues.shift())) {
          cb(value);
        }
      };
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = error => {
        let cb;
        while ((cb = this._rejectedQueues.shift())) {
          cb(error);
        }
      };
      /*
       * 如果resolve的参数为Promise对象，
       * 则必须等待该Promise对象状态改变后当前Promsie的状态才会改变
       * 且状态取决于参数Promsie对象的状态
       */
      if (val instanceof MyPromise) {
        val.then(
          value => {
            this._value = value;
            runFulfilled(value);
          },
          err => {
            this._value = err;
            runRejected(err);
          }
        );
      } else {
        this._value = val;
        runFulfilled(val);
      }
    };
    // 异步调用
    setTimeout(run);
  };
  // reject 时执行的函数
  private _reject = err => {
    if (this._status !== PENDING) return;
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED;
      this._value = err;
      let cb;
      while ((cb = this._rejectedQueues.shift())) {
        cb(err);
      }
    };
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run);
  };
  // then 方法
  then(onFulfilled?, onRejected?) {
    const { _value, _status } = this;
    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      const fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            const res = onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      };

      // 封装一个失败时执行的函数
      const rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            const res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      };

      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);
          break;
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    });
  }
  // catch 方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  // finally 方法
  finally(cb) {
    return this.then(
      value => MyPromise.resolve(cb()).then(() => value),
      reason =>
        MyPromise.resolve(cb()).then(() => {
          throw reason;
        })
    );
  }
  // 静态 resolve 方法
  static resolve(value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
  // 静态 reject 方法
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value));
  }
  // 静态 all 方法
  static all(list) {
    return new MyPromise((resolve, reject) => {
      // 返回值的集合
      let values = [];
      let count = 0;
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(
          res => {
            values[i] = res;
            count++;
            // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
            if (count === list.length) resolve(values);
          },
          err => {
            // 有一个被rejected时返回的MyPromise状态就变成rejected
            reject(err);
          }
        );
      }
    });
  }
  // 添加静态race方法
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
      }
    });
  }
}
