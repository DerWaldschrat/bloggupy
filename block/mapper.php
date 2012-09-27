<?php
defined("__EXEC") or die;
$__METHOD = strtolower($_SERVER["REQUEST_METHOD"]);
$__BODY = null;
$__BODYASJSON = null;
function body() {
    global $__BODY, $__METHOD;
    if($__BODY === null) {
        $__BODY = file_get_contents("php://input");
    }
    return $__BODY;  
}

function bodyAsJSON($assoc = false) {
    global $__BODYASJSON;
    if ($__BODYASJSON === null) {
        $__BODYASJSON = json_decode(body(), $assoc);
    }
    return $__BODYASJSON;    
}

function get($file) {
    global $__METHOD;
    if($__METHOD === "get") {
        if (is_callable($file)) {
            $file();
        } else {
            require $file;
        }
    }
}

function post($file) {
    global $__METHOD;
    if ($__METHOD === "post") {
        if (is_callable($file)) {
            $file();
        } else {
            require $file;
        }
    }
}

function put($file) {
    global $__METHOD;
    if ($__METHOD === "put") {
        if (is_callable($file)) {
            $file();
        } else {
            require $file;
        }
    }
}

function delete($file) {
    global $__METHOD;
    if ($__METHOD === "delete") {
        if (is_callable($file)) {
            $file();
        } else {
            require $file;
        }
    }
}

/**
 * Shorthand for header("HTTP/1.1 404 Not Found");
 * */
function h404($json = null)
{
    header("HTTP/1.1 404 Not Found");
    if ($json !== null) {
        header("Content-Type: application/json");
        echo json_encode($json);
    }
}

/**
 * Fails with a little message
 * */
function fail ($message = null) {
    if ($message !== null && !is_array($message)) {
        $message = array("message" => $message);
    }
    h404($message);
    exit;
}

function hJSON($json = null)
{
    header("Content-Type: application/json");
    if ($json !== null) {
        echo json_encode($json);
    }
}

?>