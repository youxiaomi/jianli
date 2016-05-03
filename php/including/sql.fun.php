<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/1/21
 * Time: 9:37
 */
$link;
function conn(){
    $lin=mysqli_connect(DB_HOST,DB_USER,DB_PWD,DB_DBNAME) or die("数据库连接失败Error:".mysqli_errno().":".mysqli_error());
    global $link;
    $link=$lin;
}
function fetchOne($table,$where,$val){
    $sql = "SELECT * FROM {$table} WHERE {$where}"."='{$val} '";
    global $link;
    $result=$link->query($sql);
    $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
    return $row;
}
function fetchAll($table){
    global $link;
    $sql = "SELECT * FROM {$table}";
    $result=$link->query($sql);
    while($row=mysqli_fetch_array($result,MYSQLI_ASSOC)){
        $rows[]=$row;
    }
    return @$rows;
}
function insert($table,$array){
    global $link;
    $keys=join(",",array_keys($array));
    $vals="'".join("','",array_values($array))."'";
    $sql="insert into {$table} ({$keys}) values({$vals})";
    if ($link->query($sql) === FALSE) {
        echo "Error: " . $sql . "<br>" . $link->error;
    }
}
function delete($table,$where,$val){
    global $link;
    $sql="DELETE FROM {$table} WHERE {$where}"."='{$val} '";
    $link->query($sql);
//    $sql="delete from {$table} {$where}";

//    mysqli_query($sql);
//    return mysqli_affected_rows();
}
function update($table,$array,$where,$value,$str=null){
    foreach($array as $key=>$val){
        if($str==null){
            $sep="";
        }else{
            $sep=",";
        }
        $str.=$sep.$key."='".$val."'";
    }
    $sql="update {$table} set {$str} WHERE {$where}"."='{$value} '" ;
    global $link;
    if($link->query($sql)===false){
        echo  $link->query($sql);
    }
    //var_dump($result);
    //var_dump(mysql_affected_rows());exit;

}