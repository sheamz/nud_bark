<?php

include '../functions.php';

$email = $data['eml'];
// $role = $data['rol'];
$pass = $data['pas'];

if (isset($email, $pass)) {

    $email = trim($data['eml']);
    // $role = trim($data['rol']);
    $pass = trim($data['pas']);

    register($email, $pass, 'user');

}
// else {
//     echo json_encode(['status' => 400, 'message' => 'Ano, huhulaan ko na lang ba yan?']);
// }





