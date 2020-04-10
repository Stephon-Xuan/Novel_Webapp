/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-01-08 16:20:33
 * @version $Id$
 */
//设置小说分类

//类型框加载
function type_load(data) {
    for (var i = 0; i < data.length; i++) {
        var newnode_li = document.createElement("li");
        var newnode_b = document.createElement("b");
        var newnode_span = document.createElement("span");
        var newnode_p = document.createElement("p");
        newnode_b.innerHTML = i + 1;
        newnode_span.innerHTML = data[i].type;
        newnode_p.innerHTML = "删除";
        newnode_p.setAttribute("name", "type");
        document.getElementById('type_load').appendChild(newnode_li);
        newnode_li.appendChild(newnode_b);
        newnode_li.appendChild(newnode_span);
        newnode_li.appendChild(newnode_p);
    }
}

//小说类型清除
function type_clean() {
    var ul = document.getElementById('type_load');
    for (var i = ul.childNodes.length - 1; i >= 0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
}

//小说类型点击
function type_tap(data) {
    var tap = document.getElementsByName('type');
    for (var i = 0; i < tap.length; i++) {
        tap[i].index = i;
        tap[i].onclick = function() {
            typeDelete_ajax(data[this.index].t_id);
            type_clean();
            type_ajax();
        }
    }
    var add_type = document.getElementById('add_type');
    var control = document.getElementById('addType_box');
    var submit = document.getElementById('addType_submit');
    var cancel = document.getElementById('cancelSubmit');
    var text = document.getElementById('addType_text');
    add_type.onclick = function() {
        control.className = "";
    }
    cancel.onclick = function() {
        control.className = "hide";
    }
    submit.onclick = function() {
        if (text.value.split('').length == 4) {
            control.className = "hide";
            typeAdd_ajax(text.value);
        }
    }
}

//获取小说类型ajax
function type_ajax() {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/h_type.action');
    var data = '';
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                console.log(data);
                type_clean();
                type_load(data);
                type_tap(data);
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}

//类型删除ajax
function typeDelete_ajax(t_id) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/delete_type.action');
    var data = 't_id=' + t_id;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                //var data = JSON.parse(request.responseText);
                if (data.success) {
                    console.log(xhr);
                } else {
                    console.log(request.responseText);
                }
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}

//类型添加ajax
function typeAdd_ajax(type) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/add_type.action');
    var data = 'type=' + type;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                //var data = JSON.parse(request.responseText);
                //console.log(request.responseText);
                type_ajax();
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
