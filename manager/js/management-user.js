/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-01-08 16:19:22
 * @version $Id$
 */
//小说用户管理

//小说用户框加载
function user_load(data) {
    for (var i = 0; i < data.length; i++) {
        var newnode_li = document.createElement("li");
        var newnode_b = document.createElement("b");
        var newnode_span = document.createElement("span");
        var newnode_p = document.createElement("p");
        newnode_b.innerHTML = '用户' + (i + 1);
        newnode_span.innerHTML = data[i].name;
        newnode_p.innerHTML = "升级";
        newnode_p.setAttribute("name", "up");
        document.getElementById('user_num_load').appendChild(newnode_li);
        newnode_li.appendChild(newnode_b);
        newnode_li.appendChild(newnode_span);
        newnode_li.appendChild(newnode_p);
    }

}

//清除小说用户
function userClean() {
    var ul = document.getElementById('user_num_load');
    for (var i = ul.childNodes.length - 1; i >= 0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
}

//小说用户加载
function user_ajax() {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/userCommon.action');
    var data = '';
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                console.log(data);
                user_load(data)
                up_click(data);
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}

//升级为管理员按键
function up_click(data) {
    var up = document.getElementsByName("up");
    for (var i = 0; i < up.length; i++) {
        up[i].index = i;
        up[i].onclick = function() {
            //console.log(data[this.index]);
            userup_ajax(data[this.index].name, data[this.index].manger);
            userClean();
            user_ajax();
        }
    }
}

//升级为管理员ajax
function userup_ajax(name, manger) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/handle.action');
    var data =
        'name=' + name +
        '&manger=' + manger;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                //var data = JSON.parse(request.responseText);
                console.log(request.responseText);
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}