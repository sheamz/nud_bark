<?php


include '../functions.php';

if (isset($data['uid'], $data['com'], $data['pid'])) {

    $uid = trim($data['uid']);
    $com = trim($data['com']);
    $pid = trim($data['pid']);


    if (isset($data['pcid'])) {

        $pcid = trim($data['pcid']);

        createReply($uid, $pid, $com, $pcid);

    } else {
        createParentComment($uid, $pid, $com);

    }
}


