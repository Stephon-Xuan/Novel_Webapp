/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-01-08 16:16:16
 * @version $Id$
 */
//管理员用户管理

//管理员框加载
function manger_load(data) {
    for (var i = 0; i < data.length; i++) {
        var newnode_li = document.createElement("li");
        var newnode_b = document.createElement("b");
        var newnode_span = document.createElement("span");
        var newnode_p = document.createElement("p");
        newnode_b.innerHTML = "管理员" + (i + 1);
        newnode_span.innerHTML = data[i].name;
        newnode_p.innerHTML = "撤销";
        newnode_p.setAttribute("name", "down");
        document.getElementById('manage_num_load').appendChild(newnode_li);
        newnode_li.appendChild(newnode_b);
        newnode_li.appendChild(newnode_span);
        newnode_li.appendChild(newnode_p);
    }
}

//管理员框清除
function mangerClean() {
    var ul = document.getElementById('manage_num_load');
    for (var i = ul.childNodes.length - 1; i >= 0; i--) {
        ul.removeChild(ul.childNodes[i]);
        //console.log(ul.childNodes[i]);
    }
}

//取消管理员身份
function down_click(data) {
    var down = document.getElementsByName("down");
    for (var i = 0; i < down.length; i++) {
        down[i].index = i;
        down[i].onclick = function() {
            //console.log(data[this.index]);
            console.log(data[this.index].name, data[this.index].manger);
            userup_ajax(data[this.index].name, data[this.index].manger);
            mangerClean();
            manger_ajax();
        }
    }
}

//取消管理员身份ajax
function manger_ajax() {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/userManger.action');
    var data = '';
    request.setRequestHeader("Content-type", "application/x-www-form-url");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                console.log(data);
                manger_load(data);
                down_click(data);
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
