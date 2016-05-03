<?php
/**
 * Created by PhpStorm.
 * User: 17985
 * Date: 2016/5/3
 * Time: 20:26
 */
require ('../conf/configs.php');
require ('../including/sql.fun.php');
conn();
$link->query('set names utf8');
$result=fetchAll('testIp');
$data=json_encode($result);
echo $data;
