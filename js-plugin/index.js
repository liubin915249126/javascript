// 面向对象
function plugin(json) {
   var defaultOpts = {
       name:'default',
   };
   this.opts=this.extends(defaultOpts,json)
};

plugin.prototype = {
    output: function () {
        console.log(this.opts)
    },
    extends: function (destination, source) {
        for (var property in source) {
            destination[property] = source[property]; // 利用动态语言的特性, 通过赋值动态添加属性与方法
        }
        return destination; // 返回扩展后的对象
    },
    opts:function(){

    }
}