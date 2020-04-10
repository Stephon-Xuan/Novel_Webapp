/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-20 11:04:19
 * @version $Id$
 */
$(function() {
    var back_tap = function() {
            window.history.go(-1);
    }

    var switch_tap = function() {
        var flag = 0;
        for (var i = 0; i < 2; i++) {
            $('div#download_bar ul li').eq(i).tap(function() {
                $('div#download_bar ul li').removeClass('active');
                $(this).addClass('active');
                $('div.book_display_bar').hide();
                $('div.book_display_bar').eq($(this).index()).show();
            });
        }
        for (var k = 0; k < 2; k++) {
            $('div.book_display_bar').eq(1).children('ul.book_display_box').children('li').eq(k).children('img').eq(1).tap(function() {
                if (flag == 0) {
                    $(this).attr('src', 'images/icon/download.png');
                    flag = 1;
                }
                else if (flag == 1) {
                     $(this).attr('src', 'images/icon/stop.png');
                    flag = 0;
                }
            });
        }
    }
    switch_tap();
    
    var download_aj = function() {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/search/download.action',
            dataType: 'json',
            data: {
                'filename':'泡沫之夏.txt'
            },
            success: function(data) {
                console.log('下载成功');
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
            }
        });
    }
    download_aj();
    //判断手机端还是PC端进行点击
    var isMobile = isMobile(); // true为手机端，false为PC端
    function isMobile(){
        var userAgentInfo = navigator.userAgent;
        var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var isMobile = false;
        //根据userAgent判断是否是手机
        for (var v = 0; v < mobileAgents.length; v++) {
            if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
                isMobile = true;
                break;
            }
        }
        var screen_width = window.screen.width;
        var screen_height = window.screen.height;
        //根据屏幕分辨率判断是否是手机
        if (screen_width < 500 && screen_height < 800) {
            isMobile = true;
        }
        console.log(isMobile);
        return isMobile;
    }
    /*-------------------------手机版点击-------------------------------------*/
    //返回键点击
    if (isMobile) {
        $('div.back_bar img').tap(function() {
            back_tap(); //返回函数
            ifTap = true;
        });
    }
    /*-------------------------电脑版版点击-------------------------------------*/
    if(!isMobile){
    //返回键点击
    $('div.back_bar img').click(function() {
        back_tap(); //返回函数
        ifTap = false;
    });
    }
});