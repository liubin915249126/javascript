## 用SVG连接两个div的直线，拖动实时改变位置
![效果图](https://github.com/liubin915249126/javascript/blob/master/SVG/image/svgDrag.gif)
用d3.js动态添加 path,line 节点，并动态修改节点属性

#### 1.产品经理提出的需求
>
  用带箭头的虚线将两个位置不固定的div连接起来,初听到这个需求一头雾水，传统的div可以做直线，但斜起来不太好做，幸亏之前接触过svg,里面有一个line标签，知道起始中止两个点的位置，就可以将两个点连接起来了。
  至于箭头,可以这么做先定义箭头：
  ```
        <svg>
            <defs>
                <marker id="arrow" markerUnits="strokeWidth" markerWidth="12" markerHeight="12" viewBox="0 0 12 12" refX="6" refY="6" orient="auto">
                    <path xmlns="http://www.w3.org/2000/svg" d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill: #000000;" />
                </marker>
            </defs>
        </svg>
  ```
  将箭头放在直线上：marker-end="url(#arrow)"
  ```
     <line  x1="0" y1="0" x2="200" y2="50" stroke="#000" stroke-width="2" marker-end="url(#arrow)"stroke-dasharray="10,10"></line> 
  ```
>
#### 2.确定起始中止两个点左上角的位置
>
  需要连接的两个div及SVG都相对于某一个div.wrap绝对定位，可以先求得两个div左上角相对与div.wrap坐标：
  ```
        //获取元素左上角相对于某一元素的的位置
        function getElCoordinate(dom) {
                    var t = dom.offsetTop;
                    var l = dom.offsetLeft;
                    var w = dom.offsetWidth;
                    var h = dom.offsetHeight;
                    dom = dom.offsetParent;
                    while (!$(dom).hasClass('wrap')) {
                        t += dom.offsetTop;
                        l += dom.offsetLeft;
                        dom = dom.offsetParent;
                    }; return {
                        top: t,//Y轴坐标
                        left: l,//X轴坐标
                        width:w,//元素宽度
                        height:h//元素高度 
                    };
                }
       })
  ```
>
#### 3.确定连接点在div上的位置：
>
  分为两种情况：终点div位于起点div上方,终点div位于起点div下方。
```
   var pos1 = getElCoordinate($('.item1')[0])//起点div的位置
   var pos2 = getElCoordinate($('.item2')[0])//终点div的位置
   function getPos(pos1, pos2){
              //分两种情况
              var x1,y1,x2,y2;
              if(pos2.top<pos1.top){
                  x1 = pos1.left + pos1.width/2;
                  y1 = pos1.top;
                  y2 = pos2.top + pos2.height
                 if(pos2.left<pos1.left){
                    x2 = pos2.left + pos2.width/2
              }else{
                  x1 = pos1.left + pos1.width / 2;
                  y1 = pos1.top + pos1.height;
                  x2 = pos2.left + pos2.width/2
                  y2 = pos2.top 
              }
              return {
                  start :{x:x1,y:y1},
                  end : {x:x2,y:y2}
              }
           }
```
>
#### 4.确定起止点位置后连线。
>
```
   function move(){
               var pos1 = getElCoordinate($('.item1')[0])
               var pos2 = getElCoordinate($('.item2')[0])
               var start = getPos(pos1, pos2).start
               var end = getPos(pos1, pos2).end

               $('#line').attr({ x1: start.x, y1: start.y, x2: end.x, y2: end.y })
               $('#path').attr({ d: 'M20,20 L100,100' })
           }
           move()
```
>
#### 5.两个div分别拖动并保持线始终连接
>
```
             drag($('.item'), move)
             function drag(obj,callback) {
                var dragEles = obj;
                dragEles.each(function(index, dragEleDom){
                    var _move = false;//移动标记
                    var _x, _y;//鼠标离控件左上角的相对位置
                    var dragEle = $(dragEleDom)
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
                            if(callback){callback()}
                        }
                    }).mouseup(function () {
                        _move = false;
                        dragEle.fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
                    });
                })
                
           }
   ```        
>
#### 梳理下流程：分析需求>确定使用SVG>找到连接点>连线>拖动时保持连线。
#### 源码托管于[github](https://github.com/liubin915249126/javascript/tree/master/SVG)欢迎star