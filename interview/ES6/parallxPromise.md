## 并发请求限制

#### 请求池

定义一个请求池，run 函数每次将等待队列中任务加入到请求池中，
直到塞满或等待队列空。再每个 task 执行完成后通过 finally 继续执行 run 函数，
addTask 为往等待队列中添加任务，并执行 run

```js
const startTime = new Date().getTime()

function taskPool() {
  this.tasks = []
  this.pool = []
  this.max = 2
}

taskPool.prototype.addTask = function (task) {
  this.tasks.push(task)
  this.run()
}

taskPool.prototype.run = function () {
  if (this.tasks.length === 0) return
  let min = Math.min(this.tasks.length, this.max - this.pool.length)
  for (const i = 0; i < min; i++) {
    const currTask = this.tasks.shift()
    this.pool.push(currTask)
    currTask()
      .then((res) => {
        console.log(new Date().getTime() - startTime)
      })
      .catch((err) => {})
      .finally(() => {
        this.pool.splice(this.pool.indexOf(currTask), 1)
        this.run()
      })
  }
}

const pool = new taskPool()
for (let i = 0; i < 5; i++) {
  pool.addTask(function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(i)
      }, 500)
    }).then((res) => {
      console.log('resolved', res)
    })
  })
}

/**

输出：
resolved 0
500
resolved 1
500
resolved 2
1000
resolved 3
1000
resolved 4
1500

**/
```

#### Promise.all

```js
const startTime = new Date().getTime()

function asyncPool(array, limit) {
  let index = 0
  let res = []
  let pool = []

  let run = function () {
    if (index === array.length) {
      return Promise.resolve()
    }

    let item = array[index++]
    let promise = Promise.resolve(item())

    res.push(promise)
    let e = promise.then(() => {
      pool.splice(pool.indexOf(e), 1)
    })
    pool.push(e)
    console.log(`pool size : ${pool.length}`, pool)
    let r = Promise.resolve()
    if (pool.length >= limit) {
      r = Promise.race(pool)
    }
    return r.then(() => run())
  }
  return run().then(() => {
    console.log(res)
    return Promise.all(res)
  })
}

const timeout = (i) => {
  return function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(i)
      }, i)
    })
  }
}

asyncPool(
  [timeout(600), timeout(300), timeout(700), timeout(400), timeout(500)],
  2,
  timeout
).then((res) => {
  console.log(res)
  console.log(new Date().getTime() - startTime)
})

/**
输出
[600, 300, 700, 400, 500]
1500

请求1 2 先发起； 1 2 起始时间 0
2请求完成 继续请求3； 3 起始时间 300
1请求完成 继续请求4； 4 起始时间 600
3请求完成 继续请求5； 5 起始时间 1000
5请求完成，所有请求完成，此时时间 1500 
**/
```

####

```js
class Schedule {
  constructor(maxNum) {
    this.list = []
    this.maxNum = maxNum
    this.workingNum = 0
  }

  add(promiseCreator) {
    this.list.push(promiseCreator)
  }

  start() {
    for (let index = 0; index < this.maxNum; index++) {
      this.doNext()
    }
  }

  doNext() {
    if (this.list.length && this.workingNum < this.maxNum) {
      this.workingNum++
      const promise = this.list.shift()
      promise().then(() => {
        this.workingNum--
        this.doNext()
      })
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

const schedule = new Schedule(2)

const addTask = (time, order) => {
  schedule.add(() =>
    timeout(time).then(() => {
      console.log(order)
    })
  )
}

addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)

schedule.start()
```
