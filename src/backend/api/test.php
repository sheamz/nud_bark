<?php

include '../functions.php';

function test()
{
    global $dec_uid;



    header('HTTP/1.1 200 goods');
    echo json_encode(['status' => 200, 'message' => 'Hello World!', 'uid' => $dec_uid]);
}
;

test();

