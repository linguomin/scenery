(()=>{
    if(typeof jQuery!=="function"){
        throw new Error("index.js依赖于jQuery，必须先引入jQuery");
    }else{
        $(()=>{
            /*用户名和密码的非空验证*/
            $("#uname").blur(function(){
                if(!this.value){
                    $("#show-uname").text("用户名不能为空!");
                }else{
                    $("#show-uname").text("");
                }
            });
            $("#upwd").blur(function(){
                if(!this.value){
                    $("#show-upwd").text("密码不能为空!");
                }else{
                    $("#show-upwd").text("");
                }
            });

            /* 登录单击按钮监听*/
            $("#btn-login").click(e=> {
                //阻止默认行为
                e.preventDefault();
                //获取用户名和密码
                var uname = $("#uname").val();
                var upwd = $("#upwd").val();
                $.ajax({
                    type: "POST",
                    url: "data/user/login.php",
                    data: {uname:uname,upwd:upwd},
                    success: function(result){
                        // console.log(result);
                        if (result.code == 200) {		//登录成功
                            location.href = 'index.html';
                        }else if(result.code == 201){	//登录失败
                            alertMsg('<b>登录失败！</b><p>用户名或密码输入有误。</p>');
                        }else{
                            alertMsg('<b>登录失败！</b><p>原因：' + result.msg + '</p>');
                        }
                    },
                    error: function(){
                        alert("网络故障请检查!");
                    }
                });
            });
        })
    }
})()