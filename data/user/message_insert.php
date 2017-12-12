<?php
require_once('../init.php');
session_start();
@$uid = $_SESSION['loginUid'];
if(!$uid){
  die('{"code":401, "msg":"login required"}');
}
@$time = $_REQUEST['time'] or die('{"code":402,"msg":"时间不能为空"}');
@$content = $_REQUEST['content'] or die('{"code":402,"msg":"内容不能为空"}');

$sql = "INSERT INTO zj_message(uid,timer,content) VALUES($uid,'$time','$content')";
$result = mysqli_query($conn,$sql);
if(!$result){
  echo('{"code":500, "msg":"db execute err"}');
}else {
  $mid = mysqli_insert_id($conn);
  echo('{"code":200, "msg":"插入数据成功!", "mid":'.$mid.'}');
}