<?php
/**
 * Created by PhpStorm.
 * User: youyou
 * Date: 2016/3/5
 * Time: 21:45
 */
require ('../conf/configs.php');
require ('../including/sql.fun.php');
conn();
$link->query('set names utf8');
$city=$_GET['city'];
$ip=$_GET['ip'];
//$result=fetchOne('testIp','ip',$ip);
$result=fetchAll('testIp');
$count=0;
//echo print_r($result);
for($x=0;$x<count($result);$x++)
{
    foreach ($result[$x] as $key=>$val)
    {
        if($key=='ip'){
            if($val==$ip){
                $count=$count+1;
            }
        }
    }
}
echo $count;
if($count>0){
    if($ip!=='182.150.147.162'){
        insert('testIp',array('city'=>$city,'ip'=>$ip,'count'=>$count+1,'time'=>date('Y-m-d-G-i-s',time())));
    }
}else{
    insert('testIp',array('city'=>$city,'ip'=>$ip,'count'=>1,'time'=>date('Y-m-d-G-i-s',time())));
}

