# 常见js函数收集

## 数组

####
洗牌算法
```javascript
   function shuffle(a) {
    var length = a.length;
    var shuffled = Array(length);

    for (var index = 0, rand; index < length; index++) {
        rand = ~~(Math.random() * (index + 1));
        if (rand !== index) 
        shuffled[index] = shuffled[rand];
        shuffled[rand] = a[index];
    }
    return shuffled;
    }
```
## 函数
#### 函数防抖
```js
   function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
        // 定时器设置的回调 later 方法的触发时间，和连续事件触发的最后一次时间戳的间隔
        // 如果间隔为 wait（或者刚好大于 wait），则触发事件
        var last = _.now() - timestamp;

        // 时间间隔 last 在 [0, wait) 中
        // 还没到触发的点，则继续设置定时器
        // last 值应该不会小于 0 吧？
        if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
        } else {
        // 到了可以触发的时间点
        timeout = null;
        // 可以触发了
        // 并且不是设置为立即触发的
        // 因为如果是立即触发（callNow），也会进入这个回调中
        // 主要是为了将 timeout 值置为空，使之不影响下次连续事件的触发
        // 如果不是立即执行，随即执行 func 方法
        if (!immediate) {
            // 执行 func 函数
            result = func.apply(context, args);
            // 这里的 timeout 一定是 null 了吧
            // 感觉这个判断多余了
            if (!timeout)
            context = args = null;
        }
        }
    };

    // 嗯，闭包返回的函数，是可以传入参数的
    return function() {
        // 可以指定 this 指向
        context = this;
        args = arguments;

        // 每次触发函数，更新时间戳
        // later 方法中取 last 值时用到该变量
        // 判断距离上次触发事件是否已经过了 wait seconds 了
        // 即我们需要距离最后一次触发事件 wait seconds 后触发这个回调方法
        timestamp = _.now();

        // 立即触发需要满足两个条件
        // immediate 参数为 true，并且 timeout 还没设置
        // immediate 参数为 true 是显而易见的
        // 如果去掉 !timeout 的条件，就会一直触发，而不是触发一次
        // 因为第一次触发后已经设置了 timeout，所以根据 timeout 是否为空可以判断是否是首次触发
        var callNow = immediate && !timeout;

        // 设置 wait seconds 后触发 later 方法
        // 无论是否 callNow（如果是 callNow，也进入 later 方法，去 later 方法中判断是否执行相应回调函数）
        // 在某一段的连续触发中，只会在第一次触发时进入这个 if 分支中
        if (!timeout)
        // 设置了 timeout，所以以后不会进入这个 if 分支了
        timeout = setTimeout(later, wait);

        // 如果是立即触发
        if (callNow) {
        // func 可能是有返回值的
        result = func.apply(context, args);
        // 解除引用
        context = args = null;
        }

        return result;
    };
    }; 
``` 
#### js获取url中的参数
```js
  function getParam(name, url) {
    // var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const reg = new RegExp(`\\u003F${name}=(.+)(&|$)|&${name}=(.+)(&|$)`, 'i');
    const r = url.replace(new RegExp(/(amp;)/g), '').match(reg);
    if (r != null) {
        return r[2];
    }
    return null;
    }
```
#### 判断数据类型
```js
       //判断数据类型    
       function type(elem){
           var reg = /^\[object\s(.*)\]$/
           var type = Object.prototype.toString.call(elem).match(reg)[1].toLowerCase();
           return type;
       }
```
#### 判断两个对象是否相等
```js
   function isObjectValueEqual(a, b) {
      if(typeof a == 'number' && typeof b == 'number'){
          return a == b
      }
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);

      if (aProps.length != bProps.length) {
          return false;
      }

      for (var i = 0; i < aProps.length; i++) {
          var propName = aProps[i];
          if(Object.prototype.toString(a[propName]) == '[Object Object]'||Object.prototype.toString(b[propName]) == '[Object Object]'){
              isObjectValueEqual(a[propName],b[propName])
          }
          if (a[propName] !== b[propName]) {
              return false;
          }
      }
      return true;
  }
```
#### deep clone
```js
   //deepclone with date
    export function deepCloneWithDate(source) {
        if (!source && typeof source !== 'object') {
            throw new Error('error arguments', 'shallowClone');
        }
        const targetObj = source.constructor === Array ? [] : {};
        for (const keys in source) {
            if (source.hasOwnProperty(keys)) {
                if (source[keys] && typeof source[keys] === 'object') {
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    if(source[keys].constructor === Date){
                        targetObj[keys] = new Date(source[keys]);
                        continue;
                    }
                    targetObj[keys] = deepClone(source[keys]);
                } else {
                    targetObj[keys] = source[keys];
                }
            }
        }
        return targetObj;
    }
```
#### 手机号校验规则
```js
   reg=/^[1][3,4,5,7,8][0-9]{9}$/;  // 
```
#### 获取一个DIV的绝对坐标的功能函数,即使是非绝对定位,一样能获取到
```js
     //获取元素相对于屏幕绝对位置
        function getAbsPosition(element){
           var abs={x:0,y:0}
           //如果浏览器兼容此方法
           if (document.documentElement.getBoundingClientRect){
               //如果不用jQuery对象，可以使用else分支。
               abs.x = element.getBoundingClientRect().left;
               abs.y = element.getBoundingClientRect().top;

               <!-- abs.x += window.screenLeft +
                           document.documentElement.scrollLeft -
                           document.documentElement.clientLeft; -->
               <!--带滚动条的情况-->
               abs.x += window.screenLeft +
                document.body.clientLeft - document.body.scrollLeft;
               abs.y += window.screenTop +
                document.body.clientTop - document.body.scrollTop;
             }
           //如果浏览器不兼容此方法
           else{
               while(element!=document.body){
                   abs.x+=element.offsetLeft;
                   abs.y+=element.offsetTop;
                   element=element.offsetParent;
               }
            //计算想对位置
                abs.x += window.screenLeft +
                       document.body.clientLeft - document.body.scrollLeft;
                abs.y += window.screenTop +
                       document.body.clientTop - document.body.scrollTop;
              }
              return abs;
          }
```
#### 网页拖拽
```js
    function drag(obj) {
        var dragEle = obj;
        var _move = false;//移动标记
        var _x, _y;//鼠标离控件左上角的相对位置
        dragEle.click(function () {
            //alert("click");//点击（松开后触发）
        }).mousedown(function (e) {
            _move = true;
            _x = e.pageX - parseInt(dragEle.css("left"));
            _y = e.pageY - parseInt(dragEle.css("top"));
            // dragEle.fadeTo(20, 0.9);//点击后开始拖动并透明显示
        });
        $(document).mousemove(function (e) {
            if (_move) {
                var x = e.pageX - _x;//移动时根据鼠标位置计算控件左上角的绝对位置
                var y = e.pageY - _y;
                dragEle.css({ top: y, left: x });//控件新位置
            }
        }).mouseup(function () {
            _move = false;
            dragEle.fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
        });
    }
```
#### 将#XXXXXX颜色格式转换为RGB格式，并附加上透明度
```js
        function brgba(hex, opacity) {
            if( ! /#?\d+/g.test(hex) ) return hex; //如果是“red”格式的颜色值，则不转换。//正则错误，参考后面的PS内容
            var h = hex.charAt(0) == "#" ? hex.substring(1) : hex,
                r = parseInt(h.substring(0,2),16),
                g = parseInt(h.substring(2,4),16),
                b = parseInt(h.substring(4,6),16),
                a = opacity;
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }
```
#### 前端生成UUID：
```js
   function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
    
        var uuid = s.join("");
        return uuid;
    }
```
#### 网页滚动到顶部
```js
   function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        const difference = to - element.scrollTop;
        const perTick = difference / duration * 10;
        setTimeout(() => {
            console.log(new Date())
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    } 
```
#### 驼峰转下划线
```js
   let humpToUnderline = str => str.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join('_').toLowerCase();
   humpToUnderline('helloWorld');  //hello_world
```
#### 统计文字个数
```js
   //统计文字个数
    function wordCount(data) {
    var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
    var m = data.match(pattern);
    var count = 0;
    if( m === null ) return count;
    for (var i = 0; i < m.length; i++) {
        if (m[i].charCodeAt(0) >= 0x4E00) {
        count += m[i].length;
        } else {
        count += 1;
        }
    }
    return count;
    }

    var text = '统计文字个数';
    // console.log(wordCount(text)); // 6
```
#### 评级
```js
   "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
```
#### 获取元素宽高
```js
    getStyle(elem, style) {
      if ("getComputedStyle" in window) {
        var val = getComputedStyle(elem, null)[style];
        style = style.replace(/\-(\w)/g, function($, $1) {
          return $1.toUpperCase();
        });
        if (val === "auto" && (style === "width" || style === "height")) {
          var rect = elem.getBoundingClientRect();
          if (style === "width") {
            return rect.right - rect.left + "px";
          } else {
            return rect.bottom - rect.top + "px";
          }
        }
        return val;
      } else {
        style = style.replace(/\-(\w)/g, function($, $1) {
          return $1.toUpperCase();
        });

        var val = elem.currentStyle[style];

        if (val === "auto" && (style === "width" || style === "height")) {
          var rect = elem.getBoundingClientRect();
          if (style === "width") {
            return rect.right - rect.left + "px";
          } else {
            return rect.bottom - rect.top + "px";
          }
        }
        return val;
      }
    }
```
