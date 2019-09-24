export default class PubSub {
    constructor() {
      // events里存放的是所有的具名事件
      this.events = {};
    }
  
    //  提供订阅功能
    subscribe(event, callback) {
        let self = this;

        if(!self.events.hasOwnProperty(event)) {
          self.events[event] = [];
        }
        // 没有做去重
        return self.events[event].push(callback);
    }
  
    // 提供发布功能
    publish(event, data) {
        let self = this;

        if(!self.events.hasOwnProperty(event)) {
          return [];
        }
      
        return self.events[event].map(callback => callback(data));
      }
    }