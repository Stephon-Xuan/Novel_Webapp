/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-01-08 16:19:48
 * @version $Id$
 */
//用户信息管理(禁言)

//用户框加载
function userDeal_load(data) {
    for (var i = 0; i < data.length; i++) {
        var newnode_li = document.createElement("li");
        var newnode_h5 = document.createElement("h5");
        var newnode_b = document.createElement("b");
        var newnode_span = document.createElement("span");
        var newnode_p = document.createElement("p");
        newnode_h5.setAttribute("style", "width:120px");
        newnode_b.setAttribute("style", "width:120px");
        newnode_span.setAttribute("style", "width:120px");
        newnode_p.setAttribute("style", "width:120px");
        newnode_p.setAttribute("name", "deal");
        newnode_h5.innerHTML = '用户' + (i + 1);
        newnode_b.innerHTML = data[i].name;
        newnode_span.innerHTML = data[i].forbiddenNumber;
        if (data[i].forbidden == 0) {
            newnode_p.innerHTML = "禁言";
        }
        if (data[i].forbidden == 1) {
            newnode_p.innerHTML = "取消禁言";
        }
        newnode_p.setAttribute("name", "deal");
        document.getElementById('user_deal_load').appendChild(newnode_li);
        newnode_li.appendChild(newnode_h5);
        newnode_li.appendChild(newnode_b);
        newnode_li.appendChild(newnode_span);
        newnode_li.appendChild(newnode_p);
    }
}

//获取用户ajax
function userDeal_ajax() {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/returnForbidden.action');
    var data = '';
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                //console.log(request.responseText);
                userDealClean();
                userDeal_load(data);
                userDeal_tap(data);

            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}

//清除用户
function userDealClean() {
    var ul = document.getElementById('user_deal_load');
    for (var i = ul.childNodes.length - 1; i >= 0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
}

//禁言或取消禁言键点击
function userDeal_tap(data) {
    var tap = document.getElementsByName('deal');
    for (var i = 0; i < tap.length; i++) {
        tap[i].index = i;
        tap[i].onclick = function() {
            userDealBan_ajax(data[this.index].name, data[this.index].forbidden);
            userDealClean();
            userDeal_ajax();
        }
    }
}

//禁言或取消禁言ajax
function userDealBan_ajax(name, ban) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/forbidden.action');
    var data = 'name=' + name +
        '&ban=' + ban;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                //var data = JSON.parse(request.responseText);
                if (data.success) {
                    console.log(xhr);
                } else {
                    //console.log(data);
                    console.log(request.responseText);
                }
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
