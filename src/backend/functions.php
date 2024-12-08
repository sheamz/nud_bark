<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

include 'db_con.php';

$json = file_get_contents("php://input");
$data = json_decode($json, true);


function register($email, $pass, $role, )
{
    global $conn;

    // check if existing email
    $sql = "SELECT uid 
            FROM db_bark.tbl_user
            WHERE email = ?
            LIMIT 1
            ;";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $email);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($result)) {
        // registered na yung email
        echo json_encode(['status' => 400, 'message' => 'email is already registered!']);
    } else {
        // new email

        // get latest user id
        $sql = "SELECT uid 
                FROM db_bark.tbl_user
                WHERE role = ?
                ORDER BY date_created DESC
                LIMIT 1
                ;";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(1, $role);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $latest_uid = '0';

        if (!empty($result)) {
            $latest_uid = explode('-', $result[0]['uid'])[1];
        }

        $new_uid_prefix = $role == 'user' ? 'USR-' : 'ADM-';
        $new_uid = $new_uid_prefix . sprintf("%05d", (int) $latest_uid + 1);


        // hash password
        $hash = password_hash(
            $pass,
            PASSWORD_DEFAULT
        );

        // prepare and bind
        $sql = "INSERT INTO `db_bark`.`tbl_user` (`uid`, `email`, `pass`, `role`) 
                VALUES (?,?,?,?);";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(1, $new_uid);
        $stmt->bindParam(2, $email);
        $stmt->bindParam(3, $hash);
        $stmt->bindParam(4, $role);
        $stmt->execute();

        echo json_encode(['status' => 200, 'message' => 'I got your deets na bruh, you can go in na.']);

    }

}


function getUser()
{
    global $conn;
    $sql = "SELECT * FROM tbl_user";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}
