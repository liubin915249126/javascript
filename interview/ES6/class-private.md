## class 私有变量

#### 闭包
```js
class Example {
  constructor() {
    var _private = '';
    _private = 'private';
    this.getName = function() {return _private}
  }
}
var ex = new Example();
console.log(ex.getName()); // private
console.log(ex._private); // undefined
```
- 优点
  - 无命名冲突
  - 外部无法访问和修改
- 缺点
  - constructor 的逻辑变得复杂。构造函数应该只做对象初始化的事情，现在为了实现私有变量，必须包含部分方法的实现，代码组织上略不清晰。
  - 方法存在于实例，而非原型上，子类也无法使用 super 调用
  - 构建增加一点点开销

####

```js
   const Example = (function() {
    var _private = '';

    class Example {
        constructor() {
        _private = 'private';
        }
        getName() {
        return _private;
        }
    }
    return Example;
    })();
var ex = new Example();
console.log(ex.getName()); // private
```
- 优点
  - 无命名冲突
  - 外部无法访问和修改
- 缺点
  - 写法有一点复杂
  - 构建增加一点点开销


#### Symbol
```js
    const Example = (function() {
    var _private = Symbol('private');

    class Example {
        constructor() {
          this[_private] = 'private';
        }
        getName() {
          return this[_private];
        }
    }

    return Example;
})();

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex.name); // undefined
```
- 优点
  - 无命名冲突
  - 外部无法访问和修改
  - 无性能损失
- 缺点
  - 写法稍微复杂
  - 兼容性也还好

#### WeakMap
```js
    const Example = (function() {
    var _private = new WeakMap(); // 私有成员存储容器

    class Example {
        constructor() {
        _private.set(this, 'private');
        }
        getName() {
            return _private.get(this);
        }
    }

    return Example;
    })();

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex.name); // undefined
```

- 优点
    - 无命名冲突
    - 外部无法访问和修改
- 缺点
    - 写法比较麻烦
    - 兼容性有点问题
    - 有一定性能代价
