<?php
    $url = $_GET['url'];
    $refresh = $_GET['refresh'];

    if (isset($refresh)) {
        header("HTTP/1.1 200");
        header("Refresh: $refresh; url=$url");
        return;
    }

    header("Location: $url");
    if (isset($_GET['cors_allow_origin']))
        header("Access-Control-Allow-Origin: " . $_GET['cors_allow_origin']);

    $code = $_GET['code'];
    if (!isset($code))
        $code = 302;
    header("HTTP/1.1 $code");
?>
