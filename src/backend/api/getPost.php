<?php
require_once '../functions.php';


if (isset($data['pid'])) {
    $pid = trim($data['pid']);

    getPostById($pid);

} else {

    getPost();

}
