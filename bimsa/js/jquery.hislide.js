(function($) {
    // 本函数每次调用只负责一个轮播图的功能
    // 也就是说只会产生一个轮播图，这个函数的作用域只能分配给一个轮播图
    // 要求在调用本函数的时候务必把当前轮播图的根标签传递过来
    // 这里的形参 ele 就是某个轮播的根标签
    var slide = function(ele,options) {
        var $ele = $(ele);
        // 默认设置选项
        var setting = {
        		// 控制轮播的动画时间
            speed: 1000,
            // 控制 interval 的时间 (轮播速度)
            interval: 20000,
            
        };
        // 对象合并
        $.extend(true, setting, options);
        // 规定好每张图片处于的位置和状态

        var states = [
            { $zIndex: 1, width: 90, height: 90, top: -45, left: 280, $opacity: 1},
            { $zIndex: 2, width: 100, height: 100, top: -10, left: -60, $opacity: 1 },
            { $zIndex: 3, width: 120, height: 120, top: 180, left: -50, $opacity: 1 },
            { $zIndex: 4, width: 170, height: 170, top: 200, left: 250, $opacity: 1 },
            { $zIndex: 3, width: 120, height: 120, top: 180, left: 580, $opacity: 1 },
            { $zIndex: 1, width: 100, height: 100, top: -5, left: 600, $opacity: 1} 
        ];

        var $lis = $ele.find('li');
        var timer = null;

        // 事件
        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        // 让每个 li 对应上面 states 的每个状态
        // 让 li 从正中间展开
        function move() {
            $lis.each(function(index, element,e) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
                $(e).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('div').css('opacity', state.$opacity);
            });
        }

        // 切换到下一张
        function next() {
            // 原理：把数组最后一个元素移到第一个
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    // 找到要轮播的轮播图的根标签，调用 slide()
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        // 返回值，以便支持链式调用
        return this;
    }
})(jQuery);
