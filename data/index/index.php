<?php
/**
* 向首页提供必需的数据，包括轮播广告、热门搜索、海外美景、大陆美景、港澳台
* 返回数据形如：
  {
    carouselItems: [ ],
    hotItems: [ ],
    haiwaiItems: [ ],
    daluItems: [ ],
    gatItems: [ ]
  }
*/
require_once('../init.php');
$output = [];
//1.获取轮播广告项
$sql = "SELECT cid,img FROM zj_index_carousel";
$result = mysqli_query($conn, $sql);
$output['carouselItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

//2.获取热门搜素
$sql = "SELECT pid,title,details,pic,href FROM zj_index_place WHERE hot>0 ORDER BY hot";
$result = mysqli_query($conn, $sql);
$output['hotItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

//3.获取海外美景
$sql = "SELECT pid,title,details,pic,href FROM zj_index_place WHERE haiwai>0 ORDER BY haiwai";
$result = mysqli_query($conn, $sql);
$output['haiwaiItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

//4.获取大陆美景
$sql = "SELECT pid,title,details,pic,href FROM zj_index_place WHERE dalu>0 ORDER BY dalu";
$result = mysqli_query($conn, $sql);
$output['daluItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

//4.获取港澳台
$sql = "SELECT pid,title,details,pic,href FROM zj_index_place WHERE gat>0 ORDER BY gat";
$result = mysqli_query($conn, $sql);
$output['gatItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($output);
