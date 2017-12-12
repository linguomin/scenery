<?php
/**
* 接收客户端
*/
require_once('../init.php');

@$uname = $_REQUEST['uname'] or die('{"code":401,"msg":"用户名不能为空!"}');
@$upwd = $_REQUEST['upwd'] or die('{"code":402,"msg":"密码不能为空!"}');
@$email = $_REQUEST['email'] or die('{"code":403,"msg":"邮箱不能为空!"}');
@$phone = $_REQUEST['phone'] or die('{"code":404,"msg":"手机号不能为空!"}');

$sql = "INSERT INTO zj_user(uname,upwd,email,phone) VALUES('$uname','$upwd','$email','$phone')";
$result = mysqli_query($conn,$sql);

if(!$result){
  echo('{"code":500, "msg":"db execute err"}');
}else {
  $uid = mysqli_insert_id($conn);
  echo('{"code":200, "msg":"注册成功!", "uid":'.$uid.'}');
}