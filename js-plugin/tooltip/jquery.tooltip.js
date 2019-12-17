(function($){
   $.fn.tooltip = function(opts){
       var defaultOpts = {
           content: 'tooltip',
           placement: 'top'
        };

        var options = $.extend({}, defaultOpts, opts);
        this.on('click',function(e){
            debugger;
            if (!e) e = window.event;
            var tooltip ='<div class="len-tooltip">'+
                           '<div class="tooltip-content"></div>'+ 
                           '<span class="tooltip-trangle"></span>'+          
                        '</div>';
            var $toolTip = $(tooltip);

            $toolTip.find('.tooltip-content').text(options.content);
            
            $toolTip.addClass(options.placement);

            setTooltipPos($toolTip,e)

            $("body").append($toolTip);

            $(window).on('scroll',function(){
               setTooltipPos($toolTip, e)
            })     
        })
    }
    //设置tooptip位置
    function setTooltipPos($toolTip,e) {
        var pos = getAbsPosition(e.target);
        // $toolTip.css({ left: pos.x, top: pos.y, position: 'fixed' })
        $toolTip.css({ left: e.pageX, top: e.pageY, position: 'fixed' })
    }
    //获取一个元素坐标
    //获取元素相对于屏幕绝对位置
    function getAbsPosition(element) {
        var abs = { x: 0, y: 0 }
        //如果浏览器兼容此方法
        if (document.documentElement.getBoundingClientRect) {
            //如果不用jQuery对象，可以使用else分支。
            abs.x = element.getBoundingClientRect().left;
            abs.y = element.getBoundingClientRect().top;
            // abs.y += window.screenTop +
            //     document.documentElement.scrollTop -
            //     document.documentElement.clientTop;
            abs.x += window.screenLeft +
                document.body.clientLeft - document.body.scrollLeft;
            abs.y += window.screenTop +
                document.body.clientTop - document.body.scrollTop;
        }
        //如果浏览器不兼容此方法
        else {
            while (element != document.body) {
                abs.x += element.offsetLeft;
                abs.y += element.offsetTop;
                element = element.offsetParent;
            }
            //计算相对位置
            abs.x += window.screenLeft +
                document.body.clientLeft - document.body.scrollLeft;   
            abs.y += window.screenTop +
                document.body.clientTop - document.body.scrollTop;
        }
        return abs;
    }
})(jQuery)