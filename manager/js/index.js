/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-01-02 18:22:45
 * @version $Id$
 */

//没有用的接口
function changeBookTitle_ajax() {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/save_title.action');
    var data = 'id=13' +
        '&title=陨落';
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



