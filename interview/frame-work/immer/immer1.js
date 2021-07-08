function produce(base, producer) {
  const baseProxy = createProxy(undefined, base); /* 创建代理 */
  producer.call(baseProxy, baseProxy); /* 执行 mutable 操作 */
  return finalize(baseProxy); /* 递归合成新对象 */
}

function createState(parent, base) {
  /* base 对象代理 */
  return {
    modified: false /* 表示该对象是否已经被更改 */,
    base /* 原始对象*/,
    parent,
    copy: undefined /* 对原始对象的改动最终都会在这里保存一份 */,
    proxies: {} /* 存储对象子节点的代理 */,
  };
}

function markChanged(state) {
  state.modified = true;
  state.copy = Object.assign(Object.create(null), state.base);
  Object.assign(state.copy, state.proxies);
  if (state.parent) markChanged(state.parent);
}

const _STATE_ = "_______";

function createProxy(parent, base) {
  const state = createState(parent, base);
  const proxy = Proxy.revocable(state, {
    get: function (state, prop) {
      if (prop === _STATE_)
        return state; /* 如果能通过 _STATE_ 拿到数据，表明它是一个 proxy */
      if (state.modified) {
        const value = state.copy[prop];
        /* 只有 base 的才有必要去 proxy，否则如果是新增的的对象则直接返回 */
        if (
          value === state.base[prop] &&
          toString.call(value) === "[object Object]"
        ) {
          state.copy[prop] = createProxy(state, value);
          return state.copy[prop];
        }
        return value;
      } else {
        /* 如果没有改动过数据，那仅仅是创建一个代理 */
        if (state.proxies[prop]) return state.proxies[prop];
        const value = state.base[prop];
        if (toString.call(value) === "[object Object]") {
          state.proxies[prop] = createProxy(state, value);
          return state.proxies[prop];
        }
        return value;
      }
    },
    set: function (state, prop, value) {
      if (!state.modified) {
        markChanged(state);
      }
      state.copy[prop] = value; /* 修改对象都在 copy 上执行 */
    },
  });
  return proxy.proxy;
}

function finalize(rootProxy) {
  if (!!rootProxy && rootProxy[_STATE_]) {
    const state = rootProxy[_STATE_];
    for (let key in state.copy) {
      if (state.copy[key] !== state.base[key]) {
        state.copy[key] = finalize(state.copy[key]);
      }
    }
    return state.copy;
  } else {
    return rootProxy;
  }
}

module.exports = {
  produce,
};
