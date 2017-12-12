<?php
/**
* 根据景点编号lid查询商品的所有信息
* 参数： lid
*/
require_once('../init.php');
@$lid = $_REQUEST['lid'];
if(!$lid){
  $lid = 1;
}
$output = [
    'details' => [],
    'picList' => [],
    'videoList' => []
];
//读取景点信息
$sql = "SELECT * FROM zj_details WHERE lid=$lid";
$result = mysqli_query($conn, $sql);
$output['details'] = mysqli_fetch_assoc($result);

//读取景点图片列表
$sql = "SELECT * FROM zj_pic WHERE lid=$lid ORDER BY pid";
$result = mysqli_query($conn, $sql);
$output['picList'] = mysqli_fetch_all($result,MYSQLI_ASSOC);

//读取景点视频列表
$sql = "SELECT * FROM zj_video WHERE lid=$lid ORDER BY vid";
$result = mysqli_query($conn, $sql);
$output['videoList'] = mysqli_fetch_assoc($result);

echo json_encode($output);
