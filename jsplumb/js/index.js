/**
 * Created by liubin on 2017/4/8.
 */
$(function(){
    var $container = $('#container');

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
    window.jsp = instance;
    var lineColor = '#2f8e00',
        pstyle = {
            Endpoint: ["Dot", { radius: 2 }],
            paintStyle: {
                strokeStyle: lineColor,
                fillStyle: 'none'
            },
            // connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }],
            //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
            connector: ["StateMachine", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }],
            connectorStyle: {
                lineWidth: 1,
                strokeStyle: lineColor
            },
            maxConnections: -1
        };

    editData(initialData);
    function editData(data) {
        var nodes = data.Nodes;
        var jumps = data.Jumps;
        //添加节点
        nodes.forEach(function(item,index,arr){
            var $item = $('<div class="item" style="" id=""><span class="text"></span><span class="dragPoint"></span></div>')
            $item.attr({'id':item.Guid})
            $item.attr({'style':item.Style})
            $item.find('.text').text(item.Name.Chinese)
            $container.append($item)
        })
        //添加连线
        var windowsDrag = $('#container .item')
        renderConnect(windowsDrag);

        //------------更改样式-------------
        for( var i in jumps){
            renderConnecter(jumps[i])
        }
    }
    //添加连线
    function renderConnecter(jump) {

            var conor = instance.connect({ source: jump.SourceId, target:jump.TargetId});
            conor.getOverlay("label").setLabel(jump.Text);
            conor.setPaintStyle({fillStyle : 'none', strokeStyle: '#2F8E00'});
            conor.bind('click',function(){
                detachLine(this);
            });

    }
    
    function renderConnect(newid){//渲染
        instance.draggable(newid);
        instance.doWhileSuspended(function(){
            var isFilterSupported = instance.isDragFilterSupported();
            if(isFilterSupported){
                instance.makeSource(newid, {filter:".dragPoint",anchor:"Continuous"}, pstyle);
            }else{
                var eps = jsPlumb.getSelector(".dragPoint");
                for (var i = 0; i < eps.length; i++) {
                    var e = eps[i], p = e.parentNode;
                    instance.makeSource(e, {parent:p, anchor:"Continuous"}, pstyle);
                }
            }
        });
        instance.makeTarget(newid, {dropOptions:{hoverClass:"dragHover"}, anchor:"Continuous"}, pstyle);
    }



    /*以下为操作函数*/
    var currentNode; //当前操作的节点
    var currentConnection; //当前连线
    $('.wrap').on('contextmenu',function (e) {
         e=e||event
         target = e.target||e.srcElement
         currentNode = target
;        if($(target).hasClass('wrap')){
            var $menu = $('.wrapMenu');
            toggleMenu($menu,e,true);
        }else if($(target).hasClass('item')||$(target).hasClass('text')){
            var $menu = $('.nodeMenu');
            toggleMenu($menu,e,true);
        }else{
            var $menu = $('.pathMenu');
            toggleMenu($menu,e,true);
        }

        return false;
    });
    $('.wrap').on('click',function(e){
        $('.todoMenu').css({'display':'none'})
    })
    /*menu操作*/
    function toggleMenu($menu,e,flag) {
        $('.todoMenu').css({'display':'none'})
        if(flag){
            $menu.css({"display":'block','position':'fixed','zIndex':'20'});
            $menu.css({'left':e.clientX,'top':e.clientY})
        }else{
            $menu.css({'display':'none'})
        }
    }

    //增加节点
    $(document).on('click','.wrapMenu #addNode',function (e) {

        var $item = $('<div class="item" style="" id="item"><span class="text">新增节点</span><span class="dragPoint"></span></div>')
        $container.append($item);
        instance.draggable('item');
        var $menu = $(this).closest('.todoMenu');
        toggleMenu($menu,e,false);

        var id= $item.attr('id');
        renderConnect(id);

    })

    //删除当前节点
    $(document).on('click','.nodeMenu .deleteNode',function(e){
        var $currentNode
        var currentId
        if($(currentNode).hasClass('item')){
            $currentNode =$(currentNode)
        }else{
            $currentNode = $(currentNode).closest('.item')
        }
        currentId = $currentNode.attr('id');
        console.log(currentId);
        var sourceConn = instance.getConnections({ source: currentId });
        $.each(sourceConn, function (scopeName, conn) {
            instance.detach(conn);
        });

        //获得当前节点的目标数据连接，并删除该连接
        var targetConn = instance.getConnections({ target: currentId });
        $.each(targetConn, function (scopeName, conn) {
            instance.detach(conn);
        });
        $currentNode.remove();
        $('.todoMenu').css({'display':'none'})
    })
    /*删除连线*/
    instance.bind('contextmenu',function(c,e){
        debugger;
        currentConnection = c
    })

    $(document).on('click','.pathMenu .deletePath',function(){
        instance.detach(currentConnection); //删除连线
    });
    $(document).on('click','.menu .save', function() {
        var conns = instance.getAllConnections();//获取所有连线
        var windows = jsPlumb.getSelector("#container .item");//获取所有节点

    });
    //获取label的联系
    var connArr = [];

    /*连线后触发*/
    instance.bind("connection", function (info) {
        debugger;

        var labelText = '同意';
        var connInfo = {sourceID:info.sourceId,targetId:info.targetId,labelText:labelText};
        connArr.push(connInfo);
        info.connection.id = '0001';
        info.connection.setLabel(labelText);
        console.log(info);
        if(info.sourceId == info.targetId){
            alert('不能让以自己为目标元素');
            instance.detach(info);
        }
        connArr.forEach(function (item,index,arr) {
            renderConnecter(item);
        });
    });




    // instance.bind("connectionDragStop", function(info) {//点击连接线、overlay、label提示删除连线 + 不能以自己作为目标元素
    //     if(info.sourceId == info.targetId){
    //         $.popupTips('不能以自己作为目标元素');
    //         instance.detach(info);
    //     }else{
    //         info.unbind('click');
    //         info.bind('click',function(){
    //             detachLine(info);
    //         });
    //     };
    // });
    //取消连接
    // jsPlumb.bind("connectionDetached", function (conn, originalEvent) {
    //     if (conn.sourceId == conn.targetId) {
    //         //自己连接自己时会自动取消连接
    //     }else{
    //         alert("删除连接从" + conn.sourceId + "到" + conn.targetId + "！");
    //     }
    // });
})