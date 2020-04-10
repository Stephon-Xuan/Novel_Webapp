/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-11 16:32:32
 * @version $Id$
 */
$(function() {
    
    //返回
    var back_tap = function() {
            window.location.href="index.html"
    }

    //小说框加载
    var novel_content = function(data) {
        $('div.series_bar').append('<div class="novel_bar"><ul class="novel_box clearfix"><ul></div>');
        for (k = 0; k < data.length; k++) {
            $('div.series_bar div.novel_bar ul.novel_box').append(
                '<li>' +
                '<img src="images/cover/u=2132211606,2010640083&fm=58&bpow=580&bpoh=861.jpg" alt="">' +
                '<div class="book_name">斗罗大陆</div>' +
                '<b class="abstract">小小的唐三在圣魂村开始了他的魂师修炼之路，并萌生了振兴唐门的梦想。</b>' +
                '<p class="author">唐家三少</p>' +
                '<em class="tag_small yellow">仙侠奇缘</em>' +
                '<em class="tag_small red">连载</em>' +
                // '<em class="tag_small blue">288.6万字</em>' +
                '</li>')

        }

    }

    //去除小说框
    var novel_content_remove = function() {
            $('div.series_bar').children('div').remove();
    }

    //小说内容填充
    var nove_load_set = function(data) {
        // console.log($('div.series_bar div.novel_bar div.novel_nav b').eq(i).text())
        // var li_index = $('div.series_bar div.novel_bar ul.novel_box').children();
        for (var k = 0; k < data.length; k++) {
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('img').attr('src', data[k].path)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('div.book_name').text(data[k].name)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('b').text(data[k].message)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('p').text(data[k].author)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('em').eq(0).text(data[k].type)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('em').eq(1).text(data[k].style)
            // $('div.series_bar div.novel_bar ul.novel_box').eq(i).children('li').eq(k).children('em').eq(2).text(data[k].countNumber)
        }
    }

    //小说点击-手机端点击
    var novel_tap = function(data) {
        for (var j = 0; j < data.length; j++) {
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(j).tap(function() {
                var b = $(this).index()-1;
                //console.log(b)
                window.location.href = 'book.html'
                //?i='+i+'&&'+'index='+b;
                //console.log(data[b].bid);
                window.localStorage.novel_detail = JSON.stringify(data[b]);
                window.localStorage.novel_detail2 = JSON.stringify('排行榜');
            });
        }
    }

     //小说点击-PC端点击
    var novel_click = function(data) {
        for (var j = 0; j < data.length; j++) {
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(j).click(function() {
                var b = $(this).index()-1;
                //console.log(b)
                window.location.href = 'book.html'
                //?i='+i+'&&'+'index='+b;
                //console.log(data[b].bid);
                window.localStorage.novel_detail = JSON.stringify(data[b]);
                window.localStorage.novel_detail2 = JSON.stringify('排行榜');
            });
        }
    }
    //小说加载ajax
    var novel_aj = function() {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/search/sort.action',
            // post payload:
            dataType: 'json',
            success: function(data) {
                //console.log('交互成功');
                //console.log(data);
                novel_content(data);
                nove_load_set(data);
                if(isMobile){
                    novel_tap(data);
                }
                if (!isMobile) {
                    novel_click(data);
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
    novel_aj();
    
    //排行导航点击-手机端
    var rank_tap =function(){
         var sent_id = $('div#rank_bar ul li');
        for (var b = 0; b < sent_id.length; b++) {
                 sent_id.eq(b).tap(function() {
                novel_content_remove();
                novel_aj();
                for (i = 0; i < sent_id.length; i++) {
                    sent_id.eq(i).removeClass('active');
                    
                }
                $(this).addClass('active');
                console.log("点到我了");
            });
            }
    }
    //排行导航点击-PC端点击
     var rank_clcik =function(){
         var sent_id = $('div#rank_bar ul li');
        for (var b = 0; b < sent_id.length; b++) {
                sent_id.eq(b).click(function() {
                novel_content_remove();
                novel_aj();
                for (i = 0; i < sent_id.length; i++) {
                    sent_id.eq(i).removeClass('active');
                    
                }
                $(this).addClass('active');
                console.log("点到我了");
            });
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
        $('div.back_bar img').tap(function() {
            back_tap(); //返回函数
        });
        rank_tap();//排行导航点击
    }
    /*-------------------------电脑版版点击-------------------------------------*/
    if (!isMobile) {
        //返回键点击
        $('div.back_bar img').click(function() {
            back_tap(); //返回函数
        });
        rank_clcik();//排行导航点击
    }
});