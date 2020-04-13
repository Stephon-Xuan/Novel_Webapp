/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-01-08 16:04:16
 * @version $Id$
 */
//隐藏右侧
var manger  = JSON.parse(window.localStorage.manger);
// var manger = 1;//默认给超级会员
function left_hide() {
    var manage_control = document.getElementsByName('manage_control');
    for (var i = 0; i < manage_control.length; i++) {
        manage_control[i].style.display = "none";
    }

}
left_hide();

/*左导航*/
function left_nav() {
    var dt = document.getElementsByName('manage_dt');
    var dd = document.getElementsByName('manage_dd');
    var manage_control = document.getElementsByName('manage_control');
    for (var j = 0; j < dd.length; j++) {
        dd[j].className = 'hide';
    }
    //导航栏点击
    for (var i = 0; i < dt.length; i++) {
        dt[i].onclick = function() {
            for (var b = 0; b < dt.length; b++) {
                manage_control[b].style.display="none";
                dt[b].className = '';
                dt[b].index = b
                for (var j = 0; j < dd.length; j++) {
                    dd[j].className = 'hide';
                }
            }
            this.className = 'dt_active';
            //账号管理栏
            if (this.index == 0) {
                //判断是不是管理员和超级管理员
                if(manger==1){
                    console.log('不是超级管理员')
                }
                if(manger==2){
                for (var k = 0; k < 2; k++) {
                    dd[k].className = '';
                    dd[k].index = k;
                    dd[k].onclick = function() {
                        for (var g = 0; g < 2; g++) {
                            dd[g].className = '';
                        }
                        this.className = 'dd_active';
                        if (this.index == 0) {
                            mangerClean();
                            manger_ajax();
                        }
                        if (this.index == 1) {
                            userClean();
                            user_ajax();
                        }
                        left_hide();
                        manage_control[this.index].style.display = "";
                    }
                }
            }

            }
            //用户信息管理栏栏
            if (this.index == 1) {
                left_hide();
                manage_control[2].style.display = "";
                userDeal_ajax();
            }
            //小说分类设置栏
            if (this.index == 2) {
                left_hide();
                manage_control[3].style.display = "";
                type_ajax();
            }
            //小说书籍管理栏
            // if (this.index == 3) {
            //     for (var l = 2; l < 7; l++) {
            //         dd[l].className = '';
            //         dd[l].index = l;
            //         dd[l].onclick = function() {
            //             for (var g = 2; g < 7; g++) {
            //                 dd[g].className = '';
            //             }
            //             this.className = 'dd_active';
            //             if (this.index == 2) {
            //                 left_hide();
            //                 manage_control[4].style.display = "";
            //                 BookType_ajax();
            //             }
            //             if(this.index >=3){
            //                 console.log("我不是分类了");
            //                 left_hide();
            //             }
                        

            //         }
            //     }
            // }
            //上面注释掉的是因为不需要加排行、新书、轮播图、热门、推荐等
             if (this.index == 3) {
                    dd[2].className = '';
                    dd[2].index = 2;
                    dd[2].onclick = function() {
                        dd[2].className = '';
                        this.className = 'dd_active';
                        if (this.index == 2) {
                            left_hide();
                            manage_control[4].style.display = "";
                            BookType_ajax();
                        }
                    }
                }
            
        }
    }

}
left_nav();
