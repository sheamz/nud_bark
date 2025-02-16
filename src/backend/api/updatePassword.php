<?php

require '../functions.php';

$old_pass = $data['old_pass'];
$new_pass = $data['new_pass'];

newPassword($old_pass, $new_pass);

