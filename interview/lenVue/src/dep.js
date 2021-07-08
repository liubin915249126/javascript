/* dep.js */

class Dep {
    constructor() {
      // 存储观察者
      this.subs = []
    }
    // 添加观察者
    addSub(sub) {
      // 判断观察者是否存在 和 是否拥有update方法
      if (sub && sub.update) {
        this.subs.push(sub)
      }
    }
    // 通知方法
    notify() {
      // 触发每个观察者的更新方法
      this.subs.forEach((sub) => {
        sub.update()
      })
    }
  }
  
  