<?php
include '../functions.php';

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (isset($data['uid'])) {
    deleteUser($data['uid']);
} else {
    echo json_encode(['status' => 400, 'message' => 'User ID not provided']);
}
