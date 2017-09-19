# 常见js函数收集

#### js获取url中的参数

#### 判断两个对象是否相等
```
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
#### 获取一个DIV的绝对坐标的功能函数,即使是非绝对定位,一样能获取到
```
     function getElCoordinate(dom) {
            var t = dom.offsetTop;
            var l = dom.offsetLeft;
            dom=dom.offsetParent;
            while (dom) {
                t += dom.offsetTop;
                l += dom.offsetLeft;
                dom=dom.offsetParent;
            }; return {
                top: t,
                left: l
            };
        }
```
#### 将#XXXXXX颜色格式转换为RGB格式，并附加上透明度
```
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