Function.prototype.mybind = function(thisArg) {
    if (typeof this !== 'function') {
      throw TypeError("Bind must be called on a function");
    }
    // 拿到参数，为了传给调用者
    const args = Array.prototype.slice.call(arguments, 1),
      // 保存 this
      self = this,
      // 构建一个干净的函数，用于保存原函数的原型
      nop = function() {},
      // 绑定的函数
      bound = function() {
        // this instanceof nop, 判断是否使用 new 来调用 bound
        // 如果是 new 来调用的话，this的指向就是其实例，
        // 如果不是 new 调用的话，就改变 this 指向到指定的对象 o
        return self.apply(
          this instanceof nop ? this : thisArg,
          args.concat(Array.prototype.slice.call(arguments))
        );
      };

    // 箭头函数没有 prototype，箭头函数this永远指向它所在的作用域
    if (this.prototype) {
      nop.prototype = this.prototype;
    }
    // 修改绑定函数的原型指向
    bound.prototype = new nop();

    return bound;
  }

  Function.prototype.mycall = function(thisArg) {
    // this指向调用call的对象
    if (typeof this !== 'function') {
      // 调用call的若不是函数则报错
      throw new TypeError('Error');
    }
    // 声明一个 Symbol 属性，防止 fn 被占用
    const fn = Symbol('fn')
    const args = [...arguments].slice(1);
    thisArg = thisArg || window;
    // 将调用call函数的对象添加到thisArg的属性中
    thisArg[fn] = this;
    // 执行该属性
    const result = thisArg[fn](...args);
    // 删除该属性
    delete thisArg[fn];
    // 返回函数执行结果
    return result;
  }

  Function.prototype.myapply = function(thisArg) {
    if (typeof this !== 'function') {
      throw this + ' is not a function';
    }
  
    const args = arguments[1];
    const fn = Symbol('fn')
    thisArg[fn] = this;
  
    const result = thisArg[fn](...arg);
  
    delete thisArg[fn];
  
    return result;
  };
  