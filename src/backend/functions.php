<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');


include 'db_con.php';
require '../../../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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


function login($email, $pass)
{

    global $conn, $env;

    $sql = "SELECT * 
            FROM db_bark.tbl_user 
            WHERE email=? 
            LIMIT 1;";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $email);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($result)) {
        //  walang ganitong user
        echo json_encode(['status' => 400, 'message' => 'The email is invalid.']);

    } else {
        // may user

        $hash = $result[0]['pass'];

        if (password_verify($pass, $hash)) {
            // correct password

            // create jwt
            $key = $env['JWT_SECRET'];
            $payload = [
                'uid' => $result[0]["uid"],
                'rol' => $result[0]["role"]

            ];
            $jwt = JWT::encode($payload, $key, 'HS256');

            echo json_encode(['status' => 200, 'message' => 'Logged in successfully', 'atk' => $jwt]);

        } else {
            // wrong password
            echo json_encode(['status' => 400, 'message' => 'The password is wrong.']);

        }

    }



}

function createPost($uid, $title, $content, $category)
{

    global $conn;

    // get muna latest post id
    $sql = "SELECT pid 
            FROM db_bark.tbl_post 
            ORDER BY pid DESC
            LIMIT 1;";

    $stmt = $conn->prepare($sql);
    // $stmt->bindParam(1, $email);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // echo json_encode($result);

    $latest_pid = '0';

    if (!empty($result)) {
        $latest_pid = explode('-', $result[0]['pid'])[1];
    }
    $new_pid = 'PST-' . sprintf("%05d", (int) $latest_pid + 1);


    // prepare and bind

    $sql = "INSERT INTO `db_bark`.`tbl_post` (`pid`, `uid`, `title`, `content`, `category`) 
            VALUES (?,?,?,?,?);";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $new_pid);
    $stmt->bindParam(2, $uid);
    $stmt->bindParam(3, $title);
    $stmt->bindParam(4, $content);
    $stmt->bindParam(5, $category);
    $stmt->execute();

    echo json_encode(['message' => 'goods sirr!!!']);

}