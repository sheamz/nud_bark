<?php
require_once '../functions.php';


if (isset($data['pid'])) {

    deletePost($data['pid']);

}

