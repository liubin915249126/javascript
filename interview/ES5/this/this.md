## this

this 永远指向最后调用它的那个对象

#### 改变 this 指向

- 使用 ES6 的箭头函数
- 在函数内部使用 \_this = this
- 使用 apply、call、bind
- new 实例化一个对象

#### 箭头函数

- 箭头函数的 this 始终指向函数定义时的 this，而非执行时
- 箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，
  如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，
  否则，this 为 undefined

#### this 指向

- bind 只认第一次
- 最后看谁调用
- new 绑定 > 显式绑定(call、apply、bind bind 返回一个新函数，新函数指向绑定的对象，旧函数不会)> 隐式绑定(谁调用就指向谁) > 默认绑定
