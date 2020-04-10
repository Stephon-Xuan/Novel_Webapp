/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-20 09:57:50
 * @version $Id$
 */
$(function() {
    //上父页面获取章节和内容
    var a = JSON.parse(window.localStorage.novel_title);
    //console.log(a);
    //console.log(window.location.search)
    var url = window.location.search
    if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        //console.log(str);
        //console.log(str.split('=')[1]);
        var index = str.split('=')[1];
        window.localStorage.novel_index = JSON.stringify(index);
    }
    
    //返回按钮
    var back_tap = function() {
           window.location.href="book.html";
    }

    //头标题章节章数和章名填充
    var chapter_load = function(){
        $('div#read_bar div.read_box span').eq(0).text("第"+index+"章");
        $('div#read_bar div.read_box span').eq(1).text(a.title);
    }
    chapter_load();

    //导航点击-手机端点击
    var chapter_nav_tap = function() {
        var flag = 0;
        $('div#read_bar div.read_nav span').eq(0).tap(function() {
            if (flag == 0) {
                $('div#read_bar div.chapter_nav').show();
                flag = 1;
            } else if (flag == 1) {
                $('div#read_bar div.chapter_nav').hide();
                flag = 0;
            }
        });
    }
    //导航点击-PC端点击
    var chapter_nav_click = function() {
        var flag = 0;
        $('div#read_bar div.read_nav span').eq(0).click(function() {
            if (flag == 0) {
                $('div#read_bar div.chapter_nav').show();
                flag = 1;
            } else if (flag == 1) {
                $('div#read_bar div.chapter_nav').hide();
                flag = 0;
            }
        });
    }

    //导航条点击-手机端点击
    var nav_tap = function() {
        var flag = 0;
        $('div#read_bar div.read_box img').eq(1).tap(function() {
            if (flag == 0) {
                $('div#read_bar div.read_nav').show();
                flag = 1;
            } else if (flag == 1) {
                $('div#read_bar div.read_nav').hide();
                $('div#read_bar div.chapter_nav').hide();
                flag = 0;
            }
        });
        $('div#read_bar div.read_nav span').eq(1).tap(function() {
            if (window.localStorage.user_id) {
                window.location.href = "comment.html";
            } else {
               console.log('未登录');
            }
        });
        $('div#read_bar div.read_nav span').eq(2).tap(function() {
            //window.location.href = "download.html";
        });
    }

    //导航条点击-PC端点击
    var nav_click = function() {
        var flag = 0;
        $('div#read_bar div.read_box img').eq(1).click(function() {
            if (flag == 0) {
                $('div#read_bar div.read_nav').show();
                flag = 1;
            } else if (flag == 1) {
                $('div#read_bar div.read_nav').hide();
                $('div#read_bar div.chapter_nav').hide();
                flag = 0;
            }
        });
        $('div#read_bar div.read_nav span').eq(1).click(function() {
            if (window.localStorage.user_id) {
                window.location.href = "comment.html";
            } else {
               console.log('未登录');
            }
        });
        $('div#read_bar div.read_nav span').eq(2).click(function() {
            //window.location.href = "download.html";
        });
    }

    //章节上下转换点击-手机端点击
    var chapter_tap = function() {
        var novel_alltitle = JSON.parse(window.localStorage.novel_alltitle);
        //上一章点击
        $('div.read_nav span').eq(2).tap(function(){
            index--;
            if(index==0){
                index=1;
                console.log('已经是第一章了')
            }else{
            window.localStorage.novel_title = JSON.stringify(novel_alltitle[index-1]);
            window.localStorage.novel_index = JSON.stringify(index);
            window.location.href="read.html?b="+index;
        }
        });
        //下一章点击
        $('div.read_nav span').eq(3).tap(function() {
            index++;
            if(index>novel_alltitle.length){
                index=novel_alltitle.length;
                console.log('已经是最后一章了')
            }else{
            window.localStorage.novel_title = JSON.stringify(novel_alltitle[index-1]);
            window.localStorage.novel_index = JSON.stringify(index);
            window.location.href="read.html?b="+index;
        }
        });
    }
   
    //章节上下转换点击-PC端点击
    var chapter_click = function() {
        var novel_alltitle = JSON.parse(window.localStorage.novel_alltitle);
        //上一章点击
        $('div.read_nav span').eq(2).click(function(){
            index--;
            if(index==0){
                index=1;
                console.log('已经是第一章了')
            }else{
            window.localStorage.novel_title = JSON.stringify(novel_alltitle[index-1]);
            window.localStorage.novel_index = JSON.stringify(index);
            window.location.href="read.html?b="+index;
        }
        });
        //下一章点击
        $('div.read_nav span').eq(3).click(function() {
            index++;
            if(index>novel_alltitle.length){
                index=novel_alltitle.length;
                console.log('已经是最后一章了')
            }else{
            window.localStorage.novel_title = JSON.stringify(novel_alltitle[index-1]);
            window.localStorage.novel_index = JSON.stringify(index);
            window.location.href="read.html?b="+index;
        }
        });
    }

    //章节章数、章名、内容填充
     var chapter_num = function(data) {
        $('div#read_bar div.read_content_bar div.read_title span').eq(0).text("第"+index+"章");
        $('div#read_bar div.read_content_bar div.read_title span').eq(1).text(data[0].title);
        $('div#read_bar div.read_content_bar div.read_content text').text(data[0].content);
    }

    //获取章节内容ajax
    var chapter_content_aj = function(a) {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/message/get_content.action',
            // post payload:
            dataType: 'json',
            data: {
                'title':a.title
            },
            success: function(data) {
                //console.log('内容交互成功');
                //console.log(data);
                chapter_num(data);

            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
            }
        });
    }
    chapter_content_aj(a);
    nav_tap();

    //章节的章数、章名框加载和填充
    var chapter_box = function(){
            var novel_alltitle = JSON.parse(window.localStorage.novel_alltitle);
            for(var i=0;i<novel_alltitle.length;i++){
            $('div.chapter_nav ul').append('<li>'+
                        '<span></span>'+
                        '&nbsp;&nbsp;&nbsp;'+
                        '<p></p>'+
                    '</li>');
            $('div.chapter_nav ul li').eq(i).children('span').eq(0).text("第"+(i+1)+"章");
            $('div.chapter_nav ul li').eq(i).children('p').text(novel_alltitle[i].title);
        }
    }
    chapter_box();

    //章节选择点击-手机端点击
    var chapter_select_tap =function(){
        var novel_alltitle = JSON.parse(window.localStorage.novel_alltitle);
        for(var i=0;i<novel_alltitle.length;i++){
            $('div.chapter_nav ul li').eq(i).tap(function(){
            index=($(this).index()+1);
            window.localStorage.novel_title = JSON.stringify(novel_alltitle[index-1]);
            window.localStorage.novel_index = JSON.stringify(index);
            window.location.href="read.html?b="+index;
            })
        }
    }

     //章节选择点击-PC端点击
    var chapter_select_click =function(){
        var novel_alltitle = JSON.parse(window.localStorage.novel_alltitle);
        for(var i=0;i<novel_alltitle.length;i++){
            $('div.chapter_nav ul li').eq(i).click(function(){
            index=($(this).index()+1);
            window.localStorage.novel_title = JSON.stringify(novel_alltitle[index-1]);
            window.localStorage.novel_index = JSON.stringify(index);
            window.location.href="read.html?b="+index;
            })
        }
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
        $('div#read_bar div.read_box b img').tap(function() {
            back_tap(); //返回函数
        });
        chapter_nav_tap();//导航点击
        nav_tap();//导航条点击
        chapter_tap();//章节上下转换点击
        chapter_select_tap();
       
    }
    /*-------------------------电脑版版点击-------------------------------------*/
    if (!isMobile) {
        //返回键点击
        $('div#read_bar div.read_box b img').click(function() {
            back_tap(); //返回函数
        });
        chapter_nav_click();//导航点击
        nav_click();//导航条点击
        chapter_click();//章节上下转换点击
        chapter_select_click();
    }
});