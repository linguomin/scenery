(()=>{
    if(typeof jQuery!=="function"){
        throw new Error("register.js依赖于jQuery，必须先引入jQuery");
    }else{
        $(()=>{
            var unameReg=/^[a-z0-9]{3,12}$/i;
            var upwdReg=/^[a-z0-9]{6,12}$/i;
            var emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            var phoneReg = /^((\+86|0086)\s+)?1[34578]\d{9}$/;

            /*1.对用户名进行验证*/
            $('[name="uname"]').blur(function(){
                if(!this.value){
                    $('#uname-show').text('用户名不能为空!').removeClass('correct text').addClass('err');
                }else if(!unameReg.test(this.value)){
                    $('#uname-show').addClass('err').text('用户名长度在3到12位之间!').removeClass('correct text');
                }else{
                    if (!this.value) {   //用户没有输入任何内容
                        return;
                    }
                    var uname = $('[name="uname"]').val();
                    $.ajax({
                        url: 'data/user/check_uname.php',
                        data: {uname:uname},
                        success: function (result) {
                            if (result.code === 201) {
                                $('#uname-show').addClass('err').text('用户名已被占用!').removeClass('correct text');
                            } else if (result.code === 200) {
                                $('#uname-show').addClass('correct').text('通过').removeClass('err text');
                            } else {
                                alertMsg('验证用户名出错！请稍后重试。');
                            }
                        },
                        error: function(){
                            alert("网络故障请检查!");
                        }
                    });
                    $('#uname-show').addClass('correct').text('通过').removeClass('err text');
                }
            }).focus(function() {
                $('#uname-show').text('用户名长度在3到12位之间!').removeClass('correct err').addClass('text');
            });

            /*2.对密码进行验证*/
            $('[name="upwd"]').blur(function(){
                if(!this.value){
                    $('#upwd-show').text('密码不能为空!').removeClass('correct text').addClass('err');
                }else if(!upwdReg.test(this.value)){
                    $('#upwd-show').addClass('err').text('密码长度在6到12位之间!').removeClass('correct text');
                }else{
                    $('#upwd-show').addClass('correct').text('通过').removeClass('err text');
                }
            }).focus(function() {
                $('#upwd-show').text('密码长度在6到12位之间!').removeClass('correct err').addClass('text');
            });

            /*3.对确认密码进行验证*/
            $('#cpwd').blur(function(){
                if(!this.value){
                    $('#cpwd-show').text('确认密码不能为空!').removeClass('correct text').addClass('err');
                }else if(this.value != $('[name="upwd"]').val()){
                    $('#cpwd-show').addClass('err').text('两次输入的密码不一致!').removeClass('correct text');
                }else{
                    $('#cpwd-show').addClass('correct').text('通过').removeClass('err text');
                }
            }).focus(function() {
                $('#cpwd-show').text('密码长度在6到12位之间!').removeClass('correct err').addClass('text');
            });

            /*4.对邮箱地址进行验证*/
            $('[name="email"]').blur(function() {
                if(!this.value){
                    $('#email-show').text('邮箱不能为空!').removeClass('correct text').addClass('err');
                }else if(!emailReg.test(this.value)){
                    $('#email-show').addClass('err').text('邮箱格式不正确!').removeClass('correct text');
                }else{
                    if (!this.value) {   //用户没有输入任何内容
                        return;
                    }
                    var email = $('[name="email"]').val();
                    $.ajax({
                        url: 'data/user/check_email.php',
                        data: {email:email},
                        success: function (result) {
                            if (result.code === 201) {
                                $('#email-show').addClass('err').text('该邮箱已经注册过!').removeClass('correct text');
                            } else if (result.code === 200) {
                                $('#email-show').addClass('correct').text('通过').removeClass('err text');
                            } else {
                                alertMsg('验证邮箱出错！请稍后重试。');
                            }
                        },
                        error: function(){
                            alert("网络故障请检查!");
                        }
                    });
                }
            }).focus(function() {
                $('#email-show').text('请输入合法的邮箱地址!').removeClass('correct err').addClass('text');
            });

            /*4.对手机号进行验证*/
            $('[name="phone"]').blur(function(){
                if(!this.value){
                    $('#phone-show').text('手机号不能为空!').removeClass('correct text').addClass('err');
                }else if(!phoneReg.test(this.value)){
                    $('#phone-show').addClass('err').text('手机号格式不正确!').removeClass('correct text');
                }else{
                    if (!this.value) {   //用户没有输入任何内容
                        return;
                    }
                    var phone = $('[name="phone"]').val();
                    $.ajax({
                        url: 'data/user/check_phone.php',
                        data: {phone:phone},
                        success: function (result) {
                            if (result.code === 201) {
                                $('#phone-show').addClass('err').text('该电话已经注册过!').removeClass('correct text');
                            } else if (result.code === 200) {
                                $('#phone-show').addClass('correct').text('通过').removeClass('err text');
                            } else {
                                alertMsg('验证手机出错！请稍后重试。');
                            }
                        },
                        error: function(){
                            alert("网络故障请检查!");
                        }
                    });
                }
            }).focus(function() {
                $('#phone-show').text('请输入合法的手机号!').removeClass('correct err').addClass('text');
            });

            /**注册按钮监听函数**/
            $('#bt-register').click(e=>{
                e.preventDefault();
                var count = 0;
                $('.word p').each(function () {
                    if ($(this).find('span').hasClass('correct')) {
                        count++;
                    }
                });
                if (count == 5){
                    var uname = $('[name="uname"]').val();
                    var upwd = $('[name="upwd"]').val();
                    var email = $('[name="email"]').val();
                    var phone = $('[name="phone"]').val();
                    $.ajax({
                        type: 'POST',
                        url: 'data/user/register.php',
                        data: {uname:uname,upwd:upwd,email:email,phone:phone},
                        success: function(result){
                            // console.log(result);
                            if(result.code == 200){
                                alertMsg('<b>注册成功！</b><p>点击“确定”后将跳转到登录页</p>');
                                $('#alertMsg').on('click', '#alertMsg_btn1 cite', function (e) {
                                    e.preventDefault();
                                    location.href = 'login.html';
                                })
                            }else {
                                alertMsg('<b>注册失败！</b><p>错误消息：'+result.msg+'</p>')
                            }
                        },
                        error: function(){
                            alert("网络故障请检查!");
                        }
                    });
                }
            });
        })
    }
})()