<?php
// Execution flag
define("__EXEC", true);
// Root for including server side files
define("ROOT", "../");
// Root for including files on the client
// On production systems this is replaced with:
/**
 * "../".(strpos($_SERVER['HTTP_ACCEPT_ENCODING'], "gzip") !== false ? "gz/" : "")
 */
define("CLIENTROOT", /*CLIENTROOT*/"../"/*/CLIENTROOT*/);
define("APIROOT", "http://localhost/bloggupy/Api/");
// PHP extension
define("PHP", ".php");

// Require user management
require ROOT . "block/user" . PHP;

// Require backend template
require ROOT . "theme/backend/index" . PHP;
?>