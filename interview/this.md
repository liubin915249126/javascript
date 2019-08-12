#### new 
>
    1.创建一个新对象
    2.将构造函数的作用域赋值给新对象，即this指向这个新对象
    3.执行构造函数中的代码
    4.返回新对象
>

#### call,apply,bind
```js
  // call
   Function.prototype.myCall = function (context, ...arg) {
        const fn = Symbol('临时属性')
        context[fn] = this
        context[fn](...arg)
        delete context[fn]
    }
```
```js
   //实现自己的myApply
    Function.prototype.myApply = function (context, arg) {
        const fn = Symbol('临时属性')
        context[fn] = this
        context[fn](...arg)
        delete context[fn]
    }

    const obj2 = {
        a: 1
    }

    test.myApply(obj2, [2, 3, 4])
```
```js
   /实现自己的myBind
    Function.prototype.myBind = function (context, ...firstarg) {
        const that = this
        const bindFn = function (...secoundarg) {
            return that.myCall(context, ...firstarg, ...secoundarg)
        }
        bindFn.prototype = Object.create(that.prototype)
        return bindFn
    }

    var fnbind = test.myBind(obj, 2)
    fnbind(3)
```