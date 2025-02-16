<?php


include '../functions.php';

if (isset($data['com'], $data['pid'])) {

    $com = trim($data['com']);
    $pid = trim($data['pid']);


    if (isset($data['pcid'])) {

        $pcid = trim($data['pcid']);

        createReply($pid, $com, $pcid);

    } else {
        createParentComment($pid, $com);

    }
}


