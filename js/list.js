(()=>{
    $(()=>{
        function loadProductByPage(placeloc,jdtype,level,season,pno){
            //获取关键字
            if(location.search) var kw=location.search.split("=")[1]||"";
            //加载列表数据
            $.ajax({
                type: "GET",
                url: 'data/list/list.php',
                data:{kw:kw,placeloc:placeloc,jdtype:jdtype,level:level,season:season,pno:pno},
                success: function (result) {
                    console.log(result);
                    var html = "";
                    $.each(result.data,function (i,p) {
                        // console.log(p);
                        html += `
                            <div class="list-show">
                                <div class="list-img">
                                    <a href="${p.href}">
                                        <img src="${p.imghref}" alt="${p.title}">
                                    </a>
                                </div>
                                <div class="list-details">
                                    <h4><a href="${p.href}">${p.title}</a></h4>
                                    <ul class="list-base">
                                        <li>
                                            景区所在地:
                                            <a href="">${p.placeloc}</a>
                                        </li>
                                        <li>
                                            景 区 类 型:
                                            <a href="">${p.jdtype}</a>
                                        </li>
                                        <li>
                                            景 区 级 别:
                                            <a href="">${p.level}</a>
                                        </li>
                                        <li>
                                            适 合 季 节:
                                            <a href="">${p.season}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        `
                    })
                    $('.place-content').html(html);
                    //加载页码
                    result.pno = parseInt(result.pno);
                    var html = "";
                    //上一页
                    html += `<a class="${result.pno<=1?'disabled':''}" href="#" data-page="${result.kw}_${result.placeloc}_${result.jdtype}_${result.level}_${result.season}_${result.pno-1}">上一页</a>`;
                    //上上页
                    if(result.pno-2>0){
                        html += `<a href="#" data-page="${result.kw}_${result.placeloc}_${result.jdtype}_${result.level}_${result.season}_${result.pno-2}">${result.pno-2}</a>`
                    }
                    //上一页
                    if(result.pno-1>0){
                        html += `<a href="#" data-page="${result.kw}_${result.placeloc}_${result.jdtype}_${result.level}_${result.season}_${result.pno-1}">${result.pno-1}</a>`
                    }
                    //当前页
                    html += `<a class="active" href="#" data-page="${result.kw}_${result.placeloc}_${result.jdtype}_${result.level}_${result.season}_${result.pno}">${result.pno}</a>`;
                    //下一页
                    if(result.pno+1<=result.pageCount){
                        html += `<a href="#" data-page="${result.kw}_${result.placeloc}_${result.jdtype}_${result.level}_${result.season}_${result.pno+1}">${result.pno+1}</a>`
                    }
                    //下下页
                    if(result.pno+2<=result.pageCount){
                        html += `<a href="#" data-page="${result.kw}_${result.placeloc}_${result.jdtype}_${result.level}_${result.season}_${result.pno+2}">${result.pno+2}</a>`
                    }
                    //下一页
                    html += `<a class="${result.pno>=result.pageCount?'disabled':''}" href="#" data-page="${result.kw}_${result.placeloc}_${result.jdtype}_${result.level}_${result.season}_${result.pno+1}">下一页</a>`;
                    //渲染在id为pages的div里面
                    $("#pages").html(html);
                },
                error: function () {
                    alert("网络故障请检查!");
                }
            });
        }
        loadProductByPage('','','','',1);

        //关键词筛选
        $('.button.pulse-grow').click(function(e){
            e.preventDefault();
            $(this).toggleClass('selected');
            $(e.target).parent().siblings().children().removeClass("selected");

            //分别获取点击后的placeloc,jdtype,level,season
            var placeloc = "",jdtype = "",level = "",season = "";
            $('.button.pulse-grow').each(function (index,element) {
                // console.log(element);
                if($(this).attr('class') === 'button pulse-grow selected'){
                    console.log($(this).html());
                    if($(this).html().match(/国内|国外/)){
                        placeloc = $(this).html();
                        // console.log(placeloc);
                    }
                    if($(this).html().match(/海滨海岛|特殊地貌|城市风景|生物景观|壁画石窟|民俗风情|历史圣地|纪念地|山岳|岩洞|江河|湖泊|陵寝|温泉|其他/)){
                        jdtype = $(this).html();
                        //console.log(jdtype);
                    }
                    if($(this).html().match(/5A|4A|3A|2A|1A|无/)){
                        level = $(this).html();
                        //console.log(level);
                    }
                    if($(this).html().match(/春季|夏季|秋季|冬季/)){
                        season = $(this).html();
                        //console.log(season);
                    }
                }
            });
            loadProductByPage(placeloc,jdtype,level,season,1);
        });

        //处理分页单击事件
        $("#pages").on("click","a",e=>{
            e.preventDefault();
            // console.log(e.target);
            var data = $(e.target).data("page");
            //split拆分 返回数组
            // console.log(data);
            var arr = data.split("_");
            loadProductByPage(arr[1],arr[2],arr[3],arr[4],arr[5]);
        });
    })
})()
