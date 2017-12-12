(()=>{
    if(typeof jQuery!=="function"){
        throw new Error("index.js依赖于jQuery，必须先引入jQuery");
    }else{
        $(()=> {
            /*异步加载页面内容*/
            $.ajax({
                type: "GET",
                url: "data/index/index.php",
                success: function(data){
                    //1.加载轮播广告项

                    console.log(data);
                    //保存图片li的HTML片段
                    var htmlImgs = "";
                    //定义li宽度
                    const LIWIDTH = 1920;
                    for(var i = 0; i < data.carouselItems.length; i++){
                        var p = data.carouselItems[i];
                        htmlImgs += `
                    <li>
                        <img src="${p.img}" alt="">
                    </li>
                `;
                    }
                    var $bannerImg = $("#banner-img");
                    $bannerImg.css("width", LIWIDTH * data.carouselItems.length);
                    $bannerImg.html(htmlImgs);
                    var indicatorHtml = "<li></li>".repeat(data.carouselItems.length-1);
                    $("#indicators").html(indicatorHtml);
                    $("#indicators>li:first").addClass("hover");
                    // 图片及其小长条移动
                    var i = 0, wait = 4000, timer = null;
                    function move() {
                        timer = setTimeout(() => {
                            if (i < data.carouselItems.length-1) {
                                i++;
                                $bannerImg.css({
                                    left: -LIWIDTH * i,
                                    transition: "all .3s linear",
                                });
                                if (i < data.carouselItems.length-1)
                                    $("#indicators>li:eq(" + i + ")")
                                        .addClass("hover")
                                        .siblings().removeClass("hover");
                                else
                                    $("#indicators>li:eq(" + 0 + ")")
                                        .addClass("hover")
                                        .siblings().removeClass("hover");
                                move();
                            } else {
                                $bannerImg.css({
                                    transition: "",
                                    left: 0
                                });
                                setTimeout(() => {
                                    i = 1;
                                    $bannerImg.css({
                                        left: -LIWIDTH * i,
                                        transition: "all .3s linear",
                                    });
                                    $("#indicators>li:eq(" + i + ")")
                                        .addClass("hover")
                                        .siblings().removeClass("hover");
                                }, 50);
                                $("#indicators>li:eq(" + i + ")")
                                    .addClass("hover")
                                    .siblings().removeClass("hover");
                                move();
                            }
                        }, wait);
                    }

                    move();
                    $(".banner").hover(
                        () => clearTimeout(timer),
                        () => move()
                    );
                    $("#indicators").on("mouseover", "li", function () {
                        var $this = $(this);
                        if (!$this.hasClass("hover")) {
                            i = $this.index();
                            $bannerImg.css("left", -LIWIDTH * i);
                            $("#indicators>li:eq(" + i + ")")
                                .addClass("hover")
                                .siblings().removeClass("hover");
                        }
                    });

                    //2.加载热门搜索
                    var html = `
                <div>
                      <div class="floor-img">
                          <img src="img/index/floor1-1.png" alt="">
                          <div class="text-desc">
                              <h3>${data.hotItems[0].title}</h3>
                              <p>${data.hotItems[0].details}</p>
                              <a href="${data.hotItems[0].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor1-2.png" alt="">
                          <div class="text-desc">
                              <h3>${data.hotItems[1].title}</h3>
                              <p>${data.hotItems[1].details}</p>
                              <a href="${data.hotItems[1].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor1-4.png" alt="">
                          <div class="text-desc">
                              <h3>${data.hotItems[2].title}</h3>
                              <p>${data.hotItems[2].details}</p>
                              <a href="${data.hotItems[2].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor1-5.png" alt="">
                          <div class="text-desc">
                              <h3>${data.hotItems[3].title}</h3>
                              <p>${data.hotItems[3].details}</p>
                              <a href="${data.hotItems[3].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                  </div>
                  <div class="floor-img">
                      <img src="img/index/floor1-3.png" alt="">
                      <div class="text-desc">
                          <h3>${data.hotItems[4].title}</h3>
                          <p>${data.hotItems[4].details}</p>
                          <a href="${data.hotItems[4].href}" class="btn">Learn more</a>
                      </div>
                  </div>
            `;
                    $(".floor1-content").html(html);

                    //3.海外美景加载
                    var html = `
                <div>
                      <div class="floor-img">
                          <img src="img/index/floor2-1.png" alt="">
                          <div class="text-desc">
                              <h3>${data.haiwaiItems[0].title}</h3>
                              <p>${data.haiwaiItems[0].details}</p>
                              <a href="${data.haiwaiItems[0].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor2-2.png" alt="">
                          <div class="text-desc">
                              <h3>${data.haiwaiItems[1].title}</h3>
                              <p>${data.haiwaiItems[1].details}</p>
                              <a href="${data.haiwaiItems[1].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                  </div>
                  <div class="floor-img">
                      <img src="img/index/floor2-3.png" alt="">
                      <div class="text-desc">
                          <h3>${data.haiwaiItems[2].title}</h3>
                          <p>${data.haiwaiItems[2].details}</p>
                          <a href="${data.haiwaiItems[2].href}" class="btn">Learn more</a>
                      </div>
                  </div>
                  <div>
                      <div class="floor-img">
                          <img src="img/index/floor2-4.png" alt="">
                          <div class="text-desc">
                              <h3>${data.haiwaiItems[3].title}</h3>
                              <p>${data.haiwaiItems[3].details}</p>
                              <a href="${data.haiwaiItems[3].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor2-5.png" alt="">
                          <div class="text-desc">
                              <h3>${data.haiwaiItems[4].title}</h3>
                              <p>${data.haiwaiItems[4].details}</p>
                              <a href="${data.haiwaiItems[4].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                  </div>
            `;
                    $(".floor2-content").html(html);

                    //4.大陆美景加载
                    var html = `
                <div class="floor-img">
                      <img src="img/index/floor3-1.png" alt="">
                      <div class="text-desc">
                          <h3>${data.daluItems[0].title}</h3>
                          <p>${data.daluItems[0].details}</p>
                          <a href="${data.daluItems[0].href}" class="btn">Learn more</a>
                      </div>
                  </div>
                  <div>
                      <div class="floor-img">
                          <img src="img/index/floor3-2.png" alt="">
                          <div class="text-desc">
                              <h3>${data.daluItems[1].title}</h3>
                              <p>${data.daluItems[1].details}</p>
                              <a href="${data.daluItems[1].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor3-3.png" alt="">
                          <div class="text-desc">
                              <h3>${data.daluItems[2].title}</h3>
                              <p>${data.daluItems[2].details}</p>
                              <a href="${data.daluItems[2].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor3-4.png" alt="">
                          <div class="text-desc">
                              <h3>${data.daluItems[3].title}</h3>
                              <p>${data.daluItems[3].details}</p>
                              <a href="${data.daluItems[3].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor3-5.png" alt="">
                          <div class="text-desc">
                              <h3>${data.daluItems[4].title}</h3>
                              <p>${data.daluItems[4].details}</p>
                              <a href="${data.daluItems[4].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                  </div>
            `;
                    $(".floor3-content").html(html);

                    //4.港澳台美景加载
                    var html = `
                <div>
                      <div class="floor-img">
                          <img src="img/index/floor4-1.png" alt="">
                          <div class="text-desc">
                              <h3>${data.gatItems[0].title}</h3>
                              <p>${data.gatItems[0].details}</p>
                              <a href="${data.gatItems[0].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor4-2.png" alt="">
                          <div class="text-desc">
                              <h3>${data.gatItems[1].title}</h3>
                              <p>${data.gatItems[1].details}</p>
                              <a href="${data.gatItems[1].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor4-3.png" alt="">
                          <div class="text-desc">
                              <h3>${data.gatItems[2].title}</h3>
                              <p>${data.gatItems[2].details}</p>
                              <a href="${data.gatItems[2].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                  </div>
                  <div>
                      <div class="floor-img">
                          <img src="img/index/floor4-4.png" alt="">
                          <div class="text-desc">
                              <h3>${data.gatItems[3].title}</h3>
                              <p>${data.gatItems[3].details}</p>
                              <a href="${data.gatItems[3].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                      <div class="floor-img">
                          <img src="img/index/floor4-5.png" alt="">
                          <div class="text-desc">
                              <h3>${data.gatItems[4].title}</h3>
                              <p>${data.gatItems[4].details}</p>
                              <a href="${data.gatItems[4].href}" class="btn">Learn more</a>
                          </div>
                      </div>
                  </div>
            `;
                    $(".floor4-content").html(html);
                },
                error:function() {
                    alert('网络故障！请检查');
                }
            });

            //楼梯效果
            //获取高度函数
            function getTotalTop(elem){
                var sum=0;
                do{
                    sum+=elem.offset().top;
                    elem=elem.offsetParent();
                }while(!elem.is("html"));
                return sum;
            }
            //为页面绑定滚动效果
            $(window).on("scroll",function () {
                //实现页面滚动楼梯隐藏及显示
                var $scrollTop=$(this).scrollTop();
                if($scrollTop>=600){
                    $("#lift").show();
                }else{
                    $("#lift").hide();
                }
                //实现页面滚动电梯跟着走
                $('.content-top').each(function(idx,obj){
                    var $liftTop=getTotalTop($('.content-top').eq(idx))+400;
                    if($liftTop > $scrollTop){//楼层的top大于滚动条的距离
                        $('#lift li').removeClass('lift_item_on').siblings().eq(idx).addClass('lift_item_on');
                        return false;//中断循环
                    }
                });
                //实现点击电梯楼层效果
                $('#lift li').click(function(){
                    var index = $(this).index();
                    $(this).addClass('lift_item_on').siblings().removeClass('lift_item_on');
                    $("html,body").stop(true).animate({
                        scrollTop:getTotalTop($('.content-top').eq(index))-70
                    },500);
                });
            })
        });
    }
})()