<?php

include '../functions.php';

$email = $data['eml'];
$role = $data['rol'];
$pass = $data['pas'];

register($email, $pass, $role);




