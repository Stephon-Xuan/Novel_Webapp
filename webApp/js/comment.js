/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-20 10:55:11
 * @version $Id$
 */
var novel_detail = JSON.parse(window.localStorage.novel_detail);
var novel_title = JSON.parse(window.localStorage.novel_title);
var novel_index = JSON.parse(window.localStorage.novel_index);
var user_id = JSON.parse(window.localStorage.user_id);
$(function() {

    //返回
    var back_tap = function() {
            window.history.go(-1);
    }

    //标题书名、章数、章名填充
    var back_set = function(){
        $('div.back_bar span').children('span').eq(0).text(novel_detail.name);
        $('div.back_bar span').children('span').eq(1).text(novel_index);
        $('div.back_bar span').children('span').eq(2).text(novel_title.title);
    }
    back_set();

    
    //所有用户评论返回ajax
    var Allcomemnt_return_aj = function() {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/search/returnTitleComment.action',
            // post payload:
            dataType: 'json',
            data: {
                'title': novel_title.title,
            },
            // contentType: 'application/json;charset=uft-8',
            success: function(data) {
                console.log('交互成功');
                //var aj_img_json = $.parseJSON(data);
                console.log(data);
                Allcomment_load(data);
                Allcomment_set(data);
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
            }
        });
    }
    Allcomemnt_return_aj();

    //所有评论框加载
    var Allcomment_load = function(data) {
        $('div#comment_bar').append('<ul></ul>')
        for (var i = 0; i < data.length; i++) {
            $('div#comment_bar ul').append(
                '<li class="comment_box"><img src="images/bg/5.jpg"><b>账号</b>' +
                '<p> <span>11.13</span> </p>' +
                '<h5></h5>' +
                '</li>')
        }
    }

    //所有评论内容填充
    var Allcomment_set = function(data) {
        for (var i = 0; i < data.length; i++) {
            $('div#comment_bar ul li').eq(i).children('img').attr('src', data[i].path);
            $('div#comment_bar ul li').eq(i).children('b').text('用户：' + data[i].username);
            $('div#comment_bar ul li').eq(i).children('p').children('span').text(data[i].date);
            $('div#comment_bar ul li').eq(i).children('h5').text(data[i].comment);
            console.log();
        }
    }

    //用户评论权限（是否允许评论）允许为true,不允许为false
    var access = comemntAccess_aj(); 
    function comemntAccess_aj() {
        var access=true;
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/message/askComment.action',
            // post payload:
            async : false,//异步调用
            dataType: 'json',
            data: {
                'user_id': user_id
            },
            success: function(data) {
                //console.log('评论权限交互成功');
                console.log(data+"我");
                //var access = data;
                if (data==0) {
                    access = true;
                }
                if (data==1) {
                    access = false;
                }
                
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
            }

        });
       return access;
    }

    //评论提交键点击
    var user_comment = function() {
        if(access){
          var comment_content = $.trim($('section div.ui-input input').val());
            if (comment_content == '') {
                $('section div.ui-input input').attr('placeholder', '你未评论！')
            } else if (comment_content != '') {
                comemnt_aj(comment_content);
                // comemnt_return_aj();
                window.location.href = "comment.html";
            }
        }
        if(!access){
            //console.log("你已被禁言");
            tip_show();//禁言提示
        }
    }

    //禁言提示
    var timeTag = null;
    var tip_show = function() {
        $('div.tip_bar').show();
        timeTag = setTimeout(tip_hide, 2000);
    }
    var tip_hide = function() {
        $('div.tip_bar').hide();
    }

    //新增评论提交ajax
    var comemnt_aj = function(comment_content){
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/search/comment.action',
            // post payload:
            dataType: 'json',
            data: {
                'user_id': user_id,
                'bname': novel_detail.name,
                'title': novel_title.title,
                'comment': comment_content
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
            }
        });
    }

    //新增评论框加载
    var comment_load = function(data) {
        $('div#comment_bar ul').append(
            '<li class="comment_box"><img src="images/bg/5.jpg"><b>账号</b>' +
            '<p> <span>11.13</span> </p>' +
            '<h5></h5>' +
            '</li>')
    }

    //新增评论内容填充
    var comment_set = function(data) {
        $('div#comment_bar ul li').eq(data.length - 1).children('img').attr('src', data[data.length - 1].path);
        $('div#comment_bar ul li').eq(data.length - 1).children('b').text('用户：' + data[data.length - 1].username);
        $('div#comment_bar ul li').eq(data.length - 1).children('p').children('span').text(data[data.length - 1].date);
        $('div#comment_bar ul li').eq(data.length - 1).children('h5').text(data[data.length - 1].comment);
    }

    //评论内容返回ajax
    var comemnt_return_aj = function() {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/search/returnTitleComment.action',
            dataType: 'json',
            data: {
                'title': novel_title.title,
            },
            success: function(data) {
                console.log('交互成功');
                console.log(data);
                comment_load(data);
                comment_set(data);
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
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
        $('section button').tap(function() {
            user_comment();//评论提交键点击
        });
        
    }
    /*-------------------------电脑版版点击-------------------------------------*/
    if (!isMobile) {
        //返回键点击
        $('div.back_bar img').click(function() {
            back_tap(); //返回函数
        });

       $('section button').click(function() {
            user_comment();//评论提交键点击
        });

    }
});