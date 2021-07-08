## partail

```js
//es6实现
const partial_es6 = (fn, ...args) => {
  for (
    let i = args.length;
    i < fn.length;
    i++ //补齐，跟fn的参数列表对应上
  )
    args.push(undefined);
  return (...remainArgs) => {
    let j = 0;
    args.forEach((arg, i) => arg === undefined && (args[i] = remainArgs[j++]));
    return fn(...args);
  };
};
```

```js
//通过个Function添加原型链的方式实现 es5版
Function.prototype.partial = function () {
  var args = [].slice.call(arguments),
    that = this;
  for (
    var i = args.length;
    i < that.length;
    i++ //补齐，跟fn的参数列表对应上
  )
    args.push(undefined);

  return function () {
    var remainArgs = [].slice.call(arguments),
      index = 0;

    args.forEach(function (arg, i) {
      arg === undefined && (args[i] = remainArgs[index++]);
    });

    return that.apply(this, args);
  };
};
```
```js
//通过个Function添加原型链的方式实现 es6版
Function.prototype.partial_es6 = function(...args){
    for (let i = args.length;i<this.length;i++)         //补齐，跟fn的参数列表对应上
        args.push(undefined)
    
    return (...remainArgs) => {
        let j = 0;
        args.forEach((arg,i) => arg === undefined && (args[i] = remainArgs[j++]))
        return this(...args)  
    }
}
```

#### Functions 返回 Functions

```js
var greet = function (greeting, name) {
  return greeting + " " + name;
};

var sayHelloTo = _.partial(greet, "hello");
sayHelloTo("fred");
// => 'hello fred'
```

####

```js
// More general function.
function add(a, b) {
  return a + b;
}

add(1, 2); // 3
add(10, 3); // 13

// More specific function generator.
function makeAdder(a) {
  return function (b) {
    return a + b;
  };
}
// More specific functions.
var addOne = makeAdder(1);
addOne(2); // 3
addOne(3); // 4
var addTen = makeAdder(10);
addTen(2); // 12
addTen(3); // 13
```

#### Functions 接受 Functions

```js
function bindFirstArg(fn, a) {
  return function (b) {
    return fn(a, b);
  };
}
```
