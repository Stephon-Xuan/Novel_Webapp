$(function() {

    var flag = 0;
    var back_tap = function() {
            window.location.href="index.html";
    }
    //小说加载
    var novel_content = function(data) {
        $('div.series_bar').append('<div class="novel_bar"><ul class="novel_box clearfix"><ul></div>')
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
    
    //小说框移除
    var novel_content_remove = function() {
        $('div.series_bar').children("div").remove();

    }

    //小说内容填充
    var nove_load_set = function(data) {
        // console.log($('div.series_bar div.novel_bar div.novel_nav b').eq(i).text())
        // var li_index = $('div.series_bar div.novel_bar ul.novel_box').eq(i).children();
        for (var k = 0; k < data.length; k++) {
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('img').attr('src', data[k].path);
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
                console.log(data[b].bid);
                window.localStorage.novel_detail = JSON.stringify(data[b]);
                window.localStorage.novel_detail2 = JSON.stringify('分类');
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
                console.log(data[b].bid);
                window.localStorage.novel_detail = JSON.stringify(data[b]);
                window.localStorage.novel_detail2 = JSON.stringify('分类');
            });
        }
    }

    //获取类型名ajax
    var type_aj = function() {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/message/h_type.action',
            dataType: 'json',
            data: {},
            success: function(data) {
                //console.log('类型名交互成功');
                //console.log(data);
                // for (var i = 0; i < 8; i++) {
                //     novel_aj(i, data[i].type);
                // }
                // $('div.fixed div.sort_bar').append('<ul class="sort_nav clearfix"><ul>')
                for (var i = 0; i < data.length; i++) {
                    $('div.fixed div.sort_bar div.sort_box ul').append('<li></li>');
                    $('div.fixed div.sort_bar div.sort_box ul li').eq(i).text(data[i].type);
                }
                $('div.fixed div.sort_bar div.sort_box ul li').eq(0).addClass('active');
                novel_aj(data[0].type);
                if(isMobile){
                    type_tap(data);
                }
                if(!isMobile){
                    type_click(data);
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
    type_aj();

    //获取对应类型的小说
    var novel_aj = function(type) {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/message/type.action',
            dataType: 'json',
            data: {
                'type': type
            },
            success: function(data) {
                //console.log('交互成功');
                //console.log(data);
               // novel_content_remove();
                novel_content(data);
                // novel_content_hide(i);
                nove_load_set(data);
                if(isMobile){
                    novel_tap(data);
                }
                if(!isMobile){
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
   

    //类型点击-手机端点击
    var type_tap = function(data) {
         var sort_tap = $('div.fixed div.back_bar img.sort_img');
    sort_tap.tap(function() {
        if (flag == 0) {
            $('div.sort_bar').show()
            $('div.series_bar').css('margin-top', '32%')
            flag = 1;
        } else {
            $('div.sort_bar').hide()
            $('div.series_bar').css('margin-top', '10%')
            flag = 0;
        }
    })
        var sent_id = $('div.fixed div.sort_bar div.sort_box ul.sort_nav li');
        //console.log(sent_id);
        for (var i = 0; i < sent_id.length; i++) {
            sent_id.eq(i).tap(function() {
                novel_content_remove();
                // console.log($(this).index());
                // console.log(data[$(this).index()].type)
                novel_aj(data[$(this).index()].type);
                //为点击的li加上样式、隐藏和显示相关的小说内容
                for (i = 0; i < sent_id.length; i++) {
                    sent_id.eq(i).removeClass('active')
                    // novel_content_remove();
                    // $('div.series_bar div.novel_bar').eq(i).hide()
                }
                $(this).addClass('active')
                // $('div.series_bar div.novel_bar').eq(num - 1).show()
            });
        }
    }

    //类型点击-PC端点击
    var type_click = function(data) {
    var sort_tap = $('div.fixed div.back_bar img.sort_img');
    sort_tap.click(function() {
        if (flag == 0) {
            $('div.sort_bar').show()
            $('div.series_bar').css('margin-top', '10%');
            flag = 1;
        } else {
            $('div.sort_bar').hide()
            $('div.series_bar').css('margin-top', '4%');
            flag = 0;
        }
    })
        var sent_id = $('div.fixed div.sort_bar div.sort_box ul.sort_nav li');
        //console.log(sent_id);
        for (var i = 0; i < sent_id.length; i++) {
            sent_id.eq(i).click(function() {
                novel_content_remove();
                // console.log($(this).index());
                // console.log(data[$(this).index()].type)
                novel_aj(data[$(this).index()].type);
                //为点击的li加上样式、隐藏和显示相关的小说内容
                for (i = 0; i < sent_id.length; i++) {
                    sent_id.eq(i).removeClass('active')
                }
                $(this).addClass('active')
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
        $('div.fixed div.back_bar img').eq(0).tap(function() {
            back_tap(); //返回函数
        });
       
    }
    /*-------------------------电脑版版点击-------------------------------------*/
    if (!isMobile) {
        //返回键点击
        $('div.fixed div.back_bar img').eq(0).click(function() {
            back_tap(); //返回函数
        });
        $('div.series_bar').css('margin-top', '4%');//分类的小说的顶部的样式
    }

});