<?php
    include "conn.php";
    $conn->query('SET NAMES UTF8');//设置字符编码
    $result=$conn->query("select * from wanmeipic");
    $wanmeidata=array();
    for($i=0;$i<$result->num_rows;$i++){
        $wanmeidata[$i]=$result->fetch_assoc();
    }
    echo json_encode($wanmeidata);