<?php

include '../functions.php';

$uid = trim($data['uid']);
$title = trim($data['tit']);
$content = trim($data['con']);
$category = trim($data['cat']);

if (!$uid == '' && !$title == '' && !$content == '' && !$category == '') {

    createPost($uid, $title, $content, $category);

} else {

    echo json_encode(['status' => 210, 'message' => 'complete the form']);

}




