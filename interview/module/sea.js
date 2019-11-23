// main.js
define(function(require, exports, module) {
    var addModule = require("./add");
    console.log(addModule.add(1, 1));
  
    var squareModule = require("./square");
    console.log(squareModule.square(3));
  });
  // add.js
  define(function(require, exports, module) {
    console.log("加载了 add 模块");
    var add = function(x, y) {
      return x + y;
    };
    module.exports = {
      add: add
    };
  });
  define(function(require, exports, module) {
    console.log("加载了 square 模块");
    var multiplyModule = require("./multiply");
    module.exports = {
      square: function(num) {
        return multiplyModule.multiply(num, num);
      }
    };
  });
  define(function(require, exports, module) {
    console.log("加载了 multiply 模块");
    var multiply = function(x, y) {
      return x * y;
    };
    module.exports = {
      multiply: multiply
    };
  });
  // 加载了 add 模块
  // 2
  // 加载了 square 模块
  // 加载了 multiply 模块
  // 9