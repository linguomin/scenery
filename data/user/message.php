<?php
//获取留言信息
require_once('../init.php');

@$pno = $_REQUEST['pno'];               //获取页码
if(!$pno){
    $pno = 1;
}else {
    $pno = intval($pno);
}

$output = [
    'recordCount' => 0,     //总记录数
    'pageSize' => 8,        //每页大小，即每页最多可以显示的记录数量
    'pageCount' => 0,       //总页数
    'pno' => $pno,          //当前数据所在页号
    'data' => null          //当前页中的数据
];

// 获取总记录数
$sql = "SELECT * FROM zj_message";
$result = mysqli_query($conn,$sql);
$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
$output['recordCount'] = count($rows);

 //计算总页数
 $output['pageCount'] = ceil($output['recordCount']/$output['pageSize']);

//获取指定页中的数据
$start = ($output['pno']-1)*$output['pageSize'];
$count = $output['pageSize']; 

$sql = "SELECT mid,content,timer,avater,user_name FROM zj_message,zj_user WHERE zj_message.uid = zj_user.uid ORDER BY mid DESC LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
 if(!$result){
 	echo('{"code":500,"msg":"sql语句执行失败!"}');
 }else{
	$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
  	echo json_encode($output);
 }