<?php
include 'db_con.php';

function getUser(){
    global $conn;
    $sql= "SELECT * FROM tbl_user";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}
?>