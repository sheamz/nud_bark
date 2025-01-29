<?php
include '../functions.php';

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (isset($data['pid'])) {
    deletePost($data['pid']);
} else {
    echo json_encode(['status' => 400, 'message' => 'Post ID not provided']);
}

