# jquery插件
### 效果图
![效果图](https://github.com/liubin915249126/javascript/blob/master/lencharts/image/index.png)
使用方法:
>  $('.orgWrap').lenChart({
>             data:obj,   //数据源
>             drag:true,  //是否可拖拽
>             renderdata:function(data,$dom){}, //定制每个名片里面的数据
>             callback:function(){} //渲染完图表后的回调函数    
>             }) 