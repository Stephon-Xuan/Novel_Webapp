/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-23 23:12:23
 * @version $Id$
 */
$(function() {
    var pw = JSON.parse(window.localStorage.user_pw);

    //返回键
    var back_tap = function() {
        history.go(-1)
    }
    //输入框点击-手机端点击
    var input_tap = function() {
        $('input#pwId_0').tap(function() {
            $('div#tip_bar').children('div.tip_box').hide();
        });
        $('input#pwId_1').tap(function() {
            $('div#tip_bar').children('div.tip_box').hide();
        });
        $('input#pwId').tap(function() {
            $('div#tip_bar').children('div.tip_box').hide();
        });
    }

    //输入框点击-PC端点击
    var input_click = function() {
        $('input#pwId_0').click(function() {
            $('div#tip_bar').children('div.tip_box').hide();
        });
        $('input#pwId_1').click(function() {
            $('div#tip_bar').children('div.tip_box').hide();
        });
        $('input#pwId').click(function() {
            $('div#tip_bar').children('div.tip_box').hide();
        });
    }

    //修改密码判断
    var revise_button = function() {
        if ($('input#pwId_0').val().split('').length != 8) {
            $('div#tip_bar').children('div.tip_box').show();
        }
        if ($('input#pwId_0').val().split('').length == 8) {
            // console.log(pw);
            // console.log($('input#pwId_0').val()+'呀');
            if ($('input#pwId_0').val() == pw) {
                $('div.account_num_box div.password_box_1').hide();
                $('div.account_num_box div.password_box_2').show();
                //新密码验证-手机端点击
                if (isMobile) {
                    $('div.account_num_box button#revise').tap(function() {
                        if ($('input#pwId_1').val().split('').length != 8) {
                            $('div#tip_bar').children('div.tip_box').show();
                        }
                        if ($('input#pwId_1').val().split('').length == 8 && $('input#pwId_1').val() == $('input#pwId').val()) {
                            console.log('密码修改成功');
                            var user_in = JSON.parse(window.localStorage.user_in);
                            window.localStorage.user_pw = JSON.stringify($('input#pwId_1').val());
                            var user_pw = JSON.parse(window.localStorage.user_pw);
                            sign(user_in, user_pw);
                        } else {
                            $('div#tip_bar').children('div.tip_box').show();
                        }
                    });
                }
                //新密码验证-PC端点击
                if (!isMobile) {
                    $('div.account_num_box button#revise').click(function() {
                        if ($('input#pwId_1').val().split('').length != 8) {
                            $('div#tip_bar').children('div.tip_box').show();
                        }
                        if ($('input#pwId_1').val().split('').length == 8 && $('input#pwId_1').val() == $('input#pwId').val()) {
                            console.log('密码修改成功');
                            var user_in = JSON.parse(window.localStorage.user_in);
                            window.localStorage.user_pw = JSON.stringify($('input#pwId_1').val());
                            var user_pw = JSON.parse(window.localStorage.user_pw);
                            sign(user_in, user_pw);
                        } else {
                            $('div#tip_bar').children('div.tip_box').show();
                        }
                    });
                }
            } else {
                $('div#tip_bar').children('div.tip_box').show();
            }
        } else {}
    }
    //保存ajax
    var sign = function(user_in, user_pw) {
        $.ajax({
            type: 'post',
            url: 'http://47.112.20.73/web-novel/user/saveMessage.action',
            data: {
                'id': user_in.id,
                'name': user_in.name,
                'path': user_in.path,
                'password': user_pw,
                'sex': user_in.sex
            },
            success: function(data) {
                //console.log('交互成功');
                //var aj_img_json = $.parseJSON(data);
                //console.log(data);
                window.localStorage.user_pw_tip = JSON.stringify("修改成功")
                window.location.href = "personal_information.html";
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
        $('div.account_num div.back_bar img').tap(function() {
            back_tap(); //返回函数
        });
        //输入框点击
        input_tap();
        //修改密码键点击
        $('div.account_num_box button#revise').tap(function() {
            revise_button(); //修改密码判断函数
        });

    }
    /*-------------------------电脑版版点击-------------------------------------*/
    if (!isMobile) {
        //返回键点击
        $('div.account_num div.back_bar img').click(function() {
            back_tap(); //返回函数
        });
        //输入框点击
        input_click();
        //修改密码键点击
        $('div.account_num_box button#revise').click(function() {
            revise_button(); //修改密码判断函数
            console.log("按到我了");
        });

    }
});