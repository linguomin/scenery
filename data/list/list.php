<?php
/**
 * Created by PhpStorm.
 * User: lingu
 * Date: 2017/11/27
 * Time: 0:27
 */
require_once('../init.php');
@$kw = $_REQUEST['kw'];                 //获取关键词
@$pno = $_REQUEST['pno'];               //获取页码
@$placeloc = $_REQUEST['placeloc'];     //获取景点所在地
@$jdtype = $_REQUEST['jdtype'];         //获取景点类型
@$level = $_REQUEST['level'];           //获取景点级别
@$season = $_REQUEST['season'];         //获取适合季节
if(!$pno){
    $pno = 1;
}else {
    $pno = intval($pno);
}

$output = [
    'recordCount' => 0,     //满足条件的总记录数
    'pageSize' => 12,        //每页大小，即每页最多可以显示的记录数量
    'pageCount' => 0,       //总页数
    'pno' => $pno,          //当前数据所在页号
    'kw' => $kw,            //获取关键词
    'placeloc' => $placeloc,//获取景点所在地
    'jdtype' => $jdtype,    //获取景点类型
    'level' => $level,      //获取景点级别
    'season' => $season,    //获取适合季节
    'data' => null          //当前页中的数据
];

// 获取总记录数
$sql = "SELECT * FROM zj_place";
// //关键词搜索
if($kw){
	$kw = urldecode($kw);
}else{
	$kw="";
}
$sql .= " WHERE title LIKE '%$kw%'";
//如果用户选择分类搜索时
 if($placeloc){
 	$sql .= " AND placeloc = '$placeloc'";
 }
 if($jdtype){
 	$sql .= " AND jdtype = '$jdtype'";
 }
 if($level){
 	$sql .= " AND level = '$level'";
 }
 if($season){
 	$sql .= " AND season = '$season'";
 }

 $result = mysqli_query($conn,$sql);
 $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
 $output['recordCount'] = count($rows);

 //计算总页数
 $output['pageCount'] = ceil($output['recordCount']/$output['pageSize']);

 //获取指定页中的数据
 $start = ($output['pno']-1)*$output['pageSize'];
 $count = $output['pageSize'];

 $sql .= " ORDER BY pid LIMIT $start,$count";

 $result = mysqli_query($conn,$sql);
 if(!$result){
 	echo('{"code":500,"msg":"sql语句执行失败!"}');
 }else{
 	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	$output['data'] = $list;
  	echo json_encode($output);
 }