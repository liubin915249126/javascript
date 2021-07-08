# js视差效果
![效果图](https://github.com/liubin915249126/javascript/blob/master/Parallax/img/parallax.gif)

#### 1.思路：
>
  鼠标在图片上上下左右滑动时,让图片整体转动,转动方向与鼠标移动的方向相同,转动角度大小正相关于鼠标离开图像中心点的水平或垂直距离，图片转动可以用css3的：
  ```
     transform:rotateX() rotateY(); 
  ```
  实现,剩下的是求鼠标的位置图片中心点的距离差，鼠标位置为：
  ```
      e.clientX; e.clientY //鼠标相对于屏幕可视区域的位置(不包括滚动条)
  ```
  对于图片中心点可以先求图片左上角相对于屏幕的位置坐标，加上图片宽高的一半即可求得。
>  
#### 2.求一个元素左上角相对于屏幕的位置
>
```
           //获取元素相对于屏幕绝对位置
        function getAbsPosition(element){
           var abs={x:0,y:0}
           //如果浏览器兼容此方法
           if (document.documentElement.getBoundingClientRect){
               //注意，getBoundingClientRect()是jQuery对象的方法
               //如果不用jQuery对象，可以使用else分支。
               abs.x = element.getBoundingClientRect().left;
               abs.y = element.getBoundingClientRect().top;

               abs.x += window.screenLeft +
                           document.documentElement.scrollLeft -
                           document.documentElement.clientLeft;
               abs.y += window.screenTop +
                           document.documentElement.scrollTop -
                           document.documentElement.clientTop;
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
此方法循环累加位置坐标，直到父元素为根元素。
```
   function getCenterPosition(element){
          center={x:0,y:0}
          var leftTop=getAbsPosition(element[0])
          // console.log(leftTop)
          // console.log(element.css('width'),element.css('height'))
          center.x =  leftTop.x + parseInt(element.css('width'))/2
          center.y =  leftTop.y + parseInt(element.css('height'))/2
          return center
        }
```
获取元素中心点的位置。
>
#### 3.计算鼠标与元素中心点的距离差，使元素转动
>
当鼠标在图片上移动时,实时计算鼠标与元素中心点的距离差，经过比例换算，修改元素的transform
```
   $(document).on('mousemove','.layerWrap',function(e){
            //console.log(e.clientX,e.clientY)
            CenterPosition = getCenterPosition($('.layer img'))
            moveY = (CenterPosition.x - e.clientX)/30
            moveX = 0-(CenterPosition.y - e.clientY)/27
            //console.log(moveX,moveY)
            $('.layerWrap').css('transform','rotateX('+moveX+'deg)'+''+'rotateY('+moveY+'deg)')
            $('.layerWrap').css('webKitTransform','rotateX('+moveX+'deg)'+''+'rotateY('+moveY+'deg)')
        })
```
即可看到效果。
>