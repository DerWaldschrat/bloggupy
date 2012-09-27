<?php
defined("__EXEC") or exit;
// Contains functionality for file system

// Creates gzipped file
function gz_file_put_contents($file, &$data)
{
    $fp = gzopen($file, "w4");
    gzwrite($fp, $data);
    gzclose($fp);
}

// Creates gzipped file from other file
function gz_file_from_file($source, $new)
{
    $data = implode("", file($source));
    gz_file_put_contents($new, $data);
    unset($data);
}
?>