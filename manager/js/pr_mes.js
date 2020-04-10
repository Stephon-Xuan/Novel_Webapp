/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-01-03 21:56:16
 * @version $Id$
 */
/*头像\个人信息*/
var manger_id  = JSON.parse(window.localStorage.manger_id);
var manger  = JSON.parse(window.localStorage.manger);

//个人信息显示或消失
function user_pr() {
    var flag = 0;
    var user_img = document.getElementById('user_img');
    user_img.onclick = function() {
        var user_mes = document.getElementById('user_mes');
        if (flag == 0) {
            user_mes.className = "";
            flag = 1;
        } else if (flag == 1) {
            user_mes.className = "hide";
            flag = 0;
        } else {
            // console.log('不行');
        }
    }
}
user_pr();

//个人信息ajax和填充
function pr_ajax(manger_id) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/user/returnPerMessage.action');
    var data = 'user_id='+manger_id;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var jsonobj = eval("(" + request.responseText + ")")
                //console.log(jsonobj);
                var pr = document.getElementsByName('pr');
                document.getElementById('user_img').src = jsonobj.path;
                pr[1].childNodes[1].innerHTML = jsonobj.name;
                if(jsonobj.manger==1){
                	pr[2].childNodes[1].innerHTML = '管理员';
                    pr[0].innerHTML = '管理员';
                }
                if(jsonobj.manger==2){
                	pr[2].childNodes[1].innerHTML = '超级管理员';
                     pr[0].innerHTML = '超级管理员';
                }
                pr[3].childNodes[1].innerHTML = jsonobj.sex;
                pr[4].onclick = function(){
                	window.location.href="login.html";
                }
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
pr_ajax(manger_id);
