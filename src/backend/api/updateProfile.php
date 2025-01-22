<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../functions.php';

$uid = $data["uid"];
$f_name = $data["f_name"];
$m_name = $data["m_name"];
$l_name = $data["l_name"];
$suffix = $data["suffix"];
$username = $data["username"];

error_log("Received data:" .print_r($data, true));

updateProfile($uid, $f_name, $m_name, $l_name, $suffix, $username);
?>