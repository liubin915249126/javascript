## 单体模式
- 可以用来划分命名空间，减少全局变量的数量。
- 使用单体模式可以使代码组织的更为一致，使代码容易阅读和维护。
- 可以被实例化，且实例化一次。
```js
// 单体模式
var Singleton = function(name){
    this.name = name;
};
Singleton.prototype.getName = function(){
    return this.name;
}
// 获取实例对象
Singleton.getInstance = (function() {
    var instance = null;
    return function(name) {
        if(!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();
// 测试单体模式的实例
var a = getInstance("aa");
var b = getInstance("bb");
```
通用的单体模式
```js
// 创建div
var createWindow = function(){
    var div = document.createElement("div");
    div.innerHTML = "我是弹窗内容";
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};
// 创建iframe
var createIframe = function(){
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    return iframe;
};
// 获取实例的封装代码
var getInstance = function(fn) {
    var result;
    return function(){
        return result || (result = fn.call(this,arguments));
    }
};
// 测试创建div
var createSingleDiv = getInstance(createWindow);
document.getElementById("Id").onclick = function(){
    var win = createSingleDiv();
    win.style.display = "block";
};
// 测试创建iframe
var createSingleIframe = getInstance(createIframe);
document.getElementById("Id").onclick = function(){
    var win = createSingleIframe();
    win.src = "http://cnblogs.com";
};
```