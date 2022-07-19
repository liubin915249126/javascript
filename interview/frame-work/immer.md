#### createDraftstate方法是浅复制方法。

```js
const isObject = (val) => Object.prototype.toString.call(val) === '[object Object]';
const isArray = (val) => Object.prototype.toString.call(val) === '[object Array]';
const isFunction = (val) => typeof val === 'function';

function createDraftstate(targetState) {
    if (isObject) {
        return Object.assign({}, targetState)
    } else if (isArray(targetState)) {
        return [...targetState]
    } else {
        return targetState
    }
}
```
#### 入口方法
```js
// targetState是需要被拷贝的对象, 也就是上面例子中的obj1。
// producer是开发者传入的处理方法。
// toProxy是生成一个代理对象的方法, 这个代理对象用来记录用户都为那些属性赋值。
// 最终返回一个复制完毕的对象即可, 这里具体逻辑有点'绕'后面再说。
function produce(targetState, producer) {
    let proxyState = toProxy(targetState)
    producer(proxyState);
    return // 返回最终生成的可用对象
}
```
#### 核心代理方法 toProxy
这个方法核心能力就是对操作目标对象的记录, 下面是基本的方法结构演示:
```js
// internal对象是详细的记录下每个代理对象的各种值, 比如obj2.name会生成一个自己的internal, obj2.name.nickname也会生成一个自己的internal,这里有点抽象大家加油。
// targetState: 记录了原始的值, 也就是传入值。
// keyToProxy: 记录了哪些key被读取了(注意不是修改了), 以及key对应的值 。
// changed: 当前这一环的key值是否被修改。
// draftstate: 当前这一环的值的浅拷贝版本。
function toProxy(targetState) {
    let internal = {
        targetState,
        keyToProxy: {},
        changed: false,
        draftstate: createDraftstate(targetState),
    }
    return new Proxy(targetState, {
        get(_, key) {
        },
        set(_, key, value) {
        }
    })
}

```

####  get与set方法
```js
// get方法:

// if (key === INTERNAL)return internal: 这里是为了后续可以利用这个key获取到internal实例。
// 每次取值会判断这个key是否有对应的代理属性, 如果没有则递归使用toProxy方法生成代理对象。
// 最终返回的是代理对象
// set方法:

// 每次使用set哪怕是相同的赋值我们也认为是发生了改变, changed属性变成true。
// draftstate[key]也就是自身的浅拷贝的值, 变成了开发者主动赋予的值。
// 最终生成的obj2其实就是由所有draftstate组成的。

get(_, key) {
    if (key === INTERNAL) {
        return internal
    }
    const val = targetState[key];
    if (key in internal.keyToProxy) {
        return internal.keyToProxy[key]
    } else {
        internal.keyToProxy[key] = toProxy(val, () => {
            internal.changed = true;
            const proxyChild = internal.keyToProxy[key];
            internal.draftstate[key] = proxyChild[INTERNAL].draftstate;
            backTracking()
        })
    }
    return internal.keyToProxy[key]
},
set(_, key, value) {
    internal.changed = true;
    internal.draftstate[key] = value
    backTracking()
    return true
}
// get内部:

// 每次调用toProxy生成代理对象都传递一个方法, 这个方法如果被触发则changed被改为true, 也就是记录自身为被修改过的状态。
// proxyChild: 获取到发生改变的子集。
// internal.draftstate[key] = proxyChild[INTERNAL].draftstate;: 将子集的修改后的值赋予给自己。
// backTracking(): 因为自己的值改变了, 所以让自己的父级执行相同操作。
// set内部:

// backTracking(): 执行父级传递进来的方法, 迫使父级改变并将key指向自己的新值也就是draftstate。
```
#### 
```js
//     脱离代码总的来说一下原理吧, 比如我们取obj.name.nickname = 1, 则会先触发obj身上的get方法, 将obj.name的值生成一个代理对象挂载到keyToProxy上, 然后触发obj.name的get方法, 为obj.name.nickname生成代理的对象挂载到keyToProxy上, 最后obj.name.nickname = 1触发obj.name.nickname的set方法。

//     set方法触发backTracking开始自下而上触发父级的方法, 父级将子元素的值赋值给自身draftstate对应的key。

//     所有代理对象都在keyToProxy被, 但最后返回的是draftstate所以不会出现多层Proxy的情况('套娃代理')。

const INTERNAL = Symbol('internal')

function produce(targetState, producer) {
    let proxyState = toProxy(targetState)
    producer(proxyState);
    const internal = proxyState[INTERNAL];
    return internal.changed ? internal.draftstate : internal.targetState
}

function toProxy(targetState, backTracking = () => { }) {
    let internal = {
        targetState,
        keyToProxy: {},
        changed: false,
        draftstate: createDraftstate(targetState),
    }
    return new Proxy(targetState, {
        get(_, key) {
            if (key === INTERNAL) {
                return internal
            }
            const val = targetState[key];
            if (key in internal.keyToProxy) {
                return internal.keyToProxy[key]
            } else {
                internal.keyToProxy[key] = toProxy(val, () => {
                    internal.changed = true;
                    const proxyChild = internal.keyToProxy[key];
                    internal.draftstate[key] = proxyChild[INTERNAL].draftstate;
                    backTracking()
                })
            }
            return internal.keyToProxy[key]
        },
        set(_, key, value) {
            internal.changed = true;
            internal.draftstate[key] = value
            backTracking()
            return true
        }
    })
}

function createDraftstate(targetState) {
    if (isObject) {
        return Object.assign({}, targetState)
    } else if (isArray(targetState)) {
        return [...targetState]
    } else {
        // 还有很多类型, 慢慢写
        return targetState
    }
}

module.exports = {
    produce
}
```
[referer](https://segmentfault.com/a/1190000042282263)