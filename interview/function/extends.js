const inherit = function (subType, superType) {
    // 对 superType 进行类型判断
   if (typeof superType !== "function" && superType !== null) {
       throw new TypeError("Super expression must either be null or a function");
   }
   subType.prototype = Object.create(superType && superType.prototype, {
       constructor: {
           configurable: true,
           enumerable: false,
           value: subType,
           writable: true
       }
   });
   // 继承静态方法
   superType && Object.setPrototypeOf(subType, superType);
};

// 用法
function superType (name) {
   this.name = name;
}
superType.staticFn = function () {
   console.log('staticFn');
}
superType.prototype.getName = function () {
   console.log('name: ' + this.name);
}
function subType (name, age) {
   superType.call(this, name);
   this.age = age;
}
inherit(subType, superType);
// 必须在继承之后再往 subType 中添加原型方法，否则会被覆盖掉
subType.prototype.getAge = function () {
   console.log('age: ' + this.age);
}
let subTypeInstance = new subType('Twittytop', 29);
subType.staticFn();
subTypeInstance.getName();
subTypeInstance.getAge();
