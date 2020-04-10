/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-11 21:38:08
 * @version $Id$
 */
$(function() {
    //返回
    var back_tap = function() {
        history.go(-1)
    }

    //小说框加载
   var nove_load = function(data, i) {
        $('div.series_bar').append('<div class="novel_bar">' +
            '<ul class="novel_box clearfix"></ul>' +
            '</div>');
        for (var j = 0; j < data.length; j++) {
            $('div.series_bar div.novel_bar ul.novel_box').eq(i).append(
                '<li>' +
                '<img src="images/cover/u=2132211606,2010640083&fm=58&bpow=580&bpoh=861.jpg" alt="">' +
                '<div class="book_name">斗罗大陆</div>' +
                '<b class="abstract">小小的唐三在圣魂村开始了他的魂师修炼之路，并萌生了振兴唐门的梦想。</b>' +
                '<p class="author">唐家三少</p>' +
                '<em class="tag_small yellow">仙侠奇缘</em>' +
                '<em class="tag_small red">连载</em>' +
                '<em class="tag_small blue">288.6万字</em>' +
                '</li>')
        }

    }

    //小说内容加载
    var nove_load_set = function(data, i) {
        console.log($('div.series_bar div.novel_bar div.novel_nav b').eq(i).text())
        var li_index = $('div.series_bar div.novel_bar ul.novel_box').eq(i).children();
        for (var k = 0; k < li_index.length; k++) {
            var a = data[k].bookPath.split('novel/')
            $('div.series_bar div.novel_bar ul.novel_box').eq(i).children('li').eq(k).children('img').attr('src', 'http://193.112.8.16/web-novel/' + a[1])
            $('div.series_bar div.novel_bar ul.novel_box').eq(i).children('li').eq(k).children('div.book_name').text(data[k].bookName)
            $('div.series_bar div.novel_bar ul.novel_box').eq(i).children('li').eq(k).children('b').text(data[k].bookMessage)
            $('div.series_bar div.novel_bar ul.novel_box').eq(i).children('li').eq(k).children('p').text('我不是斗罗大陆')
            $('div.series_bar div.novel_bar ul.novel_box').eq(i).children('li').eq(k).children('em').eq(0).text('我不是斗罗大陆')
            $('div.series_bar div.novel_bar ul.novel_box').eq(i).children('li').eq(k).children('em').eq(1).text('完结')
            $('div.series_bar div.novel_bar ul.novel_box').eq(i).children('li').eq(k).children('em').eq(2).text('38.2万字')
        }

    }

    //获取小说内容
    var novel_aj = function(id,a) {
        $.ajax({
            type: 'GET',
            url: 'http://193.112.8.16/web-novel/message/hot.action',
            // post payload:
            dataType: 'json',
            data: {
                'id':id
            },
            // contentType: 'application/json;charset=uft-8',
            success: function(data) {
                console.log('交互成功');
                //var aj_img_json = $.parseJSON(data);
                console.log(data);
                /*for (var i = 0; i < 5; i++) {
                    var a = data[i].path.split('novel/')
                        $('div.sowing_bar ul.sowing_img li img').eq(i).attr('src','http://193.112.8.16/web-novel/'+a[1])
                }*/
                nove_load(data,a);
                nove_load_set(data,a);
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
            }
        });
    }
    novel_aj(0,0);
    //groom_novel_aj();

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