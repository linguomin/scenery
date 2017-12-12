<?php
 require_once("./init.php");
 @$kw = $_REQUEST["term"];

 $sql = "SELECT lid,title FROM zj_details";
 if($kw){
    $kws=explode(" ",$kw);//js:split
    for($i=0;$i<count($kws);$i++){
    $kws[$i]=" title like '%".$kws[$i]."%'";
    }
    $where=" where ".implode(" and ",$kws);
    $sql=$sql.$where;
 }
 $sql = $sql." ORDER BY lid LIMIT 5";

 $result = mysqli_query($conn,$sql);
 $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
 echo json_encode($row);