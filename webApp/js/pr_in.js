/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-13 21:11:05
 * @version $Id$
 */
$(function() {
    var user_in = JSON.parse(window.localStorage.user_in);
    var user_id = JSON.parse(window.localStorage.user_id);
    var user_pw = JSON.parse(window.localStorage.user_pw);
    var img_tap = $('div#person_ifm_bar ul li img');
    var sex_tap = $('div#person_ifm_bar ul li').eq(3);
    var img_post = $('div.img_post');
    var sex_post = $('div.sex_bar');
    var img_hide = $('div.img_post form input').eq(1);
    var sex_hide = $('div.sex_bar ul li');
    var flag = 0;
    //console.log(user_in);

   //个人信息填充
    var pr_set = function(user_in) {
        $('div#person_ifm_bar ul li').eq(0).children('img').attr('src', user_in.path);
        $('div#person_ifm_bar ul li').eq(1).children('h5').text(user_in.name);
        $('div#person_ifm_bar ul li').eq(3).children('b').text(user_in.sex);
    }
    pr_set(user_in);

    //返回键
    var back_tap = function() {
            window.location.href = "user.html";
    }

    //修改密码
    var revise = function() {
            window.location.href = "revise_pw.html";
    }

    //头像图片、性别的提示框-手机端点击
    var pr_tap = function(a, b, c) {
        a.tap(function() {
            if (flag == 0) {
                b.show();
                flag = 1;
            } else if (flag == 1) {
                b.hide();
                flag = 0;
            }
        });
        c.tap(function() {
            b.hide();
            flag = 0;
        });
    }

    //头像图片、性别的提示框-PC端点击
    var pr_click = function(a, b, c) {
        a.click(function() {
            if (flag == 0) {
                b.show();
                flag = 1;
            } else if (flag == 1) {
                b.hide();
                flag = 0;
            }
        });
        c.click(function() {
            b.hide();
            flag = 0;
        });
    }

    //性别选择-手机端点击
    var sex_select_tap = function() {
        for (var i = 0; i < 2; i++) {
            sex_hide.eq(i).tap(function() {
                sex_hide.children('span').removeClass('active');
                $(this).children('span').addClass('active');
                $('div#person_ifm_bar ul li').eq(3).children('b').text($(this).children('b').text());
            });
        }
    }
    //性别选择-PC端点击
    var sex_select_click = function() {
        for (var i = 0; i < 2; i++) {
            sex_hide.eq(i).click(function() {
                sex_hide.children('span').removeClass('active');
                $(this).children('span').addClass('active');
                $('div#person_ifm_bar ul li').eq(3).children('b').text($(this).children('b').text());
            });
        }
    }
    /* console.log(user_id);
     console.log(user_in.name);
     console.log(user_pw);*/
    //个人信息提交-保存ajax
    var sign = function(user_in) {
                $.ajax({
                type: 'post',
                url: 'http://47.112.20.73/web-novel/user/saveMessage.action',
                data: {
                    'id': user_in.id,
                    'name': user_in.name,
                    'path': $('div#person_ifm_bar ul li').eq(0).children('img').attr('src'),
                    'password': user_pw,
                    'sex': $('div#person_ifm_bar ul li').eq(3).children('b').text()
                },
                success: function(data) {
                    //console.log('交互成功');
                    //var aj_img_json = $.parseJSON(data);
                    //console.log(data);
                    pr_show(user_in);
                    tip_show();
                    // setTimeout(tip(), 2000); 
                },
                error: function(xhr, type) {
                    console.log(2);
                    console.log(xhr);
                    console.log(1);
                    console.log(type);
                }
            });
    }
    //提示保存成功
    var timeTag = null;
    var tip_show = function() {
        $('div.tip_bar').show();
        timeTag = setTimeout(tip_hide, 1000);
    }
    var tip_hide = function() {
        $('div.tip_bar').hide();
    }

    //获取个人信息ajax
    var pr_show = function(user_in) {
        $.ajax({
            type: 'post',
            url: 'http://47.112.20.73/web-novel/user/returnPerMessage.action',
            data: {
                'user_id': user_in.id
            },
            success: function(data) {
                //console.log('交互成功');
                //console.log(data);
                //console.log(data.path)
                if (data.path != null) {
                    $('div#person_ifm_bar ul li').eq(0).children('img').attr('src', data.path);
                }
                $('div#person_ifm_bar ul li').eq(3).children('b').text(data.sex);
            },
            error: function(xhr, type) {
                console.log(2);
                console.log(xhr);
                console.log(1);
                console.log(type);
            }
        });
    }
    
    //上传头像图片ajax  
    var img_load = function() {
        $.ajax({
            url: 'http://47.112.20.73/web-novel/user/perImage.action',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                //console.log(data)
                for (var i = 0; i < data.length; i++) {
                    var a = data[i].image //.split('novel/')
                    $('div.img_post ul li').eq(i).children('img').attr('src', a)
                }
                if(isMobile){//手机端点击
                	img_select_tap(data);
                }
                if(!isMobile){//PC端点击
                	img_select_click(data);
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
    //选择图片-手机端点击
    var img_select_tap = function(data) {
        for (var i = 0; i < data.length; i++) {
            $('div.img_post ul li').eq(i).tap(function() {
                $('div#person_ifm_bar ul li').eq(0).children('img').attr('src', data[$(this).index()].image);
            });
        }
    }
     //选择图片-PC端点击
    var img_select_click = function(data) {
        for (var i = 0; i < data.length; i++) {
            $('div.img_post ul li').eq(i).click(function() {
                $('div#person_ifm_bar ul li').eq(0).children('img').attr('src', data[$(this).index()].image);
            });
        }
    }
    //修改密码返回提示
    if(window.localStorage.user_pw_tip){
    	tip_show();
    	window.localStorage.removeItem('user_pw_tip');
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

    //头像图片加载并识别手机点击还是PC端点击
    img_load();

     /*-------------------------手机版点击-------------------------------------*/
    //返回键点击
    if (isMobile) {
        $('div.back_bar img').tap(function() {
            back_tap(); //返回函数
        });
        $('div#person_ifm_bar ul li').eq(2).tap(function() {
        	revise();//修改密码
        });
        //性别选择
        sex_select_tap();
        //头像图片、性别提示框
        pr_tap(img_tap, img_post, img_hide);
    	pr_tap(sex_tap, sex_post, sex_hide);
    	//保存
    	$('div.back_bar b').tap(function() {
    		sign(user_in);
    	});
     }
    /*-------------------------电脑版版点击-------------------------------------*/
    if (!isMobile) {
        //返回键点击
        $('div.back_bar img').click(function() {
            back_tap(); //返回函数
        });
        $('div#person_ifm_bar ul li').eq(2).click(function() {
        	revise();//修改密码
        });
        $('div.sex_bar').css({'height':'46%','width':'55%','padding':'5px 0'});//性别框的样式
        //性别选择
        sex_select_click();
        //头像图片、性别提示框
        pr_click(img_tap, img_post, img_hide);
    	pr_click(sex_tap, sex_post, sex_hide);
        //系统头像图片大小样式
        $('div.img_post ul li img').css("height","190px");
    	//保存
    	$('div.back_bar b').click(function(){
    		sign(user_in);
    	});
    }
});