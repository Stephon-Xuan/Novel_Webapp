/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-01-07 05:25:17
 * @version $Id$
 */
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-11 21:52:15
 * @version $Id$
 */
$(function() {
	//var a = JSON.parse(window.localStorage.novel_detail);
    var back_tap = function() {
        $('div.back_bar img').tap(function() {
            window.location.href="index.html";
        });
    }
back_tap();

   var novel_tap = function(data) {
        for (var j = 0; j < data.length; j++) {
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(j).tap(function() {
                var b = $(this).index()-1;
                window.location.href = 'book.html'
                //?i='+i+'&&'+'index='+b;
                window.localStorage.novel_detail = JSON.stringify(data[b]);
                window.localStorage.novel_detail2 = JSON.stringify('书架');
            });
        }
    }
 
    //小说加载
    var novel_content = function(data) {
        $('div.series_bar').append('<div class="novel_bar"><ul class="novel_box clearfix"><ul></div>');
        for (var i = 0; i < data.length; i++) {
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
    var nove_load_set = function(data) {
        var li_index = $('div.series_bar div.novel_bar ul.novel_box').children('li');
        for (var k = 0; k < li_index.length; k++) {
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('img').attr('src', data[k].path)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('div.book_name').text(data[k].name)
            //$('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('b').text(data[k].bookMessage)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('p').text(data[k].author)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('em').eq(0).text(data[k].type)
            $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('em').eq(1).text(data[k].style)
            // $('div.series_bar div.novel_bar ul.novel_box').children('li').eq(k).children('em').eq(2).text('38.2万字')
        }
    }
     var novel_aj = function(id) {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/message/ishot.action',
            dataType: 'json',
            data: {
                'ishot': id
            },
            // contentType: 'application/json;charset=uft-8',
            success: function(data) {
                //console.log(a + '交互成功');
                novel_content(data);
                nove_load_set(data);
                novel_tap(data);
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
            }
        });
    }
    novel_aj(id);
});
