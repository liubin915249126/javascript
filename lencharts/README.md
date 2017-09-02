# jquery插件
### 效果图
![效果图](https://github.com/liubin915249126/javascript/blob/master/lencharts/image/index.png)
#### 使用方法:
  ```
  $('.orgWrap').lenChart({
             data:obj,   //数据源
             drag:true,  //是否可拖拽
             depth:3,  //初始化展示的层级
             renderdata:function(data,$dom){}, //根据数据定制每个名片里面的DOM结构
             callback:function(){} //渲染完图表后的回调函数    
             })
  ``` 
#### 数据源格式
  ```
  var obj = {
      id:001,
      data:{}
      children:[
          {
            id:001,
            data:{}
            children:[]
        },
        {
            id:001,
            data:{}
            children:[]
        }
      ]
  }
  ``` 
#### 插件说明
    使用递归的方式深层遍历数据,架构图第二层为横向结构,
    从第三层开始为竖向结构,解决了横向太长的问题。
    点击加减号按钮可以显示与隐藏当前节点的子节点。
#### 源码解析(jquery插件的写法)
    
 ```
 (function($,window,document){
    $.fn.lenChart = function (options) {//这里的options可以取到调用时传的参数
        var defaults = {};
        var opts = $.extend({}, defaults, options);
        ...
    }
 })(jQuery,window,document) 
 ```     