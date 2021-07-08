## spacetree组织架构图
<!-- 说明 -->
### 说明
jquery插件皆可用于react,使用方法:[react中使用jquery插件](https://github.com/liubin915249126/react-study/blob/master/jquery-in-react.md)

#### 效果图
![效果图](https://github.com/liubin915249126/javascript/blob/master/spacetree/image/spacetree1.gif)
#### 定制化内容的效果图
![效果图](https://github.com/liubin915249126/javascript/blob/master/spacetree/image/spacetree.gif)
#### 插件说明  
     很好的canvas的组织架构图，从上到下按层级展示汇报关系,
     支持定制化内容，和异步加载子节点(下面会讲到)。
     相关api请参考
[官网](http://philogb.github.io/jit/static/v20/Docs/files/Core/Core-js.html)
或是[example1.js](https://github.com/liubin915249126/javascript/blob/master/spacetree/js/example1.js)
#### 数据格式
```js
     var data = {
         id:01,      //每个节点有一个唯一的标示
         data:{},    //存放每个节点数据
         children:[  //存放元素子节点
            {
            id:011,
            data:{},
            children:[]
         },
         {
            id:012,
            data:{},
            children:[]
         }
         ]
     }
```
#### 开发中的痛点问题
     插件默认加载全部数据，当后台数据量太大，一次返回时，
     会造成页面卡死，用户体验相当不好。且在开发中，用户希
     望能够根据数据定制每一块的内容展示。
#### 解决办法1
     对于第一个问题：每次只返回两层的数据,(注意，所有的数据必须要有一个不重复的id)
     剩下的数据可以通过异步加载的方式给架构图添加子节点
     在官网上找到一个办法,当通过ajax请求回来的数据后通过：     
```js
        st.addSubtree(data, type, {   //st指的是创建的树对象，可以将其设为全局变量，
                                        以便外面拿到
                                      //data即ajax获取的值
                                      //type:"animate":"replot"
            hideLabels: false,
            onComplete: function() {   //加载完成后的回调
                Log.write("subtree added");
            }
        });
```
     同时还有另外一个api,用于删除子节点
```js
     st.removeSubtree(id, true, 'animate', {   //id:想要删除子节点的节点的id标识
                            hideLabels: false, //动画执行过程中是否隐藏节点
                            onComplete: function() {
                              removing = false;
                              Log.write("subtree removed");
                            }
                        });
```
#### 解决办法2
     对于第二个问题：同样有一个api用lai定制化每个节点的内容
     onCreateLabel:里面有两个参数label,node:label指的是容器
     div,node指的是每块对应的数据，这里用jquery的方式根据数据
     动态生成内容。
```js
     onCreateLabel: function (label, node) { //
            label.id = node.id;
            var level = ['第一层','第二层','第三层','第四层','第五层','第六层'];
            var wrap = '<div class="wrap">'+
                          '<div class="level"></div>'+
                          '<div class="secondLevel"></div>'+
                          '<div class="level"></div>'+ 
                        '</div>'
            var $wrap = $(wrap);
            $wrap.find('.secondLevel').text(node.name);
            $wrap.find('.level').text(level[node._depth])            
            $(label).append($wrap);
        } 
```