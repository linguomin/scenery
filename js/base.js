(()=>{
    $(()=>{
        //加载页面头部与底部
        $("#header").load('header.html',function () {
            $.ajax({
                type: 'GET',
                url: 'data/user/session_data.php',
                success:function (result) {
                    // console.log(result);
                    if(result.uname){
                        $(".login-register").html(`
                            <li>
                                欢迎:${result.uname}
                                <a href="logout.html" title="退出登录">退出</a>
                                <b>|</b>&nbsp;
                            </li>
                            <li>
                                <a href="uc_basic.html" title="用户中心">用户中心</a>
                            </li>`
                        );
                        $('[href="logout.html"]').click(function(e){
                            e.preventDefault();
                            $.ajax({
                                url: 'data/user/logout.php',
                                success: function(result){
                                    if(result.code===200){
                                        alertMsg('<h4>退出成功</h4>点击确定重新返回登录页面');
                                        $('#alertMsg').on('click', '#alertMsg_btn1 cite', function (e) {
                                            e.preventDefault();
                                            location.href = 'login.html';
                                        });
                                    }else {
                                        alertMsg('登录退出失败！原因：'+result.msg);
                                    }
                                }
                            });
                        });
                    }
                    //给nav绑定单击事件
                    $('.menu a span').click(function(e){
                        $(this).toggleClass('navhover');
                        $(e.target).parent().siblings().children().removeClass("navhover");
                    });

                    /**头部搜索按钮**/
                    $('body').on('click', '#search', function(){
                        var kw = $('#txtSeach').val();
                        var loc = 'list.html';
                        if(kw){
                            loc += '?kw='+kw;
                        }
                        location.href = loc;
                    });
                    //按回车搜索
                    $(document).keyup(function (e) {
                        if(e.keyCode == 13){
                            var kw = $('#txtSeach').val();
                            var loc = 'list.html';
                            if(kw){
                                loc += '?kw='+kw;
                            }
                            location.href = loc;
                        }
                    });
                    //搜索帮助
                    $("#txtSeach").autocomplete({
                        source:"data/autocomplete.php",
                        select:function(e,obj){
                            //obj.item获得当前li对应的集合中的对象
                            $(this).val(obj.item.title);
                            setTimeout(function(){
                                location="details.html?lid="
                                    +obj.item.lid;
                            },3000);
                            return false;//必须
                        }
                    }).autocomplete("instance")
                        //每加载一个提示项，就自动执行一次
                        ._renderItem=function($ul,p){
                        //$ul自动获得提示列表的ul的jquery对象
                        //p数据源集合中当前正在加载的对象
                        var $li=$(`<li><div>${p.title}</div></li>`);
                        $ul.append($li);
                        return $li;
                    };

                    //菜单导航栏
                    var toggle = document.querySelectorAll(".toggle")[0];
                    var nav = document.querySelectorAll("nav")[0];
                    toggle_open_text = 'Menu';
                    toggle_close_text = 'Close';
                    toggle.addEventListener('click', function() {
                        nav.classList.toggle('open');

                        if (nav.classList.contains('open')) {
                            toggle.innerHTML = toggle_close_text;
                        } else {
                            toggle.innerHTML = toggle_open_text;
                        }
                    }, false);
                }
            });
        });
        $("#footer").load('footer.html');

        //为当前时间添加滚动时间监听
        $(window).on("scroll",()=>{
            //获得滚动高度
            var $scrollTop = $(document).scrollTop();
            if($scrollTop>=300){
                $("#header-top").addClass("fixed-nav");
            }else{
                $("#header-top").removeClass("fixed-nav");
            }
        });
    })
})();

//创建悬浮窗口
//mode为空，即只有一个确认按钮，mode为1时有确认和取消两个按钮
function alertMsg(msg, mode) {
    msg = msg || '';
    mode = mode || 0;
    var top = document.body.scrollTop || document.documentElement.scrollTop;
    var isIe = (document.all) ? true : false;
    var isIE6 = isIe && !window.XMLHttpRequest;
    var sTop = document.documentElement.scrollTop || document.body.scrollTop;
    var sLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var winSize = function(){
        var xScroll, yScroll, windowWidth, windowHeight, pageWidth, pageHeight;
        // innerHeight获取的是可视窗口的高度，IE不支持此属性
        if (window.innerHeight && window.scrollMaxY) {
            xScroll = document.body.scrollWidth;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }

        if (self.innerHeight) {    // all except Explorer
            windowWidth = self.innerWidth;
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }

        // for small pages with total width less then width of the viewport
        if (xScroll < windowWidth) {
            pageWidth = windowWidth;
        } else {
            pageWidth = xScroll;
        }

        return{
            'pageWidth':pageWidth,
            'pageHeight':pageHeight,
            'windowWidth':windowWidth,
            'windowHeight':windowHeight
        }
    }();
    //遮罩层
    var styleStr = 'top:0;left:0;position:absolute;z-index:10000;background:rgba(0,0,0,.6);width:' + winSize.pageWidth + 'px;height:' +  (winSize.pageHeight + 30) + 'px;';
    var shadowDiv = document.createElement('div'); //添加阴影DIV
    shadowDiv.style.cssText = styleStr; //添加样式
    shadowDiv.id = "shadowDiv";
    //如果是IE6则创建IFRAME遮罩SELECT
    if (isIE6) {
        var maskIframe = document.createElement('iframe');
        maskIframe.style.cssText = 'width:' + winSize.pageWidth + 'px;height:' + (winSize.pageHeight + 30) + 'px;position:absolute;visibility:inherit;z-index:-1;filter:alpha(opacity=0);';
        maskIframe.frameborder = 0;
        maskIframe.src = "about:blank";
        shadowDiv.appendChild(maskIframe);
    }
    document.body.insertBefore(shadowDiv, document.body.firstChild); //遮罩层加入文档


    //弹出框
    var styleStr1 = 'display:block;position:fixed;_position:absolute;left:' + (winSize.windowWidth / 2 - 200) + 'px;top:' + (winSize.windowHeight / 2 - 150) + 'px;_top:' + (winSize.windowHeight / 2 + top - 150)+ 'px;'; //弹出框的位置
    var alertBox = document.createElement('div');
    alertBox.id = 'alertMsg';
    alertBox.style.cssText = styleStr1;
    //创建弹出框里面的内容P标签
    var alertMsg_info = document.createElement('P');
    alertMsg_info.id = 'alertMsg_info';
    alertMsg_info.innerHTML = msg;
    alertBox.appendChild(alertMsg_info);
    //创建按钮
    var btn1 = document.createElement('a');
    btn1.id = 'alertMsg_btn1';
    btn1.href = 'javascript:void(0)';
    btn1.innerHTML = '<cite>确定</cite>';
    btn1.onclick = function () {
        document.body.removeChild(alertBox);
        document.body.removeChild(shadowDiv);
        return true;
    };

    alertBox.appendChild(btn1);
    if (mode === 1) {
        var btn2 = document.createElement('a');
        btn2.id = 'alertMsg_btn2';
        btn2.href = 'javascript:void(0)';
        btn2.innerHTML = '<cite>取消</cite>';
        btn2.onclick = function () {
            document.body.removeChild(alertBox);
            document.body.removeChild(shadowDiv);
            return false;
        };
        alertBox.appendChild(btn2);
    }
    document.body.appendChild(alertBox);
}