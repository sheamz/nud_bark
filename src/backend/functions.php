<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');

include 'db_con.php';
require '../../../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight request
    http_response_code(200);
    exit();
}

// get token in authorization header
$headers = getallheaders();
// get secret from env
$secretKey = $env['JWT_SECRET'];


if (array_key_exists('Authorization', $headers)) {
    // decode jwt
    try {
        //code...
        $token = explode(' ', $headers['Authorization'])[1];

        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        $dec_uid = $decoded->uid;
        $dec_rol = $decoded->rol;

    } catch (\Throwable $th) {
        //throw $th;
        header('HTTP/1.1 400 InvalidToken');
        echo json_encode(['message' => 'expired token']);
        die;
    }
}




// }

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
    $sql = "SELECT * FROM tbl_user WHERE role = 'user'";
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

    echo json_encode(['message' => 'goods sirr!!!', 'status' => 200]);
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

function getPostByUser()
{
    global $conn, $dec_uid;

    $sql = "SELECT * 
            FROM db_bark.tbl_post
            WHERE uid = :uid
            ORDER BY date_created DESC
            ";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':uid', $dec_uid);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 200, 'message' => 'so eto na nga ang mga chika', 'data' => $result]);

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
// $uid, $pid, $comment, $cid
function createParentComment($uid, $pid, $comment)
{

    global $conn;
    // get muna latest comment id

    $sql = "SELECT cid 
            FROM db_bark.tbl_comment 
            ORDER BY cid DESC
            LIMIT 1;";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $latest_cid = '0';

    if (!empty($result)) {
        $latest_cid = explode('-', $result[0]['cid'])[1];
    }
    $new_cid = 'COM-' . sprintf("%05d", (int) $latest_cid + 1);

    // sql create comment

    $sql = "INSERT INTO `db_bark`.`tbl_comment` (`cid`, `pid`, `content`, `uid`) 
            VALUES (?,?,?,?);";


    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $new_cid);
    $stmt->bindParam(2, $pid);
    $stmt->bindParam(3, $comment);
    $stmt->bindParam(4, $uid);
    // $stmt->bindParam(5, $pcid);
    $stmt->execute();


    echo json_encode(['status' => 200, 'message' => 'dami mo naman ebas par']);
    // echo $new_cid;
}

function createReply($uid, $pid, $comment, $pcid)
{

    global $conn;
    // get muna latest comment id

    $sql = "SELECT cid 
            FROM db_bark.tbl_comment 
            ORDER BY cid DESC
            LIMIT 1;";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $latest_cid = '0';

    if (!empty($result)) {
        $latest_cid = explode('-', $result[0]['cid'])[1];
    }
    $new_cid = 'COM-' . sprintf("%05d", (int) $latest_cid + 1);



    // sql create reply

    $sql = "INSERT INTO `db_bark`.`tbl_comment` (`cid`, `pid`, `content`, `uid`, `parent_cid`) 
            VALUES (?,?,?,?,?);";


    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $new_cid);
    $stmt->bindParam(2, $pid);
    $stmt->bindParam(3, $comment);
    $stmt->bindParam(4, $uid);
    $stmt->bindParam(5, $pcid);
    $stmt->execute();


    echo json_encode(['status' => 200, 'message' => 'eto na ambag mo par?']);





}

function deletePost($pid)
{
    global $conn;

    $sql = "DELETE FROM `db_bark`.`tbl_post` WHERE (`pid` = ?)";
    ;

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $pid);

    $stmt->execute();

    echo json_encode(['status' => 200, 'message' => 'wala na']);

}

function getProfile()
{
    global $conn, $dec_uid;


    $sql = "SELECT u.uid, u.email, u.date_created, d.f_name, d.m_name, d.l_name, d.suffix, d.username 
            FROM db_bark.tbl_user u
            LEFT JOIN db_bark.tbl_user_details d ON u.uid = d.uid
            WHERE u.uid = :uid";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':uid', $dec_uid);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        echo json_encode($result);
    } else {
        echo json_encode(['status' => 404, 'message' => 'User not found']);
    }
}

function updateProfile($f_name, $m_name, $l_name, $suffix, $username)
{
    global $conn, $dec_uid;

    // Check if UID exists
    $checkUid = $conn->prepare("SELECT COUNT(*) FROM db_bark.tbl_user_details WHERE uid = :uid");
    $checkUid->bindParam(':uid', $dec_uid);
    $checkUid->execute();

    if ($checkUid->fetchColumn() == 0) {
        // add user details
        $sql = "INSERT INTO db_bark.tbl_user_details (uid, f_name, m_name, l_name, suffix, username) 
                VALUES (:uid, :f_name, :m_name, :l_name, :suffix, :username)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':uid', $dec_uid);
        $stmt->bindParam(':f_name', $f_name);
        $stmt->bindParam(':m_name', $m_name);
        $stmt->bindParam(':l_name', $l_name);
        $stmt->bindParam(':suffix', $suffix);
        $stmt->bindParam(':username', $username);

    } else {
        // update user details
        $sql = "UPDATE db_bark.tbl_user_details 
        SET f_name = :f_name, 
            m_name = :m_name, 
            l_name = :l_name, 
            suffix = :suffix, 
            username = :username
        WHERE uid = :uid";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':uid', $dec_uid);
        $stmt->bindParam(':f_name', $f_name);
        $stmt->bindParam(':m_name', $m_name);
        $stmt->bindParam(':l_name', $l_name);
        $stmt->bindParam(':suffix', $suffix);
        $stmt->bindParam(':username', $username);


    }

    // Update profile
    try {
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 200, 'message' => 'Profile updated successfully']);
        } else {
            echo json_encode(['status' => 400, 'message' => 'No changes detected in the profile']);
        }
    } catch (PDOException $e) {
        error_log('Update Error: ' . $e->getMessage());
        echo json_encode(['status' => 500, 'message' => 'Internal server error']);
    }
}

