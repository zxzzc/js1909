<?php
// header('content-type:text/html;charset=utf-8');
    include "conn.php";
    $conn->query('SET NAMES UTF8');//设置字符编码
    $sid=$_POST['sid'];
    $result=$conn->query("select * from wanmeipic where sid='$sid'");
    $wanmeidata=array();
    for($i=0;$i<$result->num_rows;$i++){
        $wanmeidata[$i]=$result->fetch_assoc();
    }
    
    echo json_encode($wanmeidata);