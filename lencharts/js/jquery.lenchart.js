(function ($, window, document) {
    $.fn.lenChart = function (options) {
        var defaults = {};
        var opts = $.extend({}, defaults, options);

        var obj = opts.data;
        var level1s = '<div class="level1s"><div class="level1"><div class="content"></div></div></div>';
        var $level1s = $(level1s);
        var devider = '<div class="divider"></div>';
        var $devider = $(devider);
        var level2s = '<ul class="level2s"></ul>';
        var $level2s = $(level2s);
        if (obj.data && opts.renderdata) {
            opts.renderdata(obj, $level1s.find('.content'))
        }
        if (obj.children && obj.children.length) {
            addIcon($level1s, false);
        }
        $('.orgWrap').append($level1s);
        $('.orgWrap').append($devider);
        var level2length = 0; //第二层数量
        if (obj.children) {
            $.each(obj.children, function (item, value) {
                level2length++;
                var level2 = '<li class="level2"><div class="content"></div></li>';
                var $level2 = $(level2);
                if (value.data && opts.renderdata) {
                    opts.renderdata(value, $level2.find('.content'));
                }
                if (value.children && value.children.length) {
                    addIcon($level2, false);
                }
                if (value.children) {
                    // var index = 3;
                    console.log(value.children.length)

                    renderLevel3(value, $level2, $level2s, 3);
                }

            })
            if (level2length == 1) {
                $('.orgWrap').attr('id', 'oneChild')
            }
        }
        $('.orgWrap').append($level2s);
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
                    if (value.children && value.children.length) {
                        if (opts.depth && loopIndex == opts.depth) {
                            // 收起
                            addIcon($level3, true);
                        } else {
                            // 展开
                            addIcon($level3, false);
                        }

                    }
                    // 隐藏下级
                    if (opts.depth && loopIndex == (parseInt(opts.depth) + 1)) {

                        $level3.hide()
                    }
                    $level3s.append($level3);
                    renderLevel3(value, $level3, $level3s, loopIndex + 1);
                });

            }

            $level.append($level3s);
            $levels.append($level)

        }  /*renderLevel3结束*/
        function addIcon($levels, flag) {
            var icon
            if (flag) {
                icon = '<i class="plusMinus glyphicon glyphicon-plus-sign"></i>'
            } else {
                icon = '<i class="plusMinus glyphicon glyphicon-minus-sign"></i>'
            }
            $icon = $(icon);
            $levels.find('.content').append($icon);
            // 加减按钮点击事件
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
        // 加减按钮点击事件
        $('.orgWrap li:has(ul>li)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
        avoid();
        if (opts.drag) {
            drag(this)
            if (opts.callback) {
                opts.callback()
            }
        }
    }//$.fn结束

    /*防止第二层折行*/
    function avoid() {
        var $level2 = $('.level2s').children('.level2');

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
        $('.orgWrap').css('width', allWidth + 200);
        $('.orgWrap').css('margin-left', -allWidth / 2 - 100);
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