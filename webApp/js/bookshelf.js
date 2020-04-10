/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-11 21:52:15
 * @version $Id$
 */
$(function() {
    var user_id = JSON.parse(window.localStorage.user_id);

    //返回
    var back_tap = function() {
            window.location.href = "index.html";
    }

    //小说点击-手机端点击
    var novel_tap = function(data) {
        for (var j = 0; j < data.length; j++) {
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(j).tap(function() {
                var b = (($(this).index()+1)/2)-1;
                // console.log(b);
                // console.log($(this).index());
                window.location.href = 'book.html';
                //?i='+i+'&&'+'index='+b;
                window.localStorage.novel_detail = JSON.stringify(data[b]);
                window.localStorage.novel_detail2 = JSON.stringify('书架');
            });
        }
    }

    //小说点击-PC端点击
    var novel_click = function(data) {
        for (var j = 0; j < data.length; j++) {
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(j).click(function() {
                var b = (($(this).index()+1)/2)-1;
                // console.log(b);
                // console.log($(this).index());
                window.location.href = 'book.html';
                //?i='+i+'&&'+'index='+b;
                window.localStorage.novel_detail = JSON.stringify(data[b]);
                window.localStorage.novel_detail2 = JSON.stringify('书架');
            });
        }
    }

    //删除书架中的小说-手机端点击
    var delete_tap = function() {
        // console.log($('div#comment_bar ul li.comment_box p img'));
        var del = $('div.series_bar div.novel_bar ul.novel_box img');
        for (var i = 0; i < del.length; i++) {
            del.eq(i).index=i;
            del.eq(i).tap(function() {
                // console.log($(this).parent('p').children('span').text());
                var bname = $(this).parent('ul').children('li').eq(($(this).index()/2)-1).children('div.book_name').text();
                // var bname = $(this).siblings('li').children('div.book_name').text();
                //console.log(($(this).index()/2)-1);
                //console.log(bname);
                bookshlef_delete(bname);
            });
        }
    }
    //删除书架中的小说-PC端点击
    var delete_click = function() {
        // console.log($('div#comment_bar ul li.comment_box p img'));
        var del = $('div.series_bar div.novel_bar ul.novel_box img');
        for (var i = 0; i < del.length; i++) {
            del.eq(i).index=i;
            del.eq(i).click(function() {
                // console.log($(this).parent('p').children('span').text());
                var bname = $(this).parent('ul').children('li').eq(($(this).index()/2)-1).children('div.book_name').text();
                // var bname = $(this).siblings('li').children('div.book_name').text();
                //console.log(($(this).index()/2)-1);
                //console.log(bname);
                bookshlef_delete(bname);
            });
        }
    }

    //删除书架中的小说ajax
    var bookshlef_delete = function(bname) {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/search/deleteBook.action',
            // post payload:
            dataType: 'json',
            data: {
                'user_id': user_id,
                'name': bname
            },
            // contentType: 'application/json;charset=uft-8',
            success: function(data) {
                //console.log('交互成功');
                //var aj_img_json = $.parseJSON(data);
                //console.log(data);
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
                if (xhr.responseText == "delete success") {
                window.location.href = "bookshelf.html";
                }else{
                    console.log('删除不成功')
                }
            }
        });
    }
    
    //小说框加载
    var novel_content = function(data) {
        $('div.series_bar').append('<div class="novel_bar"><ul class="novel_box clearfix"><ul></div>');
        for (var i = 0; i < data.length; i++) {
            $('div.series_bar div.novel_bar ul.novel_box').append(
                '<li style="width:85%;">' +
                '<img src="images/cover/u=2132211606,2010640083&fm=58&bpow=580&bpoh=861.jpg" alt="">' +
                '<div class="book_name">斗罗大陆</div>' +
                '<b class="abstract">小小的唐三在圣魂村开始了他的魂师修炼之路，并萌生了振兴唐门的梦想。</b>' +
                '<p class="author">唐家三少</p>' +
                '<em class="tag_small yellow">仙侠奇缘</em>' +
                '<em class="tag_small red">连载</em>' +
                // '<em class="tag_small blue">288.6万字</em>' +
                '</li>' +
                '<img src="images/icon/delete.png" style="width:20px;height: 20px; float:right; margin-top:-100px;margin-right:20px;" class="delete">');
        }
    }

    //小说介绍内容填充
    var nove_load_set = function(data) {
        // var li_index = $('div.series_bar div.novel_bar ul.novel_box').children('li');
        for (var k = 0; k < data.length; k++) {
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('img').attr('src', data[k].path)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('div.book_name').text(data[k].name)
            //$('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('b').text(data[k].bookMessage)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('p').text(data[k].author)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('em').eq(0).text(data[k].type)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('em').eq(1).text(data[k].style)
            // $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('em').eq(2).text('38.2万字')
        }
    }
    
    //加载用户的书架ajax
    var bookshlef = function() {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/search/returnShelf.action',
            // post payload:
            dataType: 'json',
            data: {
                'user_id': user_id
            },
            // contentType: 'application/json;charset=uft-8',
            success: function(data) {
                console.log('交互成功');
                //var aj_img_json = $.parseJSON(data);
                console.log(data);
                if (data != '') {
                    novel_content(data);
                    nove_load_set(data);
                    if(isMobile){
                        novel_tap(data);
                        delete_tap();
                    }
                    if (!isMobile) {
                        novel_click(data);
                        delete_click();
                    }
                    
                } else {
                    console.log('数据为空')
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
    bookshlef();

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