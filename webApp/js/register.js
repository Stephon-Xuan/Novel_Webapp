/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-09 17:35:09
 * @version $Id$
 */
$(function() {
    var rg_button = $('div.account_num_box a button')
    var user_input = $('div.account_num div.account_num_box div#user_box input')
    var pw_input = $('div.account_num div.account_num_box div#password_box input')
    var flag = 0;
    var isMobile = isMobile(); // true为手机端，false为PC端
    function isMobile(){
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
    //返回键函数
    var back_tap = function() {
        history.go(-1);
    }
    //用户填写判断
    var user_register = function() {
        user_input.tap(function() {
            if (flag == 1) {
                $('div.account_num div#tip_bar div.tip_box').hide();
                flag = 0;
            }
        });
        pw_input.tap(function() {
            if ($(user_input).val().split('').length != 11) {
                $(user_input).attr('placeholder', '请输入11位数字的账号');
            }
            if (flag == 1) {
                $('div.account_num div#tip_bar div.tip_box').hide();
                flag = 0;
            }
        });
        pw_input.eq(1).tap(function() {
            if ($(pw_input).eq(0).val().split('').lenght != 8) {
                $(pw_input).eq(0).attr('placeholder', '请输入8位数字的密码');
            }
            if (flag == 1) {
                $('div.account_num div#tip_bar div.tip_box').hide();
                flag = 0;
            }

        });
    }
    //注册键判断
    var bt_tap = function() {
        if ($(user_input).val().split('').length != 11) {
            $('div.account_num div#tip_bar div.tip_box').show();
            flag = 1;
        } else if ($(user_input).val().split('').length == 11 && $(pw_input).eq(0).val().split('').length != 8) {
            $('div.account_num div#tip_bar div.tip_box span').text('密码错误');
            $('div.account_num div#tip_bar div.tip_box').show();
            flag = 1;
        } else if ($(user_input).val().split('').length == 11 && $(pw_input).eq(0).val().split('').length == 8 && $(pw_input).eq(1).val() != $(pw_input).eq(0).val()) {
            $('div.account_num div#tip_bar div.tip_box span').text('密码错误');
            $('div.account_num div#tip_bar div.tip_box').show();
            flag = 1;
        } else if ($(user_input).val().split('').length == 11 && $(pw_input).eq(1).val() == $(pw_input).eq(0).val() && $(pw_input).eq(0).val().split('').length == 8) {
            $.ajax({
                type: 'POST',
                url: 'http://47.112.20.73/web-novel/user/regist.action',
                // post payload:
                dataType: 'json',
                data: {
                    'name': $(user_input).val(),
                    'password': $(pw_input).eq(0).val()
                },

                success: function(responseText) {
                    console.log(responseText);
                },
                error: function(xhr, type) {
                    console.log(2);
                    console.log(xhr);
                    console.log(1);
                    console.log(xhr.responseText);
                    if (xhr.responseText == 'regist success') {
                        window.location.href = 'login.html';
                    } else if (xhr.responseText == 'name already exit') {
                        $('div.account_num div#tip_bar div.tip_box span').text('账号已存在');
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
            $('div.account_num div#tip_bar div.tip_box span').text('操作错误');
            $('div.account_num div#tip_bar div.tip_box').show();
            flag = 1;
        }
    }
    user_register();
    /*-------------------------手机版点击-------------------------------------*/
    //返回键点击
    if (isMobile) {
        $('div.account_num div.back_bar img').tap(function() {
            back_tap(); //返回函数
            ifTap = true;
        });
        //注册键点击
        $('div.account_num_box button').tap(function() {
            bt_tap(); //注册建判断函数
            ifTap = true;
            console.log("我是tap");
        });
    }
    /*-------------------------电脑版版点击-------------------------------------*/
    if(!isMobile){
    //返回键点击
    $('div.account_num div.back_bar img').click(function() {
        back_tap(); //返回函数
        ifTap = false;
    });
    //注册键点击
    $('div.account_num_box button').click(function() {
        bt_tap(); //注册建判断函数
        ifTap = false;
        console.log("我是click");
    });
    }

});