function getAnalytics()
{
    global $conn;


    // get registered users per month for the past 12 months

    $sql = "SELECT COUNT(uid) as total_users, MONTH(date_created) as month, YEAR(date_created) as year
            FROM db_bark.tbl_user
            GROUP BY YEAR(date_created), MONTH(date_created)
            LIMIT 12
            ;";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as $row) {
        // convert month number to month name
        $dateObj = DateTime::createFromFormat('!m', $row['month']);
        $monthName = $dateObj->format('M');

        $categories[] = $monthName . ' ' . $row['year'];

        $values[] = $row['total_users'];

    }

    // get posts per category
    $sql = "SELECT COUNT(pid) as post_count, category
            FROM db_bark.tbl_post
            GROUP BY category
            ORDER BY post_count
            ;";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as $row) {
        $cat_series[] = $row['post_count'];
        $cat_label[] = $row['category'];
    }

    // get top contributors

    $sql = "SELECT usr.uid, usd.username, usr.email, pst.category, COUNT(pst.pid) as count
            FROM db_bark.tbl_post as pst
            JOIN db_bark.tbl_user as usr
            ON pst.uid = usr.uid
            LEFT JOIN db_bark.tbl_user_details as usd
            ON usr.uid = usd.uid
            GROUP BY usr.uid
            ORDER BY count DESC
            LIMIT 3
            ;";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $top_contri_res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // get most popular post
    $sql = "SELECT pst.title, pst.category, COUNT(cid) as com_count
            FROM db_bark.tbl_post as pst
            JOIN db_bark.tbl_comment as com
            ON pst.pid = com.pid
            GROUP BY pst.pid
            ORDER BY com_count DESC

            LIMIT 3";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $most_pop_res = $stmt->fetchAll(PDO::FETCH_ASSOC);


    // get most views
    $sql = "SELECT pst.title, pst.category, view as view_count
            FROM db_bark.tbl_post as pst
            ORDER BY view_count DESC
            LIMIT 3";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $most_view_res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // get total views
    $sql = "SELECT SUM(view) as total_views
            FROM db_bark.tbl_post
            ;";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $total_views = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // send result
    echo json_encode([
        'status' => 200,
        'message' => 'Here are the analytics',
        'user_count' => [
            'categories' => $categories,
            'values' => $values
        ],
        'post_count' => [
            'categories' => $cat_label,
            'values' => $cat_series
        ],
        'top_contributors' => $top_contri_res,
        'most_popular_posts' => $most_pop_res,
        'most_viewed_posts' => [
            'post' => $most_view_res,
            'total_views' => (int) $total_views[0]['total_views']
        ]
    ]);
}

function getNews()
{
    global $conn;

    $sql = "SELECT pid, title, category, date_created
            FROM db_bark.tbl_post as pst
            WHERE pst.category = 'Bark News' 
            ORDER BY date_created DESC
            LIMIT 3";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $latest_news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 200, 'message' => 'okoksokoskks', 'latest_news' => $latest_news]);

}

function getTopCategories()
{
    global $conn;

    $sql = "SELECT  category as name, COUNT(category) as cat_count
            FROM db_bark.tbl_post as pst
            GROUP BY category
            ORDER BY cat_count DESC
            LIMIT 3";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $top_categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 200, 'message' => 'okoksokoskks', 'top_categories' => $top_categories]);
}

function getComPostByUser()
{
    global $conn, $dec_uid;

    // comment count
    $sql = "SELECT COUNT(c.cid) as com_count, d.username
            FROM db_bark.tbl_user u
            LEFT JOIN db_bark.tbl_user_details d 
            ON u.uid = d.uid
            LEFT JOIN db_bark.tbl_comment c
            ON c.uid = u.uid
            WHERE u.uid = :uid
            GROUP BY u.uid";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':uid', $dec_uid);
    $stmt->execute();
    $com_count = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // get post count

    $sql = "SELECT  COUNT(p.pid) as post_count
            FROM db_bark.tbl_user u
            LEFT JOIN db_bark.tbl_user_details d 
            ON u.uid = d.uid
            LEFT JOIN db_bark.tbl_post p
            ON p.uid = u.uid
            WHERE u.uid = :uid
            GROUP BY u.uid";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':uid', $dec_uid);
    $stmt->execute();
    $post_count = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $data = [
        'uid' => $dec_uid,
        'username' => $com_count[0]['username'],
        'com_count' => $com_count[0]['com_count'],
        'post_count' => $post_count[0]['post_count']
    ];

    echo json_encode(['status' => 200, 'message' => 'okoksokoskks', 'data' => $data]);

}