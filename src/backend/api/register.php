<?php

include '../functions.php';

$email = $data['eml'];
$role = $data['rol'];
$pass = $data['pas'];

if (isset($email, $role, $pass)) {

    $email = trim($data['eml']);
    $role = trim($data['rol']);
    $pass = trim($data['pas']);

    register($email, $pass, $role);

}
// else {
//     echo json_encode(['status' => 400, 'message' => 'Ano, huhulaan ko na lang ba yan?']);
// }





