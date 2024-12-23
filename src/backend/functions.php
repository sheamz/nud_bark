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

function register($email, $pass, $role)
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
        // walang ganitong user
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
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

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



function getPost()
{
    global $conn;
    $sql = "SELECT p.pid, p.uid, usd.username as uname , p.title as tit, p.content, p.category as cat, p.date_created as date, p.view as views, COUNT(c.content) as com
            FROM db_bark.tbl_post as p
            LEFT JOIN db_bark.tbl_comment as c
            ON p.pid = c.pid
            INNER JOIN db_bark.tbl_user as usr
            ON p.uid = usr.uid
            LEFT JOIN db_bark.tbl_user_details as usd
            ON usr.uid = usd.uid
            GROUP BY pid
            ORDER BY date DESC
            ;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['status' => 200, 'message' => 'so eto na nga ang mga chika', 'data' => $result]);
}

function getPostById($pid)
{
    global $conn;
    $sql = "SELECT p.pid, p.uid, usd.username as uname, p.title as tit, p.content, p.category as cat, p.date_created as date, p.view as views
            FROM db_bark.tbl_post as p
            INNER JOIN db_bark.tbl_user as usr
            ON p.uid = usr.uid
            LEFT JOIN db_bark.tbl_user_details as usd
            ON usr.uid = usd.uid
            WHERE p.pid = :pid
            ;";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':pid', $pid);
    $stmt->execute();
    $post = $stmt->fetch(PDO::FETCH_ASSOC);

    // Fetch comments
    $sql_comments = "SELECT c.cid, c.pid, c.uid, c.content, c.date, usd.username as uname, c.parent_cid
                     FROM db_bark.tbl_comment as c
                     LEFT JOIN db_bark.tbl_user_details as usd
                     ON c.uid = usd.uid
                     WHERE c.pid = :pid
                     ORDER BY c.date ASC
                     ;";
    $stmt_comments = $conn->prepare($sql_comments);
    $stmt_comments->bindParam(':pid', $pid);
    $stmt_comments->execute();
    $comments = $stmt_comments->fetchAll(PDO::FETCH_ASSOC);

    // Organize comments into a nested structure
    $nested_comments = [];
    $comment_map = [];

    foreach ($comments as $comment) {
        $comment['replies'] = [];
        $comment_map[$comment['cid']] = $comment;
        if ($comment['parent_cid'] === null) {
            $nested_comments[] = &$comment_map[$comment['cid']];
        } else {
            $comment_map[$comment['parent_cid']]['replies'][] = &$comment_map[$comment['cid']];
        }
    }

    $post['comments'] = $nested_comments;

    echo json_encode(['status' => 200, 'message' => 'so eto na nga ang specific chika', 'data' => $post]);
}

function addViews($pid)
{
    global $conn;

    $sql = "SELECT tbl_post.view
            FROM db_bark.tbl_post
            WHERE tbl_post.pid = ?
            ;";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $pid);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $new_count = $result[0]['view'] + 1;

    $sql = "UPDATE `db_bark`.`tbl_post` 
            SET `view` = ? 
            WHERE `pid` = ?;";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $new_count);
    $stmt->bindParam(2, $pid);
    $stmt->execute();

}