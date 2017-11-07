# jsPlumb流程图插件
<!-- 说明 -->
### 说明
jquery插件皆可用于react,使用方法:[react中使用jquery插件](https://github.com/liubin915249126/react-study/blob/master/jquery-in-react.md)

### 效果图
![效果图](https://github.com/liubin915249126/javascript/blob/master/jsplumb/image/index.gif)

### 插件说明
    使用场景:审批，流转等流程的制作页面，
    图中节点连线均由数据生成，图中节点可拖拽，
    可新增节点，点击保存后能够获得新的节点与连线
    的数据，便于保存到后台数据库。
    (因为要加载数据，所以最好用webstorm才能看到效果)
### 相关API说明
   ```
   //实例化对象
    instance = jsPlumb.getInstance({      
        Endpoint : ["Dot", {radius:2}],
        HoverPaintStyle: { strokeStyle: "#1e8151", lineWidth: 2 },
        ConnectionOverlays : [
            [ "Arrow", {location: 1, id:"arrow", length:10, foldback:0.8, width: 10} ],
            [ "Label", { label:"", id:"label", cssClass:"labelstyle" }]
        ],
        DragOptions : { zIndex:2000 },
        Container:"topocontent"
    });

    //添加节点
    根据数据循环生成div添加到容器内，每个div给与特定的id

    //添加连线
    //source,target分别对应着生成节点的id
     var conor = instance.connect({ source: jump.SourceId, target:jump.TargetId});
            conor.getOverlay("label").setLabel(jump.Text);
            conor.setPaintStyle({fillStyle : 'none', strokeStyle: '#2F8E00'});
            conor.bind('click',function(){
                detachLine(this); //删除连线
      });

    //保存数据
    instance.getAllConnections();//获取所有连线 

  ```  
  #### 更多api查看[index.js](https://github.com/liubin915249126/javascript/blob/master/jsplumb/js/index.js)文件
     