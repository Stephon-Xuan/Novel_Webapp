/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-01-08 16:22:48
 * @version $Id$
 */
//分类——书籍

//ajax得到书籍类型
function BookType_ajax() {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/h_type.action');
    var data = '';
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                console.log('书籍类型记载ajax');
                Booktype_clean();
                BookType_load(data);
                BookType_tap(data);
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
//书籍类型记载
function BookType_load(data) {
    for (var i = 0; i < data.length; i++) {
        var newnode_li = document.createElement("li");
        newnode_li.innerHTML = data[i].type;
        newnode_li.setAttribute("name", "bookType");
        document.getElementById('chapter_ul').appendChild(newnode_li);
    }
}
//删除所有书籍类型
function Booktype_clean() {
    var ul = document.getElementById('chapter_ul');
    for (var i = ul.childNodes.length - 1; i >= 0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
}
//书籍类型点击
function BookType_tap(data) {
    var BookType = document.getElementsByName('bookType');
    for (var i = 0; i < BookType.length; i++) {
        BookType[i].index = i;
        BookType[i].onclick = function() {
            //console.log(data);
            for (var j = 0; j < BookType.length; j++) {
                BookType[j].removeAttribute('style', 'background-color:#1D7AD9;color:#fff;');
            }
            this.setAttribute('style', 'background-color:#1D7AD9;color:#fff;');
            typeBook_ajax(data[this.index].type);
        }
    }
}
//ajax得到所点击的类型的书
function typeBook_ajax(type) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/type_book.action');
    var data = 'type=' + type;
    window.localStorage.book_type = JSON.stringify(type);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                console.log(data);
                book_clean();
                book_load(data);
                book_tap(data);
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
//清空已选的类型的全部书籍
function book_clean() {
    var ul = document.getElementById('book_list');
    for (var i = ul.childNodes.length - 1; i >= 0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
}
//加载已选类型的书籍
function book_load(data) {
    for (var i = 0; i < data.length; i++) {
        var newnode_li = document.createElement("li");
        var newnode_h5 = document.createElement("h5");
        var newnode_b = document.createElement("b");
        var newnode_span = document.createElement("span");
        var newnode_p = document.createElement("p");
        var newnode_h3 = document.createElement("h3");
        var newnode_h4 = document.createElement("h4");
        document.getElementById('book_list').setAttribute("style", "width:650px;margin-left:-60px;");
        newnode_li.setAttribute("style", "width:600px");
        newnode_h5.setAttribute("style", "width:120px");
        newnode_b.setAttribute("style", "width:120px;overflow:hidden;");
        newnode_span.setAttribute("style", "width:120px");
        newnode_p.setAttribute("style", "width:120px");
        newnode_h3.setAttribute("style", "width:120px;display:inline-block;");
        // newnode_h4.setAttribute("style", "width:100px");
        newnode_span.setAttribute("name", "book_revise");
        newnode_p.setAttribute("name", "book_delete");
        newnode_h3.setAttribute("name", "addChapter");
        // newnode_h4.setAttribute("name", "addList");
        newnode_h5.innerHTML = i + 1;
        newnode_b.innerHTML = data[i].name;
        newnode_span.innerHTML = '修改';
        newnode_p.innerHTML = "删除";
        newnode_h3.innerHTML = "添加章节";
        // newnode_h4.innerHTML = "添加到";
        document.getElementById('book_list').appendChild(newnode_li);
        newnode_li.appendChild(newnode_h5);
        newnode_li.appendChild(newnode_b);
        newnode_li.appendChild(newnode_span);
        newnode_li.appendChild(newnode_p);
        newnode_li.appendChild(newnode_h3);
        // newnode_li.appendChild(newnode_h4);
    }
}
//添加章节-小说章节加载
function chapter_load(data) {
    var ul = document.getElementById('chapter_Nav');
    for (var i = ul.childNodes.length - 1; i >= 0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
    for (var i = 0; i < data.length; i++) {
        // var ul = document.getElementById('div#chpter_box div.chapter_right ul#chapter_Nav');
        var chapter_li = document.createElement("li");
        var span_0 = document.createElement("span");
        var span_1 = document.createElement("span");
        var span_2 = document.createElement("span");
        var span_3 = document.createElement("span");
        span_0.innerHTML = "第" + (i + 1) + "章";
        span_1.innerHTML = data[i].title;
        span_2.innerHTML = "修改";
        span_3.innerHTML = "删除";
        document.getElementById('chapter_Nav').appendChild(chapter_li);
        chapter_li.appendChild(span_0);
        chapter_li.appendChild(span_1);
        chapter_li.appendChild(span_2);
        chapter_li.appendChild(span_3);
        //console.log('ok');
    }
}
//对该类型进行添加书籍或对选中的书籍进行删除、修改的导航按键
function book_tap(data) {
    //删除
    var del = document.getElementsByName('book_delete');
    var book_hide = document.getElementById('book_hide');
    for (var i = 0; i < del.length; i++) {
        del[i].index = i;
        del[i].onclick = function() {
            typeDeleteBook_ajax(data[this.index].bid);
            var type = JSON.parse(window.localStorage.book_type);
            typeBook_ajax(type);
        }
    }
    //修改
    var rev = document.getElementsByName('book_revise');
    var tip_bar = document.getElementById('tip_bar');
    var reviseBook_box = document.getElementById('reviseBook_box');
    var chapter_detail_box = document.getElementById('chapter_detail_box');
    var cancel = document.getElementById('cancel');
    for (var i = 0; i < rev.length; i++) {
        rev[i].index = i;
        rev[i].onclick = function() {
            window.localStorage.book_bid = JSON.stringify(data[this.index].bid);
            window.localStorage.book_name = JSON.stringify(data[this.index].name);
            //console.log('按到修改了')
            // book_hide.style.display="none";
            tip_bar.className = "";//提示框出现
        }
        var tip_detail = document.getElementById('tip_detail');
        var tip_chapter = document.getElementById('tip_chapter');
        tip_detail.onclick = function() {
            tip_chapter.removeAttribute('style', 'background-color:#1D7AD9;color:#fff');
            this.setAttribute('style', 'background-color:#1D7AD9;color:#fff');
            tip_bar.className = "hide";
            reviseBook_box.className = "revise";
            var book_type = JSON.parse(window.localStorage.book_type);
            revise_ajax();
            document.getElementById('revise_type').innerHTML = book_type;
            var reviseBook_back = document.getElementById('reviseBook_back');
            var revise_save = document.getElementById('revise_save');
            reviseBook_back.onclick = function() {
                //console.log('返回');
                reviseBook_box.className = "revise hide";
            }
            revise_save.onclick = function() {
                console.log('保存');
                // var path = document.getElementById('revise_path');
                var name = document.getElementById('revise_name').value;
                var author = document.getElementById('revise_author').value;
                var type = document.getElementById('revise_type').innerHTML;
                var style = document.getElementById('revise_style').value;
                var message = document.getElementById('revise_message').value;
                // revise_save.className = "revise hide";
                // console.log('封面：'path+'书名：'+name+'作者'+author+'类型'+type+'状态'+style+'简介'+message);
                // console.log(path);
                // console.log(name)
                // console.log(author)
                // console.log(type )
                // console.log(style)
                // console.log(message)
                reviseSet_ajax(name, author, type, style, message);
                revise_ajax();
            }

        }
        tip_chapter.onclick = function() {
            document.getElementById('bookname').innerHTML=JSON.parse(window.localStorage.book_name);
            tip_detail.removeAttribute('style', 'background-color:#1D7AD9;color:#fff');
            this.setAttribute('style', 'background-color:#1D7AD9;color:#fff');
            tip_bar.className = "hide";
            chapter_detail_box.className = "manage_control";
            var chapter_detail_back = document.getElementById('chapter_detail_back');
            chapter_detail_back.onclick = function() {
                chapter_detail_box.className = "manage_control hide";
            }
            intoBook_ajax(); //加载章节
            // chapter_detail.className = "manage_control";
        }
        cancel.onclick = function() {
            tip_bar.className = "hide";
        }
    }
    //添加书籍
    var add = document.getElementById('book_add');
    var addBook_box = document.getElementById('addBook_box');
    add.onclick = function() {
        console.log('书籍添加');
        // book_hide.style.display="none";
        addBook_box.className = "revise";
        addBook_submit();
    }
    var addBook_back = document.getElementById('addBook_back');
    addBook_back.onclick = function() {
        console.log("返回");
        // var type = JSON.parse(window.localStorage.book_type);
        // typeBook_ajax(type);
        addBook_box.className = "revise hide";
        // typeBook_ajax(type);
        // book_hide.style.display="";
    }
    //添加章节
    var addChapter = document.getElementsByName('addChapter');
    var chpter_box = document.getElementById('chpter_box');
    for (var i = 0; i < addChapter.length; i++) {
        addChapter[i].index = i;
        addChapter[i].onclick = function() {
            //本地存储书本的bid
            // console.log(data[this.index].bid);
            window.localStorage.book_bid = JSON.stringify(data[this.index].bid);
            // var type = JSON.parse(window.localStorage.book_type);
            // typeBook_ajax(type);
            // console.log('添加章节');
            chpter_box.className = "";
            intoBook_ajax(); //显示已有章节
            //addBook_submit();
            // chapter_click();
        }
        var chapter_back = document.getElementById('chapter_back');
        chapter_back.onclick = function() {
            console.log("返回");
            // var type = JSON.parse(window.localStorage.book_type);
            // typeBook_ajax(type);
            chpter_box.className = "hide";
        }
    }
    var addList = document.getElementsByName('addList');
    for (var i = 0; i < addList.length; i++) {
        addList[i].index = i;
        addList[i].onclick = function() {
            // var type = JSON.parse(window.localStorage.book_type);
            // typeBook_ajax(type);
            console.log('添加到');
        }
    }
}
//加载章节
function book_detail_chapter(data) {
    var ul = document.getElementById('book_detail_chapter');
    for (var i = ul.childNodes.length - 1; i >= 0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
    for (var i = 0; i < data.length; i++) {
        var book_detail_chapter = document.getElementById('book_detail_chapter');
        var li = document.createElement("li");
        var b = document.createElement("b");
        var h5 = document.createElement("h5");
        var span = document.createElement("span");
        var p = document.createElement("p");
        li.setAttribute("style", "width:350px; padding:1px;");
        h5.setAttribute("style", "width:80px");
        b.setAttribute("style", "width:80px;overflow:hidden;");
        span.setAttribute("style", "width:80px;");
        p.setAttribute("style", "width:80px;");
        span.setAttribute('name', 'chapter_content');
        p.setAttribute('name', 'chapter_comment');
        b.innerHTML = (i + 1);
        h5.innerHTML = data[i].title;
        span.innerHTML = "内容";
        p.innerHTML = "评论";
        book_detail_chapter.appendChild(li);
        li.appendChild(b);
        li.appendChild(h5);
        li.appendChild(span);
        li.appendChild(p);
        if (i == data.length - 1) {
            chapter_click(data);
        }
    }
}
//加载章节点击
function chapter_click(data) {
    var chapter_content = document.getElementsByName('chapter_content');
    // var chapter_detail_box = document.getElementById('chapter_detail_box');
    var chapter_detail_box_content = document.getElementById('chapter_detail_box_content');
    var content_back = document.getElementById('content_back');
    var content_save = document.getElementById('content_save');
    var chapter_detail_box_comment = document.getElementById('chapter_detail_box_comment');
    var comment_back = document.getElementById('comment_back');
    //console.log(chapter_content);
    //console.log(chapter_content.length);
    for (var i = 0; i < data.length; i++) {
        chapter_content[i].index = i;
        chapter_content[i].onclick = function() {
            // console.log(data[this.index].title);
            var title = data[this.index].title;
            intoBookTitleContent_ajax(title);
            console.log('内容');
            chapter_detail_box_content.className = "manage_control";
            document.getElementById('bookname_ct').innerHTML=JSON.parse(window.localStorage.book_name);
            document.getElementById('chapterNum_ct').innerHTML= "第"+(this.index+1)+"章";
            content_back.onclick = function() {
                chapter_detail_box_content.className = "manage_control hide";
            }
            content_save.onclick = function() {
                // chapter_detail_box_content.className = "manage_control hide";
                console.log('保存')
                saveBookTitleContent_ajax(title);
            }
        }
    }
    var chapter_comment = document.getElementsByName('chapter_comment');
    for (var i = 0; i < data.length; i++) {
        chapter_comment[i].index = i;
        chapter_comment[i].onclick = function() {
            // console.log(data[this.index].title);
            var title = data[this.index].title;
            window.localStorage.book_commentTitle = JSON.stringify(title);
            console.log('评论');
            chapter_detail_box_comment.className = "manage_control";
            document.getElementById('bookname_cm').innerHTML=JSON.parse(window.localStorage.book_name);
            document.getElementById('chapterNum_cm').innerHTML= "第"+(this.index+1)+"章";
            returnConment_ajax(title);
            comment_back.onclick = function() {
                chapter_detail_box_comment.className = "manage_control hide";
            }
        }
    }
}
//加载章节-内容
function intoBookTitleContent_ajax(title) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/get_content.action');
    var data = 'title=' + title;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                console.log(data);
                var content = document.getElementById("content");
                content.innerHTML = data[0].content;
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
//加载章节-内容保存
function saveBookTitleContent_ajax(title) {
    var content = document.getElementById("content");
    console.log(content.value);
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/save_content.action');
    var data = 'title=' + title +
        '&content=' + content.value;
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
                    if (request.responseText == "save success") {
                        console.log('保存成功');
                    }
                }
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
//加载章节-评论
function returnConment_ajax(title) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/returnCon.action');
    var data = 'title=' + title;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                console.log(data);
                comment_set(data);
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
//加载章节-评论-填充评论
function comment_set(data) {
    var ul = document.getElementById("comment_load");
    for (var i = ul.childNodes.length - 1; i >= 0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        var p = document.createElement("p");
        var b = document.createElement("b");
        b.setAttribute('name', 'comment_deal');
        span.innerHTML =data[i].username;
        p.innerHTML = data[i].comment;
        if (data[i].zhuangtai == 0) {
            b.innerHTML = "屏蔽";
        }
        if (data[i].zhuangtai == 1) {
            b.innerHTML = "显示";
        }
        ul.appendChild(li);
        li.appendChild(span);
        li.appendChild(p);
        li.appendChild(b);
        if (i == data.length - 1) {
            comment(data);
        }
    }
}
//加载章节-评论-屏蔽或显示
function comment(data) {
	var comment_deal = document.getElementsByName("comment_deal");
	console.log('显示屏蔽');
	console.log(comment_deal);
	console.log(comment_deal.length);
      for (var i = 0; i < comment_deal.length; i++) {
      	comment_deal[i].index = i;
        comment_deal[i].onclick = function(){
        	// console.log(data[this.index].zhuangtai+"|"+data[this.index].date);
        	returnConmentChange_ajax(data[this.index].username,data[this.index].zhuangtai,data[this.index].date);
        }
    }
}
//加载章节-评论-屏蔽或显示ajax
function returnConmentChange_ajax(username,zhuangtai,date) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/mix.action');
    var data =
        'name='+username+
        '&zhuangtai='+zhuangtai +
        '&date='+date;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                //var data = JSON.parse(request.responseText);
                console.log(request.responseText);
                if(request.responseText=="success"){
                	var title = JSON.parse(window.localStorage.book_commentTitle);
                	returnConment_ajax(title);
                }
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
//ajax删除书籍
function typeDeleteBook_ajax(bid) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/delete_book.action');
    var data = 'bid=' + bid;
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
/*添加书籍*/
function addBook_submit() {
    var book_type = JSON.parse(window.localStorage.book_type);
    document.getElementById('type').innerHTML = book_type;
    var addBook_submit = document.getElementById('addBook_submit');
    addBook_submit.onclick = function() {
        var path = document.getElementById('path');
        var name = document.getElementById('name').value;
        var author = document.getElementById('author').value;
        var type = document.getElementById('type').innerHTML;
        var style = document.getElementById('style').value;
        var message = document.getElementById('message').value;
        // console.log(path);
        // console.log(name)
        // console.log(author)
        // console.log(type )
        // console.log(style)
        // console.log(message)
        addBook_ajax(name, author, type, style, message);
        var addBook_box = document.getElementById('addBook_box');
        addBook_box.className = "revise hide";
        // var chpter_box = document.getElementById('chpter_box');
        // // chpter_box.className="";
        // // chapter_deal();
    }
}
//ajax添加书籍
function addBook_ajax(name, author, type, style, message) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/user/upload.action');
    var data =
        'path=http://47.112.20.73/web-novel/image/泡沫之夏.jpg' +
        '&name=' + name +
        '&author=' + author +
        '&type=' + type +
        '&style=' + style +
        '&message=' + message
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                //var data = JSON.parse(request.responseText);
                //console.log(request.responseText);
                if (request.responseText == 'save success') {
                    console.log('添加书籍保存成功');
                    var type = JSON.parse(window.localStorage.book_type);
                    typeBook_ajax(type);
                } else {
                    console.log('添加书籍保存失败')
                }
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
//添加章节或修改章节
function chapter_deal() {
    var chapter_back = document.getElementById('chapter_back');
    chapter_back.onclick = function() {
        var addBook_box = document.getElementById('addBook_box');
        addBook_box.className = "revise";
        var chpter_box = document.getElementById('chpter_box');
        chpter_box.className = "hide";
        // console.log('按到我了')
    }
    var bookChapter_save = document.getElementById('bookChapter_save');
    bookChapter_save.onclick = function() {
        console.log('章节保存');
        // var chapter_num = document.getElementById('chapter_num').value;
        var chapter_name = document.getElementById('chapter_name').value;
        var chapter_content = document.getElementById('chapter_content').value;
        // console.log(chapter_num);
        // console.log(chapter_name);
        // console.log(chapter_content);
        addTitle_ajax(chapter_name, chapter_content);
        intoBook_ajax();
    }

}
chapter_deal();
//添加章节
function addTitle_ajax(chapter_name, chapter_content) {
    var book_bid = JSON.parse(window.localStorage.book_bid);
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/search/addTitle.action');
    var data =
        'bid=' + book_bid +
        '&title=' + chapter_name +
        '&content=' + chapter_content;
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
//ajax进入某一本的章节
function intoBook_ajax() {
    var book_bid = JSON.parse(window.localStorage.book_bid);
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/message/get_title.action');
    var data = 'bid=' + book_bid;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                //console.log(data);
                chapter_load(data); //添加章节的章节显示
                book_detail_chapter(data);
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
//修改书籍信息返回
function revise_ajax() {
    var name = JSON.parse(window.localStorage.book_name);
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/user/returnMessage.action');
    var data =
        'name=' + name;
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                console.log(data);
                //console.log(data[0].name);
                document.getElementById('revise_name').value = data[0].name;
                document.getElementById('revise_author').value = data[0].author;
                document.getElementById('revise_type').innerHTML = data[0].type;
                document.getElementById('revise_style').value = data[0].style;
                document.getElementById('revise_message').value = data[0].message;
            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}
// 修改书籍-保存
function reviseSet_ajax(name, author, type, style, message) {
    var bid = JSON.parse(window.localStorage.book_bid);
    var request = new XMLHttpRequest();
    request.open("POST", 'http://47.112.20.73/web-novel/search/saveMessage.action');
    var data =
        'bid=' + bid +
        '&name=' + name +
        '&author=' + author +
        '&type=' + type +
        '&style=' + style +
        '&message=' + message
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                //var data = JSON.parse(request.responseText);
                console.log(request.responseText);
                if (request.responseText = "save success") {
                    console.log('修改书籍介绍成功');
                    typeBook_ajax(type);
                }

            } else {
                console.log("发生错误：" + request.status);
            }
        }
    }
}