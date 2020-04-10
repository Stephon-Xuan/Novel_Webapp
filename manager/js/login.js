/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-23 23:53:06
 * @version $Id$
 */
window.localStorage.manger = JSON.stringify(1);
var tip = document.getElementById('tip');
//超级管理员和普通管理员的选择
function select(obj) {
    var select_li = document.getElementsByName('select');
    //console.log(select_li.length);
    for (var i = 0; i < select_li.length; i++) {
        select_li[i].className = '';
        //console.log('我执行了');
    }
    obj.className = 'active';
    console.log(obj.innerHTML);
    var manger = obj.innerHTML;
    if(manger=="超级管理员"){
    // console.log('2')
    window.localStorage.manger = JSON.stringify(2);
     }
     if(manger=="管理员"){
    // console.log('1')
    window.localStorage.manger = JSON.stringify(1);
     }
}

//登录键判断
function button(obj) {
    var user = document.getElementById('user');
    var pw = document.getElementById('pw');
    if (user.value.split('').length != 11) {
        tip.className = "";
        tip.innerHTML = "账号错误";
    } else if (user.value.split('').length == 11 && pw.value.split('').length != 8) {
        tip.className = "";
        tip.innerHTML = "密码错误";
    } else if (user.value.split('').length == 11 && pw.value.split('').length == 8) {
        // window.location.href = "index.html";
        var name = user.value;
        var password = pw.value;
        ajax(name,password);
    } else {
        tip.className = "";
        tip.innerHTML = "输入错误";
    }
}

//提示隐藏
function hide(obj) {
    var tip = document.getElementById('tip');
    tip.className = "hide";

}

//提交登录信息并且判断
function ajax(name,password) {
	var manger = JSON.parse(window.localStorage.manger);
	// console.log('拿到'+manger)
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/user/h_login.action');
    var data =
        'name='+name +
        '&password='+password+
        '&manger='+manger;

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                //var data = JSON.parse(request.responseText);
                if (data.success) {
                    console.log(xhr);
                } else {
                    //console.log(request.responseText);
                    var num = /^[0-9]+.?[0-9]*$/;
                    if(request.responseText=='password error'){
                    	//console.log('密码错误');
                    	 tip.className = "";
          	 			tip.innerHTML = "密码错误";
                    }
                    if(request.responseText=='name no exit'){
                    	//console.log('账号不存在');
                    	tip.className = "";
          	 			tip.innerHTML = "账号不存在";
                    }
                    if(request.responseText=='identity error'){
                    	console.log('身份错误');
                    	tip.className = "";
          	 			tip.innerHTML = "身份错误";
                    }
                    if(num.test(request.responseText)){
                    	//console.log(request.responseText);
                    	window.localStorage.manger_id = JSON.stringify(request.responseText);
                    	window.location.href="index.html";
                    	//console.log('登录成功');
                    }
               //      else{
               //      	console.log('其他错误2');
               //      	tip.className = "";
          	 			// tip.innerHTML = "输入错误";
               //      }
                }
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}