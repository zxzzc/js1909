<?php
include "conn.php";//引入数据库连接文件
if(isset($_POST['email']) || isset($_POST['submit'])){//获取用户名
    $email=@$_POST['email'];//取值
    $result=$conn->query("select * from user where email='$email'");//如果能够找到记录，用户名存在的
    if($result->fetch_assoc()){//如果$result->fetch_assoc()有值，返回true,否则就是false;
        echo true;//1 存在
    }else{
        echo false;
    }
}else{
    exit('非法操作');//输出非法操作，终止程序
}

//将表单的值接收，放入数据库。
if(isset($_POST['submit'])){//点击了注册按钮
    $email=$_POST['email'];
    $pass=sha1($_POST['password']);
    $conn->query("insert user values('$email','$pass','')");
}
