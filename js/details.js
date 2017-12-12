(()=>{
    $(()=>{
        /***加载指定编号的产品详情***/
        $.ajax({
            type: 'GET',
            url: 'data/list/details.php',
            data: 'lid='+location.search.split('=')[1],
            success: function (result) {
                console.log(result);
                var details = result.details, picList = result.picList, video = result.videoList;
                html = `
                <h4>首页 > 景点 > ${details.title}</h4>
                <div class="video">
                    <video id="v3" src="${video.vhref}" loop></video>
                    <a href="http://vacations.ctrip.com/Tpp/t113.html"><img class="ad" src="img/details/guangao.png" alt=""></a>
                    <a class="ctrl" href="#">
                        <img id="ctrImg" src="img/details/play.png" alt="">
                    </a>
                </div>
                <div class="recommend">
                    <p>
                        驴友拍摄
                        <span>大家都在看</span>
                    </p>
                    <div class="demo">
                        <div class="indemo">
                            <div class="demo1 lf">
                                <div><a href="#"><img src="${picList[0].imghref}" alt=""></a></div>
                                <div><a href="#"><img src="${picList[1].imghref}" alt=""></a></div>
                                <div><a href="#"><img src="${picList[2].imghref}" alt=""></a></div>
                                <div><a href="#"><img src="${picList[3].imghref}" alt=""></a></div>
                            </div>
                            <div class="demo2 lf"></div>
                        </div>
                    </div>
                    <div class="introduce">
                        <div class="title">当地游玩介绍</div>
                        <div class="details">
                            <div class="details-content">
                                <div id="imgs1" class="details-image">
                                    <img src="${picList[4].imghref}" alt="">
                                    <img src="${picList[5].imghref}" alt="">
                                </div>
                                <div id="text1" class="details-text">
                                    <span>${details.title}</span>
                                    ${details.detailstext1}
                                </div>
                            </div>
                            <div class="details-content">
                                <div id="text2" class="details-text">
                                    <span>${details.title}</span>
                                    ${details.detailstext2}
                                </div>
                                <div id="imgs2" class="details-image">
                                    <img src="${picList[6].imghref}" alt="">
                                    <img src="${picList[7].imghref}" alt="">
                                </div>
                            </div>
                            <div class="details-content">
                                <div id="imgs3" class="details-image">
                                    <img src="${picList[8].imghref}" alt="">
                                    <img src="${picList[9].imghref}" alt="">
                                </div>
                                <div id="text3" class="details-text">
                                    <span>${details.title}</span>
                                    ${details.detailstext3}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                $('.container').html(html);

                //视频播放按钮、广告设置
                var video=$(".video");
                var ctrl=$(".ctrl");
                video.mousemove(function(){
                    ctrl.css("display","block");
                });
                video.mouseout(function(){
                    ctrl.css("display","none");
                });
                var v3=$("#v3");
                var ctrImg=$("#ctrImg");
                ctrl.click(function(e){
                    e.preventDefault();
                    if(v3.get(0).paused == true){
                        console.log(1);
                        v3[0].play();
                        ctrImg.attr("src","img/details/pause.png");
                    }else{
                        v3[0].pause();
                        ctrImg.attr("src","img/details/play.png");
                    }
                });
                var ad=$(".ad");
                v3[0].onplay=function(){
                    ad.hide();
                }
                v3[0].onpause=function(){
                    ad.show();
                }

                //图片轮播悬停进入详情页效果
                var speed = 20;
                var tab = $(".demo");
                var tab1 = $(".demo1");
                var tab2 = $(".demo2");
                tab2.html(tab1.html());
                function Marquee() {
                    if (tab2[0].offsetWidth - tab[0].scrollLeft <= 0)
                        tab[0].scrollLeft -= tab1[0].offsetWidth
                    else {
                        tab[0].scrollLeft++;
                    }
                }
                var MyMar = setInterval(Marquee, speed);
                tab.mouseover(function () {
                    clearInterval(MyMar)
                });
                tab.mouseout(function () {
                    MyMar = setInterval(Marquee, speed)
                }); 

                //设置详情图片及文字特效
                $(window).on('scroll',()=>{
                    //获得滚动高度
                    var $scrollTop = $(document).scrollTop();
                    console.log($scrollTop);
                    if($scrollTop>=600&&$scrollTop<1200){
                        $('#imgs1').addClass('rotate');
                        $('#text1').addClass('text');
                    }else if($scrollTop>=1200&&$scrollTop<1500){
                        $('#imgs2').addClass('rotate');
                        $('#text2').addClass('text');
                    }else if($scrollTop>=1500){
                        $('#imgs3').addClass('rotate');
                        $('#text3').addClass('text');
                    }
                });
            },
            error:function () {
                alert("网络故障请检查!");
            }
        });
    })

})()
