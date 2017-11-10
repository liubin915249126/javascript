#### cdn加速网站加载速度的原因
>
  涉及到跨域问题，网站加速
  1.会选择最近的节点
  2.不同域名的资源，浏览器同时加载同一域名的资源数量有限制
>
#### 跨域(jsonp,cors)
>
拥有src属性的标签不受跨域的限制<script>,<img>,<iframe>
动态生成的script的src属性里将参数包括callback传递给服务端
远程js文件调用本地页面里面的callback(data),将数据传进来。


>
#### clone 一个对象
>
浅拷贝
```  
```
数组,对象深拷贝：
```
   js的slice方法返回一个新数组(不会修改原素组)
   var arr = ["One","Two","Three"];
   var arrtoo = arr.slice(0);
   arrtoo[1] = "set Map";
```
```
   js的concat方法(返回连接数组的副本，不会改变原数组)
   var arr = ["One","Two","Three"];
   var arrtooo = arr.concat();
   arrtooo[1] = "set Map To";
```
```
   var cloneObj = function(obj){
     var str, newobj = obj.constructor === Array ? [] : {};
     if(typeof obj !== 'object'){
         return;
     } else if(window.JSON){
         str = JSON.stringify(obj), //序列化对象
         newobj = JSON.parse(str); //还原
     } else {
         for(var i in obj){
             newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
         }
     }
     return newobj;
 };
```  
>
#### typeof 返回值
>
```
   undefined boolean string number object(object,null) function
```
>
#### 闭包，面向对象(ES6的写法)
>
```
   function People(name){
       this.name = name;
       this.say = function(){
           console.log(this.name)
       }
   }
   var join = new People('join')
   join.name
   join.say()
```  
>
#### event bus
#### 垂直水平居中一个元素
#### sum(1,2)===sum(1)(2)
```
function sum() {
  var num = arguments[0];
  if(arguments.length === 2) {
    return arguments[0] + arguments[1]
  } else {
    return function(sec) {
       return num + sec;
    }
  }
 
}
```
```
function add(x) {
    var sum = x;
    var tmp = function (y) {
        sum = sum + y;
        return tmp;
    };
    tmp.toString = function () {
        return sum;
    };
    return tmp;
}
console.log(add(1)(2)(3));  //6
console.log(add(1)(2)(3)(4));   //10
```
```
function add () {
    var args = Array.prototype.slice.call(arguments);
 
    var fn = function () {
        var arg_fn = Array.prototype.slice.call(arguments);
        return add.apply(null, args.concat(arg_fn));
    }
 
    fn.valueOf = function () {
        return args.reduce(function(a, b) {
            return a + b;
        })
    }
 
    return fn;
}
add(1) // 1
add(1,2)(3) //6
add(1)(2)(3)(4)(5) // 15
```
#### ==与===区别