var month = {'Jan': '1月', 'Feb': '2月', 'Mar': '3月', 'Apr': '4月', 'May': '5月', 'Jun': '6月', 'Jul': '7月', 'Aug': '8月', 'Sep': '9', 'Oct': '10月', 'Nov': '11月', 'Dec': '12月'},
    week = {'Mon': '星期一', 'Tue': '星期二', 'Wed': '星期三', 'Thu': '星期四', 'Fri': '星期五', 'Sat': '星期六', 'Sun': '星期天'},
    $t = $('.middle-date p:nth-child(1)'),
    $d = $('.middle-date p:nth-child(2)');
function timeSet() {
    var time1 = new Date().toString(),
        w = time1.substring(0, 3),
        m = time1.substring(4, 7),
        d = parseInt(time1.substring(8, 10)),
        t = time1.substring(16, 21),
        str2 = month[m] + d + '日 ' + week[w];
    $t.html(t);
    $d.html(str2);
}
timeSet();
window.timer = window.setInterval(timeSet, 30000);
var $lock = $('.topInfo i'),
    mySwiper1 = new Swiper('.swiper-container1', {
    effect: 'fade',
    direction: 'vertical',
    onTransitionEnd: function (swiper) {
        var curIndex = swiper.activeIndex,
            swipers = swiper.slides;
        if(curIndex == 1){
            var mySwiper2 = new Swiper('.swiper-container2', {
                loop: true,
                effect: 'coverflow',
                direction: 'horizontal',
                //autoplay: 7000,
                autoplayDisableOnInteraction: false,
                onTransitionEnd: function (swiper) {
                    var curIndex = swiper.activeIndex,
                        slides = swiper.slides;
                    $(slides).each(function (index, item) {
                        item.id = '';
                        $(item).children('.content').css('opacity', 0);
                        if(curIndex == index){
                            switch (curIndex){
                                case 0:
                                    item.id = 'slide' + (slides.length - 2);
                                    $(item).children('.content').css('opacity', 1);
                                    break;
                                case (slides.length - 1):
                                    item.id = 'slide' + 1;
                                    $(item).children('.content').css('opacity', 1);
                                    break;
                                default:
                                    item.id = 'slide' + index;
                                    $(item).children('.content').css('opacity', 1);
                            }
                        }
                    })
                }
                /*pagination: '.swiper-pagination',
                 paginationType: 'fraction'*/
            });
            mySwiper1.removeSlide(0);
            $lock.css('backgroundPosition', '-.12rem 0');
            window.clearInterval(window.timer);
        }
    }
    /*pagination: '.swiper-pagination',
     paginationType: 'fraction'*/
});
var main = $('.main')[0];
/*音乐控制*/
var musicPlay = (function () {
    function musicReset() {
        var music = $(main).children('.music')[0],
            audio = $(music).children('audio')[0],
            $lis = $(music).find('li');
        function on_off(flag) {
            if(flag){
                $lis.each(function (index, item) {
                    item.style.animationPlayState = 'running';
                })
            }else {
                $lis.each(function (index, item) {
                    item.style.animationPlayState = 'paused';
                })
            }
        }
        window.setTimeout(function () {
            audio.play();
            audio.addEventListener('canplay', function () {
                on_off(1);
            });
        }, 1000);
        music.onclick = function () {
            if(audio.paused){
                audio.play();
                on_off(1);
            }else {
                audio.pause();
                on_off(0);
            }
        };
    }
    return {
        init: function () {
            musicReset();
        }
    }
})();
/*第四屏操作*/
var fourth = (function () {
    function on() {
        var $p = $('.title'),
            $box = $('.box'),
            $list = $box.find('li'),
            $puzzle = $('.puzzle'),
            $three_dimensional = $('.three-dimensional'),
            $ball = $('.ball'),
            $baw = $('.baw'),
            $spans = $puzzle.find('span'),
            span = $spans[0],
            positionList = [['0px', '0px'],['100px', '0px'],['200px', '0px'],['0px', '100px'],['100px', '100px'],['200px', '100px'],['0px', '200px'],['100px', '200px'],['200px', '200px']],
            list1 = null,
            num = 0,
            key = null,
            step = 0,
            $b = $puzzle.find('b');
        $list.each(function (index, item) {
            $(item).on('click', function () {
                switch ($(item).html()){
                    case '拼图':
                        $box.animate({'opacity': 1}, 800, function () {
                            $puzzle.css('display', 'block').addClass('on');
                        });
                        break;
                    case '3D':
                        $box.animate({'opacity': 1}, 800, function () {
                            $three_dimensional.css('display', 'block').addClass('on');
                        });
                        break;
                    case '弹弹球':
                        $box.animate({'opacity': 1}, 800, function () {
                            $ball.css('display', 'block').addClass('on');
                        });
                        break;
                    default:
                        $box.animate({'opacity': 1}, 800, function () {
                            $baw.css('display', 'block').addClass('on');
                        });
                }
                $box.removeClass('off');
                $box.addClass('on');
                $p.css('marginTop', '.5rem').html('点击返回');
            });
        });
        $p.on('click', function () {
            $box.removeClass('on');
            $box.addClass('off');
            $box.siblings().css('display', 'none');
            $(this).css('display', 'block');
            $p.css('marginTop', '1rem').html('作品展示');
        });
        $spans.each(function (index, item) {
            $(item).on('click', function () {
                if(index == 0) return;
                if(($(this).css('left') == $(span).css('left')) && (Math.abs(parseFloat($(this).css('top')) - parseFloat($(span).css('top'))) <= 100)){
                    var t = $(this).css('top'),
                        l = $(this).css('left');
                    $(this).css('left', $(span).css('left')).css('top', $(span).css('top'));
                    $(span).css('left', l).css('top', t);
                    $b.html('步数：' + ++step);
                    check();
                    return;
                }
                if(($(this).css('top') == $(span).css('top')) && (Math.abs(parseFloat($(this).css('left')) - parseFloat($(span).css('left'))) <= 100)){
                    var t = $(this).css('top'),
                        l = $(this).css('left');
                    $(this).css('left', $(span).css('left')).css('top', $(span).css('top'));
                    $(span).css('left', l).css('top', t);
                    $b.html('步数：' + ++step);
                    check();
                }
            })
        });
        function setPosition() {
            step = 0;
            $b.html('步数：' + step);
            list1 = positionList.slice();
            $spans.each(function (index, item) {
                num = Math.round(Math.random() * (list1.length - 1));
                key = list1.splice(num, 1);
                $(item).css({'left': key[0][0], 'top': key[0][1]});
            })
        }
        setPosition();
        function check() {
            for(var i = 0; i < positionList.length; i++){
                if(!($spans[i].style.left == positionList[i][0] && $spans[i].style.top == positionList[i][1])){
                    return;
                }
            }
            window.setTimeout(function () {
                alert("Congratulation！Your step is : " + step);
                setPosition();
            }, 500);
        }
    }
    return {
        init: function () {
            on();
        }
    }
})();
/*顶部状态栏*/
var topState = (function () {
    function topReset() {
        var topInfo = $('.topInfo')[0],
            $lis = $(topInfo).find('li'),
            right = $(topInfo).find('.right')[0],
            inner = $(right).find('.inner'),
            $span = $(right).find('span'),
            total = 100,
            ranNum = 0;
        window.setInterval(function () {
            ranNum = $lis.length - Math.round(Math.random() * 3) - 1;
            $lis.each(function (index, item) {
                if(index > 1){
                    index > ranNum ? $(item).css('backgroundColor', 'transparent') : $(item).css('backgroundColor', '#fff');
                }
            })
        }, 5000);
        var totalWidth = parseFloat($(inner).css('width'));
        inner.timer = window.setInterval(function () {
            if(total == 20){
                $(inner).css('backgroundColor', 'red');
            }
            if(total == 3){
                window.clearInterval(inner.timer);
            }
            $(inner).css('width', totalWidth * total / 100);
            $span.html(total-- + '%');
        }, 3000);
    }
    return {
        init: function () {
            topReset();
        }
    }
})();
window.onload = function () {
    musicPlay.init();
    topState.init();
    fourth.init();
};