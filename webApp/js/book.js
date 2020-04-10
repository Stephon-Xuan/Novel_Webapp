/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-17 20:40:59
 * @version $Id$
 */
$(function() {
    var a = JSON.parse(window.localStorage.novel_detail);
    //console.log(a);
    console.log(window.location.search)
    var url = window.location.search
    if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        strs = str.split("&&");
        //console.log(strs);
        //console.log(strs[1].split('=')[1]);
        var index = strs[1].split('=')[1];
    }
    //返回上一页
     var back_tap = function() {
            var novel_detail2 = JSON.parse(window.localStorage.novel_detail2);
            if(novel_detail2=='首页'){
            window.location.href='index.html'
            }
            if(novel_detail2=='排行榜'){
            window.location.href='ranking_list.html'
            }
            if(novel_detail2=='分类'){
            window.location.href='sort.html'
            }
            if(novel_detail2=='书架'){
            window.location.href='bookshelf.html'
            }
            if(novel_detail2=='搜索'){
            window.location.href='search.html'
            }
    }

   //目录、下载、加入书架导航-手机端点击
    var nav_tap = function(){
        for(var i = 0;i<3;i++){
        $('div#book_nav ul.book_nav_box li').eq(i).tap(function(){
            $('div#book_nav ul.book_nav_box li').removeClass('active')
            $(this).addClass('active');
            //console.log(this.index);
            if($(this).index()==1){
                //window.location.href='download.html';
            }
            if($(this).index()==2){
                if(window.localStorage.user_id){
                var user_id = JSON.parse(window.localStorage.user_id);
                bookshlef(a,user_id);
                // bookshelf_aj(a,user_id);
               // window.location.href='bookshelf.html';
                }else{
                 console.log("未登录");
                }
            }

        })
    }
    }
    //目录、下载、加入书架导航-PC端点击
    var nav_click = function(){
        for(var i = 0;i<3;i++){
        $('div#book_nav ul.book_nav_box li').eq(i).click(function(){
            $('div#book_nav ul.book_nav_box li').removeClass('active')
            $(this).addClass('active');
            //console.log(this.index);
            if($(this).index()==1){
                //window.location.href='download.html';
            }
            if($(this).index()==2){
                if(window.localStorage.user_id){
                var user_id = JSON.parse(window.localStorage.user_id);
                bookshlef(a,user_id);
                // bookshelf_aj(a,user_id);
               // window.location.href='bookshelf.html';
                }else{
                 console.log("未登录");
                }
            }

        })
    }
    }
    //小说介绍填充
    var novel_content_set = function() {
        //console.log(a.bid)
        $('div.back_bar span').text(a.name)
        $('div#book_bar img').attr('src',a.path)
        $('div#book_bar div.book_detail p').eq(0).text(a.name)
        $('div#book_bar div.book_detail p').eq(1).text(a.author)
        $('div#book_bar div.book_detail p').eq(2).text(a.type)
        // $('div#book_bar div.book_detail span').eq(0).text(a.countNumber)
        $('div#book_bar div.book_detail span').eq(0).text(a.style)
    }
    novel_content_set();

    //加载小说章节框
    var novel_chater = function(data) {
        $('div#chapter_bar').append('<div class="chapter_top">' +
            '共<span>1187</span>章' +
            '<p>正序</p>' +
            '</div>' +
            '<div class="chapter_box">' +
            '<ul></ul>' +
            '</div>'
        )
        for (var i = 0; i < data.length; i++) {
            $('div#chapter_bar div.chapter_box ul').append('<li>' +
                '第<span>一</span>章&nbsp;&nbsp;&nbsp;<p>斗罗大陆初章</p>' +
                '</li>')
        }
    }

    //小说章节加载
    var novel_chater_set = function(data) {
        $('div#chapter_bar div.chapter_top span').text(data.length + 1)
        for (var i = 0; i < data.length; i++) {
            $('div#chapter_bar div.chapter_box ul li').eq(i).children('span').text(i + 1)
            $('div#chapter_bar div.chapter_box ul li').eq(i).children('p').text(data[i].title)
        }
    }

    //小说章节点击-手机端点击
    var novel_chater_tap = function(data) {
        for (var i = 0; i < data.length; i++) {
            $('div#chapter_bar div.chapter_box ul li').eq(i).tap(function() {
                var b = $(this).index();
                window.localStorage.novel_content = JSON.stringify(data[b])
                window.location.href = 'read.html?b='+(b+1);
                window.localStorage.novel_title = JSON.stringify(data[b]);
                 window.localStorage.novel_alltitle = JSON.stringify(data);
            })
        }
    }
     //小说章节点击-PC端点击
    var novel_chater_click = function(data) {
        for (var i = 0; i < data.length; i++) {
            $('div#chapter_bar div.chapter_box ul li').eq(i).click(function() {
                var b = $(this).index();
                window.localStorage.novel_content = JSON.stringify(data[b])
                window.location.href = 'read.html?b='+(b+1);
                window.localStorage.novel_title = JSON.stringify(data[b]);
                 window.localStorage.novel_alltitle = JSON.stringify(data);
            })
        }
    }

    //获取小说章节ajax
    var novel_chater_aj = function(a) {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/message/get_title.action',
            // post payload:
            dataType: 'json',
            data: {
                'bid': a.bid
            },
            // contentType: 'application/json;charset=uft-8',
            success: function(data) {
                //console.log(data);
                novel_chater(data);
                novel_chater_set(data);
                if(isMobile){
                	novel_chater_tap(data);
                }
                if(!isMobile){
                	novel_chater_click(data);
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

    //加入书架ajax
    var bookshelf_aj = function(a,user_id) {
        $.ajax({
            type: 'GET',
            url: 'http://47.112.20.73/web-novel/message/save.action',
            // post payload:
            dataType: 'json',
            data: {
                'bid':a.bid,
                'id':user_id
            },
            // contentType: 'application/json;charset=uft-8',
            success: function(data) {
                //console.log('书架交互成功');
                //console.log(data);
                // novel_chater(data);
                // novel_chater_set(data)
                // novel_chater_tap(data)
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
            }
        });
    }

    //加载书架ajax内容
      var bookshlef = function(a,user_id) {
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
                //console.log('交互成功');
                //var aj_img_json = $.parseJSON(data);
                //console.log(data);
                if (data != '') {
                    for(var i=0; i<data.length;i++){
                    if(a.bid==data[i].bid){
                        //console.log('书籍已存在')
                         $('div#book_nav ul.book_nav_box li').eq(2).text('已在书架');
                        // window.location.href='book.html';
                    }
                    if(a.bid!=data[i].bid&&i==data.length-1){
                         bookshelf_aj(a,user_id);
                         $('div#book_nav ul.book_nav_box li').eq(2).text('加入成功');
                    }
                }
                   
                } else {
                    console.log('数据为空')
                    bookshelf_aj(a,user_id);
                    $('div#book_nav ul.book_nav_box li').eq(2).text('加入成功');

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
    //bookshlef();
    
    //阅读量
       var count_aj = function(a) {
        $.ajax({
            type: 'POST',
            url: 'http://47.112.20.73/web-novel/message/count.action',
            // post payload:
            dataType: 'json',
            data: {
                'bid':a.bid
                 },
            // contentType: 'application/json;charset=uft-8',
            success: function(data) {
                //console.log('阅读量交互成功');
                //var aj_img_json = $.parseJSON(data);
                console.log(a.bid);
                //console.log(data);
            },
            error: function(xhr, type) {
                // console.log(2);
                // console.log(xhr);
                // console.log(1);
                // console.log(type);
            }
        });
    }
    novel_chater_aj(a);
    count_aj(a);
    //下载
    
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
        //目录、下载、加入书架导航-手机端点击
        nav_tap();
    }
    /*-------------------------电脑版版点击-------------------------------------*/
    if (!isMobile) {
        //返回键点击
        $('div.back_bar img').click(function() {
            back_tap(); //返回函数
            ifTap = false;
        });
        //目录、下载、加入书架导航-PC端点击
        nav_click();
    }
});