<?php
$db_host = '127.0.0.1';
$db_user = 'root';
$db_password = '';
$db_database = 'zj';
$db_port = 3306;
$db_charset = 'UTF8';
//2:设置响应头格式
header("Content-Type:application/json;charset=utf8");
//3:设置跨域请求消息头
header('Access-Control-Allow-Origin:*');
//4:获取数据库连接
$conn = mysqli_connect($db_host, $db_user, $db_password, $db_database, $db_port);
//5:设置编码格式
mysqli_query($conn, "SET NAMES $db_charset");