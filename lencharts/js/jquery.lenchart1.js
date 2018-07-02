(function ($, window, document) {
    var self
    $.fn.lenChart = function (options) {
        var defaults = {};
        var opts = $.extend({}, defaults, options);
        var obj = opts.data;
        self = this;
        var initialId = ''
        this.attr('id', initialId)
        if(obj&&Object.keys(obj).length>0){
            var level1s = '<div class="level1s"><div class="level1"><div class="content"></div></div></div>';
            var $level1s = $(level1s);
            var devider = '<div class="divider"></div>';
            var $devider = $(devider);
            var level2s = '<ul class="level2s"></ul>';
            var $level2s = $(level2s);
            
            if (obj.data && opts.renderdata) {
                opts.renderdata(obj, $level1s.find('.content'))
            }
            this.append($level1s);
            this.append($devider);
           
            var level2length = 0; //第二层数量
            if (obj.children) {
                $.each(obj.children, function (item, value) {
                    var level2 = '<li class="level2"><div class="content"></div></li>';
                    var $level2 = $(level2);
                    if (value.data && opts.renderdata) {
                        opts.renderdata(value, $level2.find('.content'));
                    }
                    if (value.children && value.children.length) {
                        var length2 = 0;
                        value.children.forEach(function(item2,index2,arr2){
                            if (item2.data.Type==1){
                            }else{
                                length2++;
                            }
                        })
                        
                        if (opts.depth == 1) {//显示一层时第二层只显示岗位不显示按钮及第三层
                            if (length2 > 0) {
                              //addIcon($level2, true);
                            }
                        } else if (opts.depth == 2) {
                            if (length2 > 0) {
                             addIcon($level2, true);
                            }
                        }else{
                             addIcon($level2, false);
                        }
                        
                        if (opts.depth == 1) {//显示一层时第二层只显示岗位
                            if (value.data && value.data.Type == 1) {
                                //level2length++;
                            }else{
                                level2length++;
                            }
                        } else {
                            level2length++;
                        }
                        
                    }
                    if (value.children) {
                        renderLevel3(value, $level2, $level2s, 3);
                    }
                })
                
                if (level2length == 1) {
                    initialId = 'oneChild'
                }
                if (level2length == 0) {
                    initialId = 'noneLevel2'
                }
                this.attr('id', initialId)
            }
            if (obj.children && obj.children.length) {
                if (opts.depth&&opts.depth==1){
                  if(level2length>0){
                      addIcon($level1s, true, 1);
                  }
                  this.attr('id', 'noneLevel2')
                } else if (opts.depth && opts.depth > 1){
                    addIcon($level1s, false, 1);
                }
                
            }
            this.append($level2s);

            function renderLevel3(obj, $level, $levels, loopIndex) {
                var levels = 'level' + loopIndex + 's';
                var level = 'level' + loopIndex;

                var level3s = '<ul class="level' + loopIndex + 's"></ul>';
                var level3 = '<li class="level' + loopIndex + '"  data-level=""><div class="content"></div></li>';
                var $level3s = $(level3s);
                var $level3 = $(level3);
                $level3.attr('data-level', loopIndex);
                if (loopIndex == 3) {
                    $level3s.addClass('tree')
                }
                if (obj.children.length) {
                    $.each(obj.children, function (item, value) {
                        var $level3 = $(level3);/*错*/
                        if (value.data && opts.renderdata) {
                            opts.renderdata(value, $level3.find('.content'))
                        }
                        var length = 0;//记录子节点Type!==1(岗位)的数量
                        if (value.children && value.children.length) {
                            value.children.forEach(function(item1,index1,arr1){
                                if(item1.data.Type==1){
                                }else{
                                    length++;
                                }
                            })
                            if (length > 0){
                            }
                            if (opts.depth && loopIndex == (parseInt(opts.depth))) {
                                if (length > 0) {
                                        addIcon($level3, true);
                                    }
                                } else if (opts.depth && loopIndex < (parseInt(opts.depth))){
                                    // 展开
                                    addIcon($level3, false);
                                }else{

                                }
                            
                        }
                        renderLevel3(value, $level3, $level3s, loopIndex + 1);
                    });
                }
                if (loopIndex==3){//第二层特殊处理
                    if (opts.depth && loopIndex < (parseInt(opts.depth) + 2)) {
                        $level3s.css({ display: "inline-block" });
                        $level.css({ display: "inline-block" });
                    } else if (opts.depth && loopIndex == (parseInt(opts.depth) + 2)){
                        if (obj.data.Type == 1){
                            $level.hide();
                        }
                    }else{
                        //$level.hide();
                        
                    }
                    $level.append($level3s);
                    $levels.append($level);
                }else{//第三层以后
                    if (opts.depth && loopIndex == (parseInt(opts.depth) + 2)) {
                            if (obj.data.Type == 1) {
                                $level.hide()
                                // $level.append($level3s);
                                // $levels.append($level);
                            }else{
                                $level.hide();
                                $level.append($level3s);
                                $levels.append($level);
                            }
                         } else if (opts.depth && loopIndex < (parseInt(opts.depth) + 2)){
                            $level.append($level3s);
                            $levels.append($level);
                         } else{
                            $level.hide();
                            $level.append($level3s);
                            $levels.append($level);
                         }
                        }
                
            }  /*renderLevel3结束*/

            function addIcon($levels,flag,depth) {
                var icon
                if (flag) {
                    icon = '<i class="plusMinus glyphicon glyphicon-plus-sign"></i>'
                } else {
                    icon = '<i class="plusMinus glyphicon glyphicon-minus-sign"></i>'
                }
                $icon = $(icon);
                $levels.find('.content').append($icon);
                // 加减按钮点击事件
                //第一层区别事件
                if(depth&&depth==1){
                    $icon.on('click',function(e){
                        var $level2s = self.find('.level2s')
                        if ($level2s.is(":visible")){
                            self.attr('id', 'noneLevel2');
                            $(this).attr('title', 'Expand this branch').addClass('glyphicon-plus-sign').removeClass('glyphicon-minus-sign');
                        }else{
                            self.attr('id', initialId);
                            avoid();
                            $(this).attr('title', 'Collapse this branch').addClass('glyphicon-minus-sign').removeClass('glyphicon-plus-sign');
                        }
                    }) 
                }else{
                    $icon.on('click', function (e) {
                        var children = $(this).closest('li.parent_li').find(' > ul > li');
                        if (children.is(":visible")) {
                            children.hide('fast', function () {
                                avoid();
                            });
                            $(this).attr('title', 'Expand this branch').addClass('glyphicon-plus-sign').removeClass('glyphicon-minus-sign');
                        } else {
                            children.show('fast', function () {
                                avoid();
                            });
                            children.css({ overflow: 'visible' })
                            $(this).attr('title', 'Collapse this branch').addClass('glyphicon-minus-sign').removeClass('glyphicon-plus-sign');
                        }

                        e.stopPropagation();
                    })
                }
            }
            // 加减按钮点击事件
            $('.orgWrap li:has(ul>li)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            avoid();
            if (opts.drag) {
                drag(this)
            }
            if (opts.callback) {
                opts.callback()
            }
        }
    }//$.fn结束

    /*防止第二层折行*/
    function avoid() {
        var $level2 = $('.level2s').children('.level2:visible');
        var _width = parseInt($level2.width());
        var maxHeight = $level2.height();
        var allWidth = 0;/*累加第二层宽度*/
        /*js获取元素属性兼容*/
        function getStyle(obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, false)[attr];
            }
        }

        $level2.each(function () {
            if (!$(this).find('li.level3').size()) {
                $(this).addClass('noneChild')
            }

            var _height = $(this).height();
            allWidth += $(this).outerWidth(true);
            var left = 0;
            for (var i = 0; i < $(this).index(); i++) {
                var contentWidth = parseInt(window.getComputedStyle($level2[i]).width);
                var paddingLeft = parseInt(window.getComputedStyle($level2[i]).paddingLeft);
                var paddingright = parseInt(window.getComputedStyle($level2[i]).paddingRight);
                width = contentWidth + paddingLeft + paddingright;
                left += width;
            }
            /*向右堆叠*/
            // $(this).css('left', allWidth - $(this).outerWidth(true));
        });
        /*为没有子节点的第二层添加右padding*/

        /**/
        var lastlevel2 = $('.level2:last-child');
        var lastWidth = parseInt(lastlevel2.css('width'));

        $('.divider').css('width', allWidth - lastWidth);
        $('.divider').css('left', parseInt($level2.find('.content').css('width')) / 2);
        /*防止第二层折行*/
        $('.level2s').css('width', allWidth + 200);
        self.css('width', allWidth + 200);
        self.css('margin-left', -allWidth / 2 - 100);
    }
    //拖拽
    /*网页拖拽*/
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

})(jQuery, window, document)
