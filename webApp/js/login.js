/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-13 10:45:53
 * @version $Id$
 */
$(function() {
    var user_input = $('div.account_num div.account_num_box div#user_box input');
    var pw_input = $('div.account_num div.account_num_box div#password_box input');
    var bn = $('div.account_num div.account_num_box button');
    var flag = 0;
    //返回键
    var back_tap = function() {
        history.go(-1)
    }
    //输入框
    var input_tap = function() {
        user_input.tap(function() {
            if (flag == 1) {
                $('div.account_num div#tip_bar div.tip_box').hide();
                flag = 0;
            }
        })
        pw_input.tap(function() {
            if (flag == 1) {
                $('div.account_num div#tip_bar div.tip_box').hide();
                flag = 0;
            }
        })
    }
    input_tap();
    //登录键
    var bt_tap_aj = function() {
        if (user_input.val().split('').length != 11) {
            $('div.account_num div#tip_bar div.tip_box span').text('账号错误');
            $('div.account_num div#tip_bar div.tip_box').show();
            flag = 1;
        } else if (user_input.val().split('').length == 11 && pw_input.val().split('').length != 8) {
            $('div.account_num div#tip_bar div.tip_box span').text('密码错误');
            $('div.account_num div#tip_bar div.tip_box').show();

            flag = 1;
        } else if (user_input.val().split('').length == 11 && pw_input.val().split('').length == 8) {
            $.ajax({
                type: 'GET',
                url: 'http://47.112.20.73/web-novel/user/login.action',
                // post payload:
                dataType: 'json',
                data: {
                    'name': user_input.val(),
                    'password': pw_input.val()
                },
                // contentType: 'application/json;charset=uft-8',
                success: function(data) {
                    console.log(data)
                    window.localStorage.user_id = JSON.stringify(data);
                    window.localStorage.user_pw = JSON.stringify(pw_input.val());
                    window.localStorage.login_flag = JSON.stringify(1);
                    window.location.href = "index.html";
                },
                error: function(xhr, type) {
                    console.log(2);
                    console.log(xhr);
                    console.log(1);
                    console.log(type);
                    if (xhr.responseText == 'name no exit') {
                        $('div.account_num div#tip_bar div.tip_box span').text('账号不存在');
                        $('div.account_num div#tip_bar div.tip_box').show();
                        flag = 1;
                    } else if (xhr.responseText == 'password error') {
                        $('div.account_num div#tip_bar div.tip_box span').text('密码错误');
                        $('div.account_num div#tip_bar div.tip_box').show();
                        flag = 1;
                    } else {
                        $('div.account_num div#tip_bar div.tip_box span').text('账号错误');
                        $('div.account_num div#tip_bar div.tip_box').show();
                        flag = 1;
                    }
                }
            });
        } else {
            $('div.account_num div#tip_bar div.tip_box span').text('账号错误');
            $('div.account_num div#tip_bar div.tip_box').show();
            flag = 1;
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
        $('div.account_num div.back_bar img').tap(function() {
            back_tap(); //返回函数
        });
        //登录键点击
        $('div.account_num div.account_num_box button').tap(function() {
            bt_tap_aj(); //登录键判断函数
            //console.log("我是tap");
        });
    }
    /*-------------------------电脑版版点击-------------------------------------*/
    if (!isMobile) {
        //返回键点击
        $('div.account_num div.back_bar img').click(function() {
            back_tap(); //返回函数
        });
        //注册键点击
        $('div.account_num div.account_num_box button').click(function() {
            bt_tap_aj(); //登录键判断函数
            //console.log("我是click");
        });
    }
});