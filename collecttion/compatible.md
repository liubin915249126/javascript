# 常见js函数收集

#### 兼容各种浏览器的,获取鼠标真实位置
```
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