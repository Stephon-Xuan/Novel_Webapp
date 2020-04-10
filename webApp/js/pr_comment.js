/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-23 16:06:40
 * @version $Id$
 */
var user_in = JSON.parse(window.localStorage.user_in);
$(function() {
    //返回
    var back_tap = function() {
            history.go(-1);
    }

    //用户评论框加载
    var Allcomment_load = function(data) {
        $('div#comment_bar').append('<ul></ul>')
        for (var i = 0; i < data.length; i++) {
            $('div#comment_bar ul').append(
                '<li class="comment_box"><img src="images/bg/5.jpg"><b><span>书名</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>章节章名</span></b>' +
                '<p> <span>11.13</span> <img src="images/icon/delete.png" style="width:15px;height: 15px; float:right;"></p>' +
                '<h5></h5>' +
                '</li>')
        }
    }

    //用户评论内容填充
    var Allcomment_set = function(data) {
        for (var i = 0; i < data.length; i++) {
            $('div#comment_bar ul li').eq(i).children('img').attr('src',data[i].path);
            $('div#comment_bar ul li').eq(i).children('b').children('span').eq(0).text(data[i].bname);
            // $('div#comment_bar ul li').eq(i).children('b').children('span').eq(1).text(data[i].title);
            // console.log(data[i].title);
            // console.log(data[i].date);
            //pr_comemnt_delete(data[i].date);
            $('div#comment_bar ul li').eq(i).children('b').children('span').eq(1).text(data[i].title);
            $('div#comment_bar ul li').eq(i).children('p').children('span').text(data[data.length - 1].date);
            $('div#comment_bar ul li').eq(i).children('h5').text(data[i].comment);
        }
    }

    //用户评论内容获取ajax
    var pr_comemnt_return_aj = function(user_in) {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/search/returnComment.action',
            dataType: 'json',
            data: {
                'username': user_in.name
            },
            success: function(data) {
                console.log('交互成功');
                console.log(data);
                Allcomment_load(data);
                Allcomment_set(data);
                if(isMobile){
                    delete_tap();
                }
                if (!isMobile) {
                    delete_click();
                }
               
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
            }
        });
    }
    pr_comemnt_return_aj(user_in);

    //删除评论点击-手机端点击
    var delete_tap = function(){
        // console.log($('div#comment_bar ul li.comment_box p img'));
        var del = $('div#comment_bar ul li.comment_box p img');
        for(var i=0;i<del.length;i++){
            del.eq(i).tap(function(){
                // console.log($(this).parent('p').children('span').text());
                var date = $(this).parent('p').children('span').text();
                pr_comemnt_delete(date);
            });
        }
    }

     //删除评论点击-PC端点击
    var delete_click = function(){
        // console.log($('div#comment_bar ul li.comment_box p img'));
        var del = $('div#comment_bar ul li.comment_box p img');
        for(var i=0;i<del.length;i++){
            del.eq(i).click(function(){
                // console.log($(this).parent('p').children('span').text());
                var date = $(this).parent('p').children('span').text();
                pr_comemnt_delete(date);
            });
        }
    }

    //删除评论ajax
     var pr_comemnt_delete = function(date) {

        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/search/deletePerComment.action',
            dataType: 'json',
            data: {
                'username': user_in.name,
                'date':date
            },
            success: function(data) {
                console.log('交互成功');
                console.log(data);
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
                window.location.href="pr_comment.html";
            }
        });
    }

    //判断手机端还是PC端进行点击
    var isMobile = isMobile(); // true为手机端，false为PC端
    function isMobile() {
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
    if (isMobile) {
        //返回键点击
        $('div.back_bar img').tap(function() {
            back_tap(); //返回函数
        });
    }
    /*-------------------------电脑版版点击-------------------------------------*/
    if (!isMobile) {
        //返回键点击
        $('div.back_bar img').click(function() {
            back_tap(); //返回函数
        });
    }
});