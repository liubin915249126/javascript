import PubSub from './pub-sub.js';
export default class Store {
  constructor(params) {
    let self = this;
    self.actions = {}; // 存储异步方法
    self.mutations = {}; // 存储同步方法
    self.state = {}; // 共享数据
    self.status = 'resting';    // 防止手动更新
    self.events = new PubSub();

    // 参数可以传入初始的actions和mutations
    if(params.hasOwnProperty('actions')) {
      self.actions = params.actions;
    }

    if(params.hasOwnProperty('mutations')) {
      self.mutations = params.mutations;
    }

    // Proxy：es6的方法，起到拦截的作用
    self.state = new Proxy((params.state || {}), {
      set: function(state, key, value) {

        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        self.events.publish('stateChange', self.state);

        // 防止手动更新
        if(self.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`);
        }

        self.status = 'resting';

        return true;
      }
    });
  }

  dispatch(actionKey, payload) { 
    let self = this;

    if(typeof self.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }
  
    console.groupCollapsed(`ACTION: ${actionKey}`);
  
    self.status = 'action';
  
    self.actions[actionKey](self, payload);
  
    console.groupEnd();
  
    return true;
   }

  commit(mutaionKey, payload) { 
    let self = this;

    if(typeof self.mutations[mutationKey] !== 'function') {
    console.log(`Mutation "${mutationKey}" doesn't exist`);
    return false;
    }

    self.status = 'mutation';

    let newState = self.mutations[mutationKey](self.state, payload);

    self.state = Object.assign(self.state, newState);

    return true;
   }
}