# 常见js函数收集

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