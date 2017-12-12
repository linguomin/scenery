(() => {
    $(() => {
        //分页加载数据
        function loadProductByPage(pno) {
            $.ajax({
                type: 'GET',
                url: 'data/user/message.php',
                data: {pno: pno},
                success: function (result) {
                    // console.log(result);
                    var html = "";
                    $.each(result.data, function (index, element) {
                        // console.log(element);
                        html += `
                            <div class="content_1">
                                <img class="name" src="${element.avater}" alt="photo">
                                <div class="mainInfo">
                                    <div class="userId">
                                        <a href="#">${element.user_name}</a>
                                    </div>
                                    <div class="conInfo">${element.content}</div>
                                    <div class="time">${element.timer}</div>
                                </div>
                            </div>
                        `;
                    });
                    $(".msgFrame").html(html);
                    $(".numofmessage").text("留言(" + result.recordCount + ")");

                    //加载页码
                    result.pno = parseInt(result.pno);
                    var html = "";
                    //上一页
                    html += `<a class="${result.pno <= 1 ? 'disabled' : ''}" href="${result.pno > 1 ? result.pno - 1 : '#'}">上一页</a>`;
                    //上上页
                    if (result.pno - 2 > 0) {
                        html += `<a href="${result.pno - 2}">${result.pno - 2}</a>`
                    }
                    //上一页
                    if (result.pno - 1 > 0) {
                        html += `<a href="${result.pno - 1}">${result.pno - 1}</a>`
                    }
                    //当前页
                    html += `<a class="active" href="${result.pno}">${result.pno}</a>`;
                    //下一页
                    if (result.pno + 1 <= result.pageCount) {
                        html += `<a href="${result.pno + 1}">${result.pno + 1}</a>`
                    }
                    //下下页
                    if (result.pno + 2 <= result.pageCount) {
                        html += `<a href="${result.pno + 2}">${result.pno + 2}</a>`
                    }
                    //下一页
                    html += `<a class="${result.pno >= result.pageCount ? 'disabled' : ''}" href="${result.pno < result.pageCount ? result.pno + 1 : '#'}">下一页</a>`;
                    //渲染在id为pages的div里面
                    $("#pages").html(html);
                },
                error: function () {
                    alert("网络故障请检查!");
                }
            });
        }
        loadProductByPage(1);

        //获取当前时间
        function getCurrentTime() {
            var today = new Date();
            var y = today.getFullYear();
            var mh = today.getMonth();
            mh++;
            var d = today.getDate();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m)
            s = checkTime(s)
            var time = y + "-" + mh + "-" + d + "  " + h + ":" + m + ":" + s;
            return time;
        }

        function checkTime(i) {
            if (i < 10)
                i = "0" + i
            return i
        }

        $(".subbtn").click(function () {
            var text = $(".content").text();
            var time = getCurrentTime();
            if (text == "") {
                alertMsg('<b>您还没有输入任何内容！</b>');
            }
            else {
                $.ajax({
                    type: 'GET',
                    url: 'data/user/message_insert.php',
                    data: {time: time, content: text},
                    success: function (result) {
                        loadProductByPage(1);
                        $(".content").text("");
                    },
                    error: function () {
                        alert("网络故障请检查!");
                    }
                });
            }
        });

        //分页条单击事件处理
        $('#pages').on('click', 'a', function (e) {
            e.preventDefault();
            loadProductByPage($(this).attr('href'));
        });
    });
})()