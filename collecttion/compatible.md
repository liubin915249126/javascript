# 常见js兼容性写法收集

#### 兼容各种浏览器的,获取鼠标真实位置
```js
     function mousePosition(ev){
        if(!ev) ev=window.event;
        if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
        }
        return {
            x:ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
            y:ev.clientY + document.documentElement.scrollTop  - document.body.clientTop
        };
    } 
```
#### 获取行内样式
```js
    function getStyle(obj, attr){
        if(obj.currentStyle) {
            obj.currentStyle[attr]
        } else {
            getComputedStyle(obj, null)[attr];
        }
    }
```
#### 绑定事件兼容性写法
```js
    var addEvent = function(obj, type, fn) {
        if (obj.addEventListener)
            obj.addEventListener(type, fn, false);
        else
            obj.attachEvent('on' + type, fn);
     };
```
#### 绑定多个事件
```js
    function addEvents = function(obj, typeObj) {
    for(var type in typeObj) {
        addEvent(obj, type, typeObj[type]);
    }
    };
```
#### 移除之前绑定的事件
```js
    var removeHandler=function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }   
```
#### 阻止事件默认行为
```js
    var preventDefault=function(event){
            if (event.preventDefault){
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
```
#### 阻止事件冒泡
```js
    var stopPropagation=function(event){
            if (event.stopPropagation){
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
